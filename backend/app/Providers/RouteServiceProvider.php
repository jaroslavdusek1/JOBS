<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for the application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Set rules for requests processing.
     *
     * @return void
     */
    public function boot()
    {
        // Call configureRateLimitin fnc
        $this->configureRateLimiting(); // function below

        // Register routes, loads routing from routes/api.php, add prefix /api, apply middleware
        $this->routes(function () {
            Route::middleware('api')
                // ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                // ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Set up 'Rate Limiting', this mechanis limits the number of requests sent in a certain period of time.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('global', function ($request) {
            return Limit::perMinute(20); // Limit 20 requests per minute
        });
    }
}
