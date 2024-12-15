server {
    listen 443 ssl;
    server_name gsqhub.com www.gsqhub.com;

    ssl_certificate /etc/letsencrypt/live/gsqhub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gsqhub.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Frontend: Servindo o React build
    root /var/www/amigosecreto/frontend/build;
    index index.html;

    # Servindo o frontend para rotas desconhecidas
    location / {
        try_files $uri /index.html;
    }

    # Backend: Redirecionar todas as rotas do Express
    location /users {
        proxy_pass http://localhost:3000/users;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /groups {
        proxy_pass http://localhost:3000/groups;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page 404 /index.html;
}
