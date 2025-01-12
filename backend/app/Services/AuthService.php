<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthService
{
    /**
     * Register a new user.
     *
     * @param  array  $data
     * @return \App\Models\User
     * @throws \Exception
     */
    public function register(array $data)
    {
        try {
            // Input validation
            $validator = Validator::make($data, [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users,username',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                Log::error('Validation errors in service:', ['errors' => $validator->errors()->all()]);
                throw new \Exception(implode(', ', $validator->errors()->all()), Response::HTTP_BAD_REQUEST);
            }

            $validatedData = $validator->validated();

            // Sanitize strings
            $validatedData['name'] = htmlspecialchars($validatedData['name']);
            $validatedData['surname'] = htmlspecialchars($validatedData['surname']);
            $validatedData['username'] = htmlspecialchars($validatedData['username']);
            $validatedData['email'] = htmlspecialchars($validatedData['email']);

            // Hash password
            $validatedData['password'] = Hash::make($validatedData['password']);

            $user = User::create($validatedData);

            return $user;
        } catch (\Throwable $e) {
            Log::error('Registration failed:', ['error' => $e->getMessage()]);
            throw new \Exception('Registration failed. Please try again later.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Log in a user with validation, sanitization, and token generation.
     *
     * @param  array  $credentials
     * @return array
     * @throws \Exception
     */
    public function login(array $credentials): array
    {
        try {
            // Input validation
            $validator = Validator::make($credentials, [
                'email' => 'required|email|max:255',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                throw new \Exception(implode(', ', $validator->errors()->all()), Response::HTTP_BAD_REQUEST);
            }

            $validatedCredentials = $validator->validated();

            // Sanitize email
            $validatedCredentials['email'] = htmlspecialchars(trim(strtolower($validatedCredentials['email'])));

            $user = User::where('email', $validatedCredentials['email'])->first();

            if (!$user || !Hash::check($validatedCredentials['password'], $user->password)) {
                throw new \Exception('Invalid credentials', Response::HTTP_UNAUTHORIZED);
            }

            $token = $user->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;

            $cookie = cookie(
                'auth_token',
                $token,
                60 * 24 * 7,
                '/',
                null,
                false,
                true,
                false,
                'None'
            );

            Log::info('User logged in successfully.', ['user_id' => $user->id]);

            return [
                'token' => $token,
                'cookie' => $cookie,
                'user' => $user,
            ];
        } catch (\Throwable $e) {
            Log::error('Login failed:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Log out the user by updating the last_used_at timestamp for the latest token and removing the auth cookie.
     *
     * @throws \Throwable If an error occurs during the logout process.
     */
    public function logout(): void
    {
        try {
            $latestToken = PersonalAccessToken::latest('created_at')->first();

            if ($latestToken) {
                \DB::table('personal_access_tokens')
                    ->where('id', $latestToken->id)
                    ->update(['last_used_at' => Carbon::now()->format('Y-m-d H:i:s')]);

                $latestToken->refresh();
            } else {
                Log::warning('No tokens found in the database.');
            }
        } catch (\Throwable $e) {
            Log::error('Logout failed:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Retrieve the authenticated user from a token with validation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|null
     * @throws \Throwable
     */
    public function getUserFromSession(Request $request): ?array
    {
        try {
            $plainToken = $request->bearerToken();

            if (!$plainToken) {
                Log::warning('No Bearer token provided in Authorization header.');
                return null;
            }

            // Sanitize token
            $plainToken = htmlspecialchars(trim($plainToken));

            $tokenRecord = PersonalAccessToken::findToken($plainToken);

            if (!$tokenRecord) {
                Log::warning('Token not found in DB or invalid.');
                return null;
            }

            if ($tokenRecord->expires_at && Carbon::parse($tokenRecord->expires_at)->isPast()) {
                Log::info('Token is expired.', ['token_id' => $tokenRecord->id]);
                return null;
            }

            if (!$tokenRecord->tokenable) {
                Log::warning('Tokenable entity not found for the token.', ['token_id' => $tokenRecord->id]);
                return null;
            }

            Log::info('Authenticated user retrieved successfully.', ['user_id' => $tokenRecord->tokenable->id]);

            return [
                'user' => $tokenRecord->tokenable,
            ];
        } catch (\Throwable $e) {
            Log::error('Failed to retrieve user from session:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}