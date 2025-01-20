<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService;

    /**
     * Inject AuthService into the controller.
     *
     * @param  \App\Services\AuthService  $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users,username',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = $this->authService->register($validated);

            return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Log in a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            \Log::info('Validated data:', $validated);

            // Get user by email
            $user = User::where('email', $validated['email'])->first();

            if (!$user || !\Hash::check($validated['password'], $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Create token
            $token = $user->createToken('auth_token')->plainTextToken;

            \Log::info('Generated token:', ['token' => $token]);

            return response()->json(['message' => 'Login successful', 'token' => $token], 200);
        } catch (\Throwable $e) {
            \Log::error('Login error:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    /**
     * Log out the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->authService->logout();

        return response()->json(['message' => 'Logout successful'], 200);
    }
}