FROM php:8.2-fpm

RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
# Instalação do Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Copia o arquivo de configuração do Xdebug para o diretório correto
COPY ./xdebug.ini /usr/local/etc/php/conf.d/

# Instalação do Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

CMD ["php-fpm"]
