<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test1', function () {
    // dd('Reached /test1 route!');
    return response()->json(['message' => 'API working']);
});

Route::get('/test2', function () {
    return response()->json(['message' => 'OK']);
});

Route::get('/test3', function () {
    return response()->json(['message' => 'Hello from /test']);
});