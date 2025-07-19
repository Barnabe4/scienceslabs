# README-3-Deploiement.md - SciencesLabs E-commerce

## 🚀 Déploiement en Production

### Prérequis Serveur

Pour déployer SciencesLabs en production, vous aurez besoin :

- **Serveur Linux** (Ubuntu 20.04+ recommandé)
- **Nom de domaine** (ex: scienceslabs.tg)
- **Certificat SSL** (Let's Encrypt gratuit)
- **Minimum 2GB RAM, 2 CPU cores, 20GB stockage**

## 🖥️ Configuration du Serveur

### 1. Préparation du Serveur Ubuntu

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des outils essentiels
sudo apt install -y curl wget git unzip software-properties-common

# Installation de Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

### 2. Installation de PostgreSQL

```bash
# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Démarrer et activer PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Configurer PostgreSQL
sudo -u postgres psql -c "CREATE USER scienceslabs_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE_SECURISE';"
sudo -u postgres psql -c "CREATE DATABASE scienceslabs_db OWNER scienceslabs_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE scienceslabs_db TO scienceslabs_user;"
```

### 3. Installation de Nginx

```bash
# Installer Nginx
sudo apt install -y nginx

# Démarrer et activer Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Vérifier le statut
sudo systemctl status nginx
```

### 4. Installation de PM2

```bash
# Installer PM2 globalement
sudo npm install -g pm2

# Configurer PM2 pour démarrer au boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

### 5. Installation de Redis (Optionnel)

```bash
# Installer Redis
sudo apt install -y redis-server

# Configurer Redis
sudo nano /etc/redis/redis.conf

# Modifier ces lignes :
# supervised systemd
# maxmemory 256mb
# maxmemory-policy allkeys-lru

# Redémarrer Redis
sudo systemctl restart redis-server
sudo systemctl enable redis-server
```

## 📁 Déploiement de l'Application

### 1. Cloner le Projet

```bash
# Créer un utilisateur pour l'application
sudo adduser scienceslabs
sudo usermod -aG sudo scienceslabs

# Se connecter en tant que scienceslabs
sudo su - scienceslabs

# Cloner le projet
git clone https://github.com/votre-organisation/scienceslabs-ecommerce.git
cd scienceslabs-ecommerce

# Installer les dépendances
npm install --production
```

### 2. Configuration de l'Environnement

```bash
# Copier et configurer .env
cp .env.example .env
nano .env
```

Configuration `.env` pour la production :

```env
# Application
NODE_ENV=production
PORT=3001
APP_NAME=SciencesLabs
APP_URL=https://scienceslabs.tg

# Base de données
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=scienceslabs_db
DB_USER=scienceslabs_user
DB_PASSWORD=VOTRE_MOT_DE_PASSE_SECURISE

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=VOTRE_JWT_SECRET_TRES_LONG_ET_SECURISE_POUR_PRODUCTION
JWT_EXPIRES_IN=7d

# Email (Configuration SMTP réelle)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@scienceslabs.tg
SMTP_PASSWORD=VOTRE_MOT_DE_PASSE_APP_GMAIL

# Paiement (Clés de production)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=VOTRE_PAYPAL_CLIENT_ID_PRODUCTION
PAYPAL_CLIENT_SECRET=VOTRE_PAYPAL_SECRET_PRODUCTION

# Mobile Money Togo
TMONEY_API_KEY=VOTRE_CLE_TMONEY
FLOOZ_API_KEY=VOTRE_CLE_FLOOZ

# Stockage
UPLOAD_PATH=/home/scienceslabs/uploads
MAX_FILE_SIZE=10485760

# Sécurité
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
CORS_ORIGIN=https://scienceslabs.tg

# Logs
LOG_LEVEL=warn
LOG_FILE=/home/scienceslabs/logs/app.log

# Monitoring
SENTRY_DSN=VOTRE_SENTRY_DSN
```

### 3. Build de Production

```bash
# Build de l'application
npm run build

# Créer les dossiers nécessaires
mkdir -p logs uploads backups

# Définir les permissions
chmod 755 uploads
chmod 755 logs
```

### 4. Configuration PM2

Créer `ecosystem.config.js` :

```javascript
module.exports = {
  apps: [{
    name: 'scienceslabs-api',
    script: './dist/server/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }, {
    name: 'scienceslabs-frontend',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: './dist',
      PM2_SERVE_PORT: 3000,
      PM2_SERVE_SPA: 'true'
    }
  }]
};
```

### 5. Démarrer l'Application

```bash
# Installer serve pour le frontend
npm install -g serve

# Démarrer avec PM2
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Vérifier le statut
pm2 status
pm2 logs
```

## 🌐 Configuration Nginx

### 1. Configuration du Virtual Host

Créer `/etc/nginx/sites-available/scienceslabs.tg` :

```nginx
# Redirection HTTP vers HTTPS
server {
    listen 80;
    server_name scienceslabs.tg www.scienceslabs.tg;
    return 301 https://$server_name$request_uri;
}

