<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Register a new user.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    /**
     * Log in a user and generate a token.
     *
     * @param  array  $credentials
     * @return string
     * @throws ValidationException
     */
    public function login(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        return $user->createToken('auth_token')->plainTextToken;
    }

    /**
     * Log out the authenticated user.
     *
     * @return void
     */
    public function logout()
    {
        Auth::user()->tokens()->delete(); // Revoke all tokens
    }
}