<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Protected variable
    // Useable only within this class UserController scope
    protected $userService;

    /**
     * Inject UserService into the controller.
     *
     * @param  \App\Services\UserService  $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = $this->userService->getAllUsers();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404); // 404 Not found
        }

        return response()->json($users, 200); // 200 OK
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = $this->userService->getUserById($id);
            return response()->json($user, 200); // 200 OK
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404); // 404 Not found
        }
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'surname' => 'sometimes|string|max:255',
                'username' => 'sometimes|string|max:255|unique:users,username,' . $id,
                'email' => 'sometimes|email|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:6',
            ]);

            $updatedUser = $this->userService->updateUser($user, $validated);

            return response()->json($updatedUser, 200); // 200 OK
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 422); // 422 Unprocessable Entity
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404); // 404 Not Found
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500); // 500 Internal Server Error
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($this->userService->deleteUser($user)) {
                return response()->json(['message' => 'User deleted successfully'], 200); // 200 OK
            }

            return response()->json(['error' => 'Failed to delete user'], 500); // 500 Internal Server Error
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404); // 404 Not Found
        }
    }
}