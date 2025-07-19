# README-5-Demarrage-et-Maintenance.md - SciencesLabs E-commerce

## 🚀 Démarrage et Maintenance de Production

### Procédures de Démarrage

## 🔄 Démarrage Initial

### 1. Vérifications Pré-démarrage

```bash
# Vérifier l'état du serveur
sudo systemctl status nginx
sudo systemctl status postgresql
sudo systemctl status redis-server

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h

# Vérifier les processus
ps aux | grep node
```

### 2. Démarrage de l'Application

```bash
# Se connecter en tant que scienceslabs
sudo su - scienceslabs
cd scienceslabs-ecommerce

# Vérifier la configuration
node scripts/test-db.js

# Démarrer l'application
pm2 start ecosystem.config.js

# Vérifier le statut
pm2 status
pm2 logs --lines 50
```

### 3. Vérifications Post-démarrage

```bash
# Tester l'API
curl -f https://scienceslabs.tg/api/health

# Tester le frontend
curl -f https://scienceslabs.tg

# Vérifier les certificats SSL
openssl s_client -connect scienceslabs.tg:443 -servername scienceslabs.tg

# Tester les paiements (mode test)
curl -X POST https://scienceslabs.tg/api/payments/test
```

## 🔧 Maintenance Quotidienne

### 1. Script de Vérification Quotidienne

Créer `scripts/daily-check.sh` :

```bash
#!/bin/bash

LOG_FILE="/home/scienceslabs/logs/daily-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Début des vérifications quotidiennes" >> $LOG_FILE

# Vérifier l'espace disque
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "[$DATE] ALERTE: Espace disque faible ($DISK_USAGE%)" >> $LOG_FILE
    # Envoyer une alerte email
    echo "Espace disque faible sur scienceslabs.tg: $DISK_USAGE%" | mail -s "Alerte Serveur" admin@scienceslabs.tg
fi

# Vérifier la mémoire
MEM_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $MEM_USAGE -gt 85 ]; then
    echo "[$DATE] ALERTE: Utilisation mémoire élevée ($MEM_USAGE%)" >> $LOG_FILE
fi

# Vérifier les processus PM2
PM2_STATUS=$(pm2 jlist | jq -r '.[].pm2_env.status' | grep -v "online" | wc -l)
if [ $PM2_STATUS -gt 0 ]; then
    echo "[$DATE] ALERTE: $PM2_STATUS processus PM2 non en ligne" >> $LOG_FILE
    pm2 restart all
fi

# Vérifier la base de données
DB_CONNECTIONS=$(psql -h localhost -U scienceslabs_user -d scienceslabs_db -t -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'scienceslabs_db';")
echo "[$DATE] Connexions DB actives: $DB_CONNECTIONS" >> $LOG_FILE

# Vérifier les logs d'erreur
ERROR_COUNT=$(tail -n 1000 /home/scienceslabs/logs/app.log | grep -i error | wc -l)
if [ $ERROR_COUNT -gt 10 ]; then
    echo "[$DATE] ALERTE: $ERROR_COUNT erreurs dans les logs" >> $LOG_FILE
fi

# Nettoyer les fichiers temporaires
find /tmp -name "*.tmp" -mtime +1 -delete
find /home/scienceslabs/logs -name "*.log.*" -mtime +30 -delete

echo "[$DATE] Vérifications quotidiennes terminées" >> $LOG_FILE
```

### 2. Automatiser les Vérifications

```bash
# Ajouter au crontab
crontab -e

# Ajouter ces lignes :
# Vérifications quotidiennes à 6h00
0 6 * * * /home/scienceslabs/scienceslabs-ecommerce/scripts/daily-check.sh

# Sauvegarde quotidienne à 2h00
0 2 * * * /home/scienceslabs/scienceslabs-ecommerce/scripts/backup.sh

# Nettoyage des logs à 3h00
0 3 * * * /usr/sbin/logrotate /etc/logrotate.d/scienceslabs

# Renouvellement SSL (vérification quotidienne)
0 4 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## 📊 Monitoring et Alertes

### 1. Configuration des Alertes Email

Créer `scripts/alert-system.js` :

```javascript
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

