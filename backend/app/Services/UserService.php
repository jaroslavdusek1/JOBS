<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get all users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllUsers()
    {
        return User::all();
    }

    /**
     * Get user by ID.
     *
     * @param  int  $id
     * @return \App\Models\User
     */
    public function getUserById($id)
    {
        return User::findOrFail($id);
    }

    /**
     * Update user by ID.
     *
     * @param  \App\Models\User  $user
     * @param  array  $data
     * @return \App\Models\User
     */
    public function updateUser(User $user, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']); // PW hash
        }

        $user->update($data); // Update in DB

        return $user;
    }

    /**
     * Delete user by ID.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function deleteUser(User $user)
    {
        return $user->delete();
    }
}