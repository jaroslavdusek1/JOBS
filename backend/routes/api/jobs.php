<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

// Job routes
// Allow access only logged users to
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/jobs', [JobController::class, 'index']); // Get all jobs
    Route::post('/jobs', [JobController::class, 'store']); // Create a job
    Route::get('/jobs/{id}', [JobController::class, 'show']); // Get job details
    Route::put('/jobs/{id}', [JobController::class, 'update']); // Update a job
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']); // Delete a job
});
