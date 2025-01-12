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

    // Define path pro CORS
    // CORS handling
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'register', 'login', 'getUser', 'logout', 'jobs', 'jobs/*', 'users/*/jobs'],

    // Allowed HTTP methods
    'allowed_methods' => ['*'],

    // Allowed FE domains
    'allowed_origins' => ['http://localhost:3000'],

    // Domain patterns
    'allowed_origins_patterns' => [],

    // Allowed header
    'allowed_headers' => ['*'],

    // Exposed headers
    'exposed_headers' => [],

    // Response caching time
    'max_age' => 0,

    'supports_credentials' => true, // Allow cookies or tokens
];