# Configuration HTTPS
server {
    listen 443 ssl http2;
    server_name scienceslabs.tg www.scienceslabs.tg;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/scienceslabs.tg/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/scienceslabs.tg/privkey.pem;
    
    # Configuration SSL sécurisée
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Headers de sécurité
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Limite de taille des uploads
    client_max_body_size 10M;

    # Frontend (React)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Fallback pour SPA
        try_files $uri $uri/ @fallback;
    }

    # API Backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout pour les requêtes longues
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket pour le chat en temps réel
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Fichiers statiques avec cache
    location /uploads/ {
        alias /home/scienceslabs/scienceslabs-ecommerce/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Fallback pour SPA
    location @fallback {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Logs
    access_log /var/log/nginx/scienceslabs_access.log;
    error_log /var/log/nginx/scienceslabs_error.log;
}
```

### 2. Activer le Site

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/scienceslabs.tg /etc/nginx/sites-enabled/

# Supprimer le site par défaut
sudo rm /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## 🔒 Configuration SSL avec Let's Encrypt

### 1. Installation de Certbot

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d scienceslabs.tg -d www.scienceslabs.tg

# Tester le renouvellement automatique
sudo certbot renew --dry-run
```

### 2. Configuration du Renouvellement Automatique

```bash
# Ajouter une tâche cron pour le renouvellement
sudo crontab -e

# Ajouter cette ligne :
0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## 🔥 Configuration du Firewall

### 1. Configuration UFW

```bash
# Activer UFW
sudo ufw enable

# Autoriser SSH
sudo ufw allow ssh

# Autoriser HTTP et HTTPS
sudo ufw allow 'Nginx Full'

# Autoriser PostgreSQL (si accès externe nécessaire)
sudo ufw allow 5432

# Vérifier les règles
sudo ufw status
```

## 📊 Monitoring et Logs

### 1. Configuration des Logs

```bash
# Créer la rotation des logs
sudo nano /etc/logrotate.d/scienceslabs

# Contenu :
/home/scienceslabs/scienceslabs-ecommerce/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 scienceslabs scienceslabs
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 2. Monitoring avec PM2

```bash
# Installer PM2 monitoring
pm2 install pm2-server-monit

# Configurer les alertes
pm2 set pm2-server-monit:conf '{"email": "admin@scienceslabs.tg"}'
```

## 🔄 Scripts de Déploiement

### 1. Script de Déploiement Automatique

Créer `scripts/deploy.sh` :

```bash
#!/bin/bash

echo "🚀 Déploiement de SciencesLabs..."

# Variables
APP_DIR="/home/scienceslabs/scienceslabs-ecommerce"
BACKUP_DIR="/home/scienceslabs/backups"

# Créer une sauvegarde
echo "📦 Création de la sauvegarde..."
pg_dump -h localhost -U scienceslabs_user scienceslabs_db > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql

# Aller dans le dossier de l'application
cd $APP_DIR

# Sauvegarder la version actuelle
echo "💾 Sauvegarde de la version actuelle..."
git stash

# Récupérer les dernières modifications
echo "📥 Récupération des modifications..."
git pull origin main

# Installer les nouvelles dépendances
echo "📦 Installation des dépendances..."
npm install --production

# Exécuter les migrations
echo "🗄️ Exécution des migrations..."
npm run db:migrate

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

# Redémarrer l'application
echo "🔄 Redémarrage de l'application..."
pm2 restart ecosystem.config.js

# Vérifier le statut
echo "✅ Vérification du statut..."
pm2 status

echo "🎉 Déploiement terminé avec succès !"
```

### 2. Rendre le script exécutable

```bash
chmod +x scripts/deploy.sh
```

## 🔧 Configuration des Services Externes

### 1. Configuration Email (Gmail)

```bash
# Activer l'authentification à 2 facteurs sur Gmail
# Générer un mot de passe d'application
# Utiliser ce mot de passe dans SMTP_PASSWORD
```

### 2. Configuration Paiement Mobile Money Togo

Pour T-Money et Flooz, contactez :
- **T-Money :** https://www.togocom.tg/tmoney-business
- **Flooz :** https://flooz.moov.africa/business

### 3. Configuration Stripe

```bash
# Créer un compte Stripe
# Récupérer les clés de production
# Configurer les webhooks pour :
# - payment_intent.succeeded
# - payment_intent.payment_failed
```

## 📱 Optimisation Mobile

### 1. Configuration PWA

Créer `public/manifest.json` :

```json
{
  "name": "SciencesLabs - Matériel Scientifique",
  "short_name": "SciencesLabs",
  "description": "Votre fournisseur de matériel scientifique au Togo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker

Créer `public/sw.js` :

```javascript
const CACHE_NAME = 'scienceslabs-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

## ✅ Validation du Déploiement

Le déploiement est réussi si :

- [ ] Le site est accessible via https://scienceslabs.tg
- [ ] L'API répond sur https://scienceslabs.tg/api/health
- [ ] Les certificats SSL sont valides
- [ ] PM2 montre les processus en cours d'exécution
- [ ] Les logs ne montrent pas d'erreurs critiques
- [ ] La base de données est accessible
- [ ] Les paiements de test fonctionnent

## 🔄 Prochaines Étapes

1. **Gestion des modules** → Voir `README-4-Gestion-Modules.md`
2. **Maintenance et monitoring** → Voir `README-5-Demarrage-et-Maintenance.md`

---

**Support :** Pour toute question de déploiement, contactez l'équipe DevOps.