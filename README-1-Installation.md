# README-1-Installation.md - SciencesLabs E-commerce

## 🚀 Installation de l'Application SciencesLabs

### Prérequis Système

Avant de commencer l'installation, assurez-vous d'avoir :

- **Node.js** version 18.0.0 ou supérieure
- **npm** version 8.0.0 ou supérieure (ou **yarn** 1.22.0+)
- **Git** pour le contrôle de version
- **PostgreSQL** 14+ ou **MySQL** 8.0+ pour la base de données
- **Redis** pour le cache et les sessions (optionnel mais recommandé)

### Vérification des Prérequis

```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier Git
git --version

# Vérifier PostgreSQL (si installé)
psql --version

# Vérifier Redis (si installé)
redis-cli --version
```

## 📦 Installation du Projet

### 1. Cloner le Repository

```bash
# Cloner le projet
git clone https://github.com/votre-organisation/scienceslabs-ecommerce.git

# Aller dans le dossier
cd scienceslabs-ecommerce

# Vérifier la structure
ls -la
```

### 2. Installation des Dépendances

```bash
# Installer les dépendances principales
npm install

# Ou avec yarn
yarn install

# Vérifier l'installation
npm list --depth=0
```

### 3. Installation des Dépendances de Production

```bash
# Dépendances backend supplémentaires
npm install express cors helmet bcryptjs jsonwebtoken
npm install pg mysql2 redis ioredis
npm install nodemailer multer sharp
npm install stripe paypal-rest-sdk
npm install socket.io express-rate-limit
npm install compression morgan winston

# Dépendances de développement
npm install --save-dev @types/node @types/express
npm install --save-dev nodemon concurrently
npm install --save-dev jest supertest @types/jest
npm install --save-dev eslint prettier husky lint-staged
```

### 4. Structure des Dossiers

Créer la structure complète du projet :

```bash
# Créer les dossiers backend
mkdir -p server/{controllers,middleware,models,routes,services,utils,config}
mkdir -p server/uploads/{products,avatars,documents}
mkdir -p logs
mkdir -p backups

# Créer les dossiers de configuration
mkdir -p config/{database,email,payment}
mkdir -p scripts/{deployment,backup,migration}

# Vérifier la structure
tree -I node_modules
```

### 5. Configuration des Variables d'Environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env
nano .env
```

Contenu du fichier `.env` :

```env
# Application
NODE_ENV=development
PORT=3001
APP_NAME=SciencesLabs
APP_URL=http://localhost:3000

# Base de données
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=scienceslabs_db
DB_USER=scienceslabs_user
DB_PASSWORD=votre_mot_de_passe_securise

# Redis (Cache)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=votre_jwt_secret_tres_long_et_securise
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASSWORD=votre_mot_de_passe_app

# Paiement
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=votre_paypal_client_id
PAYPAL_CLIENT_SECRET=votre_paypal_secret

# Stockage
UPLOAD_PATH=./server/uploads
MAX_FILE_SIZE=5242880

# Sécurité
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Logs
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### 6. Installation des Outils de Développement

```bash
# Installer les outils globaux
npm install -g pm2 nodemon typescript

# Configurer les hooks Git
npx husky install
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-push "npm run test"
```

### 7. Configuration des Scripts Package.json

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "client:dev": "vite",
    "server:dev": "nodemon server/index.js",
    "build": "npm run client:build && npm run server:build",
    "client:build": "tsc && vite build",
    "server:build": "tsc server/index.ts --outDir dist",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src server --ext .ts,.tsx,.js",
    "lint:fix": "eslint src server --ext .ts,.tsx,.js --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\" \"server/**/*.{ts,js}\"",
    "db:migrate": "node scripts/migrate.js",
    "db:seed": "node scripts/seed.js",
    "backup": "node scripts/backup.js",
    "deploy": "npm run build && pm2 restart ecosystem.config.js"
  }
}
```

### 8. Vérification de l'Installation

```bash
# Tester la compilation
npm run build

# Tester les linters
npm run lint

# Tester les dépendances
npm audit

# Vérifier la configuration
npm run test:config
```

### 9. Premier Démarrage

```bash
# Démarrer en mode développement
npm run dev

# Vérifier que l'application fonctionne
curl http://localhost:3000
curl http://localhost:3001/api/health
```

## 🔧 Dépannage Installation

### Problèmes Courants

**Erreur de permissions Node.js :**
```bash
# Changer le propriétaire des dossiers npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**Erreur de compilation TypeScript :**
```bash
# Réinstaller TypeScript
npm uninstall typescript
npm install typescript@latest
```

**Erreur de dépendances :**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Logs de Débogage

```bash
# Activer les logs détaillés
DEBUG=* npm run dev

# Vérifier les logs d'installation
npm install --verbose
```

## ✅ Validation de l'Installation

L'installation est réussie si :

- [ ] L'application frontend démarre sur http://localhost:3000
- [ ] L'API backend répond sur http://localhost:3001
- [ ] La base de données est connectée
- [ ] Les tests passent avec `npm test`
- [ ] Le build de production fonctionne avec `npm run build`

## 📋 Prochaines Étapes

1. **Configuration de la base de données** → Voir `README-2-Configuration-BaseDeDonnées.md`
2. **Configuration des services externes** → Voir `README-3-Deploiement.md`
3. **Gestion des modules** → Voir `README-4-Gestion-Modules.md`

---

**Support :** Pour toute question, consultez la documentation ou contactez l'équipe technique.