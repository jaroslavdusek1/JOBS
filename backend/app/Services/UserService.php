<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    /**
     * Get all users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws \Throwable
     */
    public function getAllUsers()
    {
        try {
            return User::all();
        } catch (\Throwable $e) {
            \Log::error('Error fetching all users:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Get user by ID.
     *
     * @param  int  $id
     * @return \App\Models\User
     * @throws \Throwable
     */
    public function getUserById($id)
    {
        try {
            // Validate the ID
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid user ID: ' . implode(', ', $validator->errors()->all()));
            }

            return User::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            \Log::warning('User not found:', ['id' => $id, 'error' => $e->getMessage()]);
            throw $e;
        } catch (\Throwable $e) {
            \Log::error('Error fetching user by ID:', ['id' => $id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Update user by ID.
     *
     * @param  \App\Models\User  $user
     * @param  array  $data
     * @return \App\Models\User
     * @throws \Throwable
     */
    public function updateUser(User $user, array $data)
    {
        try {
            // Validate the input
            $validator = Validator::make($data, [
                'name' => 'sometimes|required|string|max:255|trim',
                'surname' => 'sometimes|required|string|max:255|trim',
                'email' => 'sometimes|required|email|max:255|unique:users,email,' . $user->id . '|trim|lowercase',
                'password' => 'sometimes|required|string|min:6',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid data: ' . implode(', ', $validator->errors()->all()));
            }

            $validatedData = $validator->validated();

            // Sanitize inputs
            if (isset($validatedData['name'])) {
                $validatedData['name'] = htmlspecialchars(trim($validatedData['name']));
            }
            if (isset($validatedData['surname'])) {
                $validatedData['surname'] = htmlspecialchars(trim($validatedData['surname']));
            }
            if (isset($validatedData['email'])) {
                $validatedData['email'] = htmlspecialchars(trim($validatedData['email']));
            }

            // Hash password if present
            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);

            return $user;
        } catch (\Throwable $e) {
            \Log::error('Error updating user:', ['user_id' => $user->id, 'data' => $data, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Delete user by ID.
     *
     * @param  \App\Models\User  $user
     * @return bool
     * @throws \Throwable
     */
    public function deleteUser(User $user)
    {
        try {
            return $user->delete();
        } catch (\Throwable $e) {
            \Log::error('Error deleting user:', ['user_id' => $user->id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }
}