class AlertSystem {
  static async sendAlert(type, message, details = {}) {
    const alertConfig = {
      critical: {
        subject: '🚨 ALERTE CRITIQUE - SciencesLabs',
        priority: 'high',
        recipients: ['admin@scienceslabs.tg', 'tech@scienceslabs.tg']
      },
      warning: {
        subject: '⚠️ AVERTISSEMENT - SciencesLabs',
        priority: 'normal',
        recipients: ['admin@scienceslabs.tg']
      },
      info: {
        subject: 'ℹ️ INFO - SciencesLabs',
        priority: 'low',
        recipients: ['admin@scienceslabs.tg']
      }
    };

    const config = alertConfig[type] || alertConfig.info;

    const emailContent = `
      <h2>${config.subject}</h2>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Heure:</strong> ${new Date().toLocaleString('fr-FR')}</p>
      <p><strong>Serveur:</strong> ${process.env.APP_URL}</p>
      
      ${Object.keys(details).length > 0 ? `
        <h3>Détails:</h3>
        <ul>
          ${Object.entries(details).map(([key, value]) => 
            `<li><strong>${key}:</strong> ${value}</li>`
          ).join('')}
        </ul>
      ` : ''}
      
      <hr>
      <p><small>Alerte automatique du système SciencesLabs</small></p>
    `;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: config.recipients.join(','),
        subject: config.subject,
        html: emailContent,
        priority: config.priority
      });

      console.log(`Alerte ${type} envoyée: ${message}`);
    } catch (error) {
      console.error('Erreur envoi alerte:', error);
    }
  }

  static async checkSystemHealth() {
    const checks = [];

    // Vérifier l'espace disque
    const diskUsage = await this.getDiskUsage();
    if (diskUsage > 80) {
      checks.push({
        type: 'critical',
        message: `Espace disque critique: ${diskUsage}%`,
        details: { diskUsage: `${diskUsage}%` }
      });
    }

    // Vérifier la mémoire
    const memUsage = await this.getMemoryUsage();
    if (memUsage > 85) {
      checks.push({
        type: 'warning',
        message: `Utilisation mémoire élevée: ${memUsage}%`,
        details: { memoryUsage: `${memUsage}%` }
      });
    }

    // Vérifier la base de données
    try {
      await this.checkDatabase();
    } catch (error) {
      checks.push({
        type: 'critical',
        message: 'Erreur de connexion à la base de données',
        details: { error: error.message }
      });
    }

    // Envoyer les alertes
    for (const check of checks) {
      await this.sendAlert(check.type, check.message, check.details);
    }

    return checks;
  }

  static async getDiskUsage() {
    const { exec } = require('child_process');
    return new Promise((resolve) => {
      exec("df / | awk 'NR==2 {print $5}' | sed 's/%//'", (error, stdout) => {
        resolve(parseInt(stdout.trim()) || 0);
      });
    });
  }

  static async getMemoryUsage() {
    const { exec } = require('child_process');
    return new Promise((resolve) => {
      exec("free | awk 'NR==2{printf \"%.0f\", $3*100/$2}'", (error, stdout) => {
        resolve(parseInt(stdout.trim()) || 0);
      });
    });
  }

  static async checkDatabase() {
    const { Pool } = require('pg');
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    await pool.end();
  }
}

module.exports = AlertSystem;
```

### 2. Monitoring en Temps Réel

```bash
# Installer les outils de monitoring
npm install express-status-monitor prom-client

# Ajouter au crontab pour vérifications toutes les 5 minutes
*/5 * * * * /usr/bin/node /home/scienceslabs/scienceslabs-ecommerce/scripts/alert-system.js
```

## 🔄 Procédures de Mise à Jour

### 1. Mise à Jour Mineure (Patch)

```bash
#!/bin/bash
# scripts/update-patch.sh

echo "🔄 Mise à jour mineure en cours..."

# Sauvegarder la base de données
pg_dump -h localhost -U scienceslabs_user scienceslabs_db > backups/pre-update-$(date +%Y%m%d_%H%M%S).sql

# Récupérer les modifications
git fetch origin
git checkout main
git pull origin main

# Installer les nouvelles dépendances
npm install --production

# Redémarrer l'application
pm2 restart all

# Vérifier le statut
pm2 status

echo "✅ Mise à jour terminée"
```

### 2. Mise à Jour Majeure

```bash
#!/bin/bash
# scripts/update-major.sh

echo "🚀 Mise à jour majeure en cours..."

# Mode maintenance
echo "Mode maintenance activé"
pm2 stop all

# Page de maintenance Nginx
sudo cp maintenance.html /var/www/html/
sudo nano /etc/nginx/sites-available/scienceslabs.tg
# Ajouter: return 503; dans la location /

sudo nginx -s reload

# Sauvegarde complète
pg_dump -h localhost -U scienceslabs_user scienceslabs_db > backups/major-update-$(date +%Y%m%d_%H%M%S).sql
tar -czf backups/app-backup-$(date +%Y%m%d_%H%M%S).tar.gz .

# Mise à jour
git pull origin main
npm install --production
npm run build

# Migrations de base de données
npm run db:migrate

# Tests
npm test

# Redémarrage
pm2 start ecosystem.config.js

# Retirer le mode maintenance
sudo nano /etc/nginx/sites-available/scienceslabs.tg
# Supprimer: return 503;
sudo nginx -s reload

echo "✅ Mise à jour majeure terminée"
```

## 🔒 Sécurité et Sauvegardes

### 1. Sauvegarde Automatique

Créer `scripts/backup-full.sh` :

```bash
#!/bin/bash

BACKUP_DIR="/home/scienceslabs/backups"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/home/scienceslabs/scienceslabs-ecommerce"

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

echo "🗄️ Sauvegarde de la base de données..."
pg_dump -h localhost -U scienceslabs_user scienceslabs_db | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

echo "📁 Sauvegarde des fichiers uploadés..."
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz -C $APP_DIR uploads/

echo "⚙️ Sauvegarde de la configuration..."
tar -czf $BACKUP_DIR/config_backup_$DATE.tar.gz -C $APP_DIR .env ecosystem.config.js

echo "📊 Sauvegarde des logs..."
tar -czf $BACKUP_DIR/logs_backup_$DATE.tar.gz -C $APP_DIR logs/

# Nettoyer les anciennes sauvegardes (garder 30 jours)
find $BACKUP_DIR -name "*_backup_*.gz" -mtime +30 -delete

echo "✅ Sauvegarde terminée: $BACKUP_DIR/*_backup_$DATE.*"

# Optionnel: Envoyer vers un stockage externe
# rsync -av $BACKUP_DIR/ user@backup-server:/backups/scienceslabs/
```

### 2. Monitoring de Sécurité

```bash
# Installer fail2ban pour la protection
sudo apt install -y fail2ban

# Configurer fail2ban
sudo nano /etc/fail2ban/jail.local
```

Configuration fail2ban :

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
```

### 3. Audit de Sécurité

Créer `scripts/security-audit.sh` :

```bash
#!/bin/bash

echo "🔒 Audit de sécurité SciencesLabs..."

# Vérifier les permissions des fichiers
echo "Vérification des permissions..."
find /home/scienceslabs/scienceslabs-ecommerce -type f -perm /o+w -exec ls -l {} \;

# Vérifier les certificats SSL
echo "Vérification SSL..."
openssl x509 -in /etc/letsencrypt/live/scienceslabs.tg/cert.pem -text -noout | grep "Not After"

# Vérifier les connexions réseau
echo "Connexions actives..."
netstat -tulpn | grep LISTEN

# Vérifier les utilisateurs connectés
echo "Utilisateurs connectés..."
who

# Vérifier les tentatives de connexion échouées
echo "Tentatives de connexion échouées..."
grep "Failed password" /var/log/auth.log | tail -10

# Vérifier les mises à jour de sécurité
echo "Mises à jour de sécurité disponibles..."
apt list --upgradable | grep -i security

echo "✅ Audit de sécurité terminé"
```

## 📈 Optimisation des Performances

### 1. Optimisation Base de Données

