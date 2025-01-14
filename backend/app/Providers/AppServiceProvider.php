<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// This is a place for depedencies and services registration before/after start up
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * This is run before the app init
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     * This is run after the app init
     */
    public function boot(): void
    {
        //
    }
}
