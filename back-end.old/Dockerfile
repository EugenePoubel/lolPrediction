FROM php:8.1-fpm

RUN apt-get update && \
    apt-get install -y \
        libicu-dev \
        libpq-dev \
        git \
        unzip \
        && docker-php-ext-configure intl \
        && docker-php-ext-install intl pdo pdo_pgsql opcache

WORKDIR /back-end

COPY /back-end /back-end

# Installer les dépendances Symfony
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-interaction

EXPOSE 9000

CMD ["php-fpm"]

