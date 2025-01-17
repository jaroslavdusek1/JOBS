<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | These settings allow you to control what frontend domains can communicate
    | with the backend. Customize these settings according to your requirements.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    // Define path pro CORS

    'allowed_methods' => ['*'],
    // Allowed HTTP methods

    'allowed_origins' => ['http://localhost:3000'],
    // Allowed FE domains

    'allowed_origins_patterns' => [],
    // Domain patterns

    'allowed_headers' => ['*'],
    // Allowed header

    'exposed_headers' => [],
    // Exposed headers

    'max_age' => 0,
    // Response caching time

    'supports_credentials' => true, // Allow cookies or tokens
];