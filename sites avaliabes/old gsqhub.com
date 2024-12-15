server {
    server_name gsqhub.com www.gsqhub.com;

    # Servindo o frontend do React
    root /var/www/amigosecreto/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Proxy para o backend Node.js
    location / {
        proxy_pass http://localhost:3000; # Substitua pela porta do seu backend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page 404 /index.html;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/gsqhub.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/gsqhub.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.gsqhub.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = gsqhub.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name gsqhub.com www.gsqhub.com;
    return 404; # managed by Certbot




}
