<?php

use Illuminate\Support\Facades\Route;

// Load routes from multiple files
require base_path('routes/api/auth.php');
require base_path('routes/api/jobs.php');
require base_path('routes/api/users.php');

// require __DIR__ . '/api/auth.php';
// require __DIR__ . '/api/jobs.php';
// require __DIR__ . '/api/users.php';

Route::get('/test', function () {
    return response()->json(['message' => 'Hello from /test']);
});
