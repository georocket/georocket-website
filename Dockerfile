FROM fholzer/nginx-brotli
MAINTAINER Michel Kraemer <michel.kraemer@igd.fraunhofer.de>

RUN echo "gzip_static on;" > /etc/nginx/conf.d/gzip_static.conf
RUN sed -i -e "s/server_name\s*localhost;/server_name georocket.io;\n\
    listen 443 ssl http2;\n\
    ssl_certificate ssl\/nginx.crt;\n\
    ssl_certificate_key ssl\/nginx.key;\n\
    ssl_trusted_certificate ssl\/nginx.crt;\n\
    ssl_protocols TLSv1.2 TLSv1.3;\n\
    ssl_session_timeout 1d;\n\
    ssl_session_cache shared:MozSSL:10m;\n\
    ssl_session_tickets off;\n\
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;\n\
    ssl_prefer_server_ciphers off;\n\
    add_header Strict-Transport-Security "max-age=63072000" always;\n\
    ssl_stapling on;\n\
    ssl_stapling_verify on;\n\
    add_header X-Frame-Options "SAMEORIGIN";\n\
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
        location ~ \/(try)\/? {\n\
           return 301 \/download\/;\n\
        }\n\
        location ~ \/(products)\/? {\n\
           return 301 \/features\/;\n\
        }\
    /" /etc/nginx/conf.d/default.conf

RUN apk add -U openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=DE/ST=Hessen/L=Darmstadt/O=Fraunhofer IGD/OU=Spatial Information Management/CN=georocket.io" && \
    apk del openssl

COPY site /usr/share/nginx/html
