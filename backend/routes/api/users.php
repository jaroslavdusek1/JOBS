<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Routes for users
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Get all users
    Route::get('/users/{id}', [UserController::class, 'show']); // Get user by ID
    Route::put('/users/{id}', [UserController::class, 'update']); // Update user by ID
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user by ID
});