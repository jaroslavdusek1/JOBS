<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class AuthService
{
    /**
     * Register a new user.
     *
     * @param  array  $data
     * @return \App\Models\User
     * @throws /Exception
     */
    public function register(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            return User::create($data);
        } catch (\Throwable $e) {
            \Log::error('Registration error:', ['error' => $e->getMessage()]);
            throw new \Exception('Registration failed. Please try again later.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Log in a user and generate a token.
     *
     * @param  array  $credentials
     * @return array
     * @throws \Exception
     */
    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new \Exception('Invalid credentials', Response::HTTP_UNAUTHORIZED);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Create a secure HTTP-only cookie
        $cookie = cookie(
            'auth_token',
            // Cookie name
            $token, // Cookie value (token)
            60 * 24,
            // Expiry time in minutes (1 day)
            '/',
            // Path
            null,
            // Domain
            true,
            // Secure
            true,
            // HTTP only
            false,
            // SameSite (default is Lax)
            'Strict' // SameSite attribute
        );

        return [
            'token' => $token,
            'cookie' => $cookie,
        ];
    }

    /**
     * Log out a user by revoking tokens and clearing cookies.
     *
     * @param \Illuminate\Http\Request $request
     * @return void
     * @throws \Exception
     */
    public function logout(Request $request): void
    {
        $user = $request->user();
        if ($user) {
            // Revoke all tokens for the user
            $user->tokens()->delete();
        }

        // Clear the auth_token cookie
        Cookie::queue(Cookie::forget('auth_token'));
    }

}