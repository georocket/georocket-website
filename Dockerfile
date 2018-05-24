FROM fholzer/nginx-brotli
MAINTAINER Michel Kraemer <michel.kraemer@igd.fraunhofer.de>

RUN apk -U add php5-fpm php5-json

RUN echo "gzip_static on;" > /etc/nginx/conf.d/gzip_static.conf
RUN echo "brotli_static on;" > /etc/nginx/conf.d/brotli_static.conf
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
RUN sed -i -e "s/location\s*\/\s*{/\0\n\
        expires 1d;\n\
        location ~ \/(js|css|images)\/ {\n\
            expires 7d;\n\
        }\n\
        location ~ \/(piwik)\/ {\n\
            index index.php;\n\
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
        }\
    /" /etc/nginx/conf.d/default.conf

RUN apk add -U openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=DE/ST=Hessen/L=Darmstadt/O=Fraunhofer IGD/OU=Spatial Information Management/CN=georocket.io" && \
    apk del openssl

COPY site /usr/share/nginx/html

CMD /usr/bin/php-fpm5 -D; nginx -g "daemon off;"
