<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/login', [AuthController::class, 'login']); // Login
Route::post('/register', [AuthController::class, 'register']); // Register
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum'); // Logout
