FROM fholzer/nginx-brotli
MAINTAINER Michel Kraemer <michel.kraemer@igd.fraunhofer.de>

RUN apk -U add \
        php7 \
        php7-bcmath \
        php7-dom \
        php7-ctype \
        php7-curl \
        php7-fileinfo \
        php7-fpm \
        php7-gd \
        php7-iconv \
        php7-intl \
        php7-json \
        php7-mbstring \
        php7-mcrypt \
        php7-mysqlnd \
        php7-opcache \
        php7-openssl \
        php7-pdo \
        php7-pdo_mysql \
        php7-pdo_pgsql \
        php7-pdo_sqlite \
        php7-phar \
        php7-posix \
        php7-simplexml \
        php7-session \
        php7-soap \
        php7-tokenizer \
        php7-xml \
        php7-xmlreader \
        php7-xmlwriter \
        php7-zip \
        php7-zlib \
    && rm -rf /var/cache/apk/*

RUN echo "gzip_static on;" > /etc/nginx/conf.d/gzip_static.conf
RUN sed -i -e "s/server_name\s*localhost;/server_name georocket.io;\n\
    listen 443 ssl http2;\n\
    ssl_certificate ssl\/nginx.crt;\n\
    ssl_certificate_key ssl\/nginx.key;\n\
    ssl_trusted_certificate ssl\/nginx.crt;\n\
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n\
    if (\$host ~ ^www\\\\.) {\n\
        rewrite ^ https:\/\/georocket.io\$uri permanent;\n\
    }\n\
    if (\$host = 'georocket-website.igd.fraunhofer.de') {\n\
        rewrite ^ https:\/\/georocket.io\$uri permanent;\n\
    }\n\
    if (\$host = 'georocket.org') {\n\
        rewrite ^ https:\/\/georocket.io\$uri permanent;\n\
    }\n\
    if (\$scheme != 'https') {\n\
        rewrite ^ https:\/\/georocket.io\$uri permanent;\n\
    }/" /etc/nginx/conf.d/default.conf
RUN sed -i -e "s/location\s*\/\s*{/location \/piwik {\n\
        root \/usr\/share\/nginx\/html;\n\
        index index.php;\n\
        expires off;\n\
        location ~ [^\/]\\\\.php(\/|\$) {\n\
            fastcgi_split_path_info ^(.+?\\\\.php)(\/.*)\$;\n\
            if (!-f \$document_root\$fastcgi_script_name) {\n\
                return 404;\n\
            }\n\
            # Mitigate https:\/\/httpoxy.org\/ vulnerabilities\n\
            fastcgi_param  HTTP_PROXY \"\";\n\
            # Add params not defined in 'fastcgi_params'\n\
            fastcgi_param  SCRIPT_FILENAME \$document_root\$fastcgi_script_name;\n\
            fastcgi_param  PATH_INFO       \$fastcgi_path_info;\n\
            fastcgi_param  PATH_TRANSLATED \$document_root\$fastcgi_script_name;\n\
            fastcgi_pass   127.0.0.1:9000;\n\
            fastcgi_index  index.php;\n\
            include        fastcgi_params;\n\
        }\n\
    }\n\
    \0\n\
        expires 1d;\n\
        location ~ \/(js|css|images)\/ {\n\
           expires 7d;\n\
        }\
    /" /etc/nginx/conf.d/default.conf

RUN apk add -U openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=DE/ST=Hessen/L=Darmstadt/O=Fraunhofer IGD/OU=Spatial Information Management/CN=georocket.io" && \
    apk del openssl

COPY site /usr/share/nginx/html

CMD /usr/sbin/php-fpm7 -D; nginx -g "daemon off;"