```sql
-- Analyser les performances
ANALYZE;

-- Vérifier les requêtes lentes
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Optimiser les index
CREATE INDEX CONCURRENTLY idx_orders_created_at_status ON orders(created_at, status);
CREATE INDEX CONCURRENTLY idx_products_category_status ON products(category_id, status);
```

### 2. Optimisation Nginx

```nginx
# Ajouter dans /etc/nginx/nginx.conf
worker_processes auto;
worker_connections 1024;

# Cache statique
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/css application/javascript application/json;
```

### 3. Optimisation PM2

```javascript
// ecosystem.config.js optimisé
module.exports = {
  apps: [{
    name: 'scienceslabs-api',
    script: './dist/server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## 🚨 Procédures d'Urgence

### 1. Restauration Rapide

```bash
#!/bin/bash
# scripts/emergency-restore.sh

echo "🚨 Restauration d'urgence..."

# Arrêter l'application
pm2 stop all

# Restaurer la dernière sauvegarde
LATEST_BACKUP=$(ls -t backups/db_backup_*.sql.gz | head -1)
echo "Restauration de: $LATEST_BACKUP"

# Restaurer la base de données
gunzip -c $LATEST_BACKUP | psql -h localhost -U scienceslabs_user -d scienceslabs_db

# Redémarrer
pm2 start ecosystem.config.js

echo "✅ Restauration terminée"
```

### 2. Contacts d'Urgence

```bash
# Créer un fichier de contacts
cat > emergency-contacts.txt << EOF
=== CONTACTS D'URGENCE SCIENCESLABS ===

Administrateur Système: +228 XX XX XX XX
Développeur Principal: +228 XX XX XX XX
Hébergeur: support@votre-hebergeur.com
Registrar Domaine: support@registrar.com

=== SERVICES CRITIQUES ===
Base de données: PostgreSQL sur localhost:5432
Serveur Web: Nginx sur port 80/443
Application: PM2 cluster sur port 3001
Cache: Redis sur port 6379

=== PROCÉDURES D'URGENCE ===
1. Vérifier les logs: tail -f /home/scienceslabs/logs/app.log
2. Redémarrer l'app: pm2 restart all
3. Redémarrer Nginx: sudo systemctl restart nginx
4. Restaurer DB: scripts/emergency-restore.sh
EOF
```

## 📋 Checklist de Maintenance

### Quotidienne
- [ ] Vérifier les logs d'erreur
- [ ] Contrôler l'espace disque
- [ ] Vérifier les processus PM2
- [ ] Contrôler les métriques de performance

### Hebdomadaire
- [ ] Analyser les statistiques de vente
- [ ] Vérifier les sauvegardes
- [ ] Contrôler les certificats SSL
- [ ] Audit des connexions utilisateurs

### Mensuelle
- [ ] Mise à jour des dépendances
- [ ] Optimisation de la base de données
- [ ] Audit de sécurité complet
- [ ] Test de restauration des sauvegardes
- [ ] Révision des performances

### Trimestrielle
- [ ] Mise à jour majeure de l'application
- [ ] Révision de la sécurité
- [ ] Optimisation des serveurs
- [ ] Formation de l'équipe
- [ ] Planification de la capacité

## 📞 Support et Assistance

### Logs Importants

```bash
# Logs de l'application
tail -f /home/scienceslabs/logs/app.log

# Logs PM2
pm2 logs

# Logs Nginx
sudo tail -f /var/log/nginx/scienceslabs_error.log

# Logs PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Logs système
sudo tail -f /var/log/syslog
```

### Commandes de Diagnostic

```bash
# État général du système
htop

# Utilisation réseau
iftop

# Connexions base de données
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"

# Processus par utilisation CPU
ps aux --sort=-%cpu | head -10

# Processus par utilisation mémoire
ps aux --sort=-%mem | head -10
```

## ✅ Validation de la Maintenance

La maintenance est réussie si :

- [ ] Tous les services sont en ligne
- [ ] Les sauvegardes sont à jour
- [ ] Aucune alerte critique
- [ ] Performances dans les normes
- [ ] Certificats SSL valides
- [ ] Logs sans erreurs critiques

---

**Support 24/7 :** Pour toute urgence, contactez l'équipe technique via les contacts d'urgence.