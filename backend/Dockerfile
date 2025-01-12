FROM php:8.2-cli

# Installing necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_pgsql

# Composer Installation
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Working directory settings
WORKDIR /var/www/html

# Copying files to a container
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Setting permissions for Laravel storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Starting a Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
