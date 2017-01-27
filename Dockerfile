FROM fholzer/nginx-brotli
MAINTAINER Michel Kraemer <michel.kraemer@igd.fraunhofer.de>

RUN echo "gzip_static on;" > /etc/nginx/conf.d/gzip_static.conf
RUN echo "brotli_static on;" > /etc/nginx/conf.d/brotli_static.conf
RUN sed -i -e "s/server_name\s*localhost;/server_name georocket.io;\n\
    listen 443 ssl http2;\n\
    ssl_certificate ssl\/nginx.crt;\n\
    ssl_certificate_key ssl\/nginx.key;\n\
    ssl_trusted_certificate ssl\/nginx.crt;\n\
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n\
    if (\$scheme != 'https') {\n\
        rewrite ^ https:\/\/\$host\$uri permanent;\n\
    }/" /etc/nginx/conf.d/default.conf
RUN sed -i -e "s/location\s*\/\s*{/\0\n\
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
