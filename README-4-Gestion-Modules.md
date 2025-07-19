# README-4-Gestion-Modules.md - SciencesLabs E-commerce

## 🧩 Gestion des Modules et Fonctionnalités

### Architecture Modulaire

SciencesLabs est conçu avec une architecture modulaire permettant d'activer/désactiver des fonctionnalités selon les besoins.

## 📦 Modules Principaux

### 1. Module E-commerce Core
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Catalogue produits avec filtres avancés
- Panier d'achat persistant
- Système de commandes
- Gestion des stocks
- Facturation automatique

**Configuration :**
```env
ECOMMERCE_ENABLED=true
INVENTORY_TRACKING=true
AUTO_INVOICING=true
```

### 2. Module Gestion Clients (CRM)
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Base de données clients
- Historique des commandes
- Segmentation clientèle
- Profils détaillés
- Conditions spéciales

**Configuration :**
```env
CRM_ENABLED=true
CUSTOMER_SEGMENTATION=true
SPECIAL_PRICING=true
```

### 3. Module Devis et Facturation
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Génération de devis PDF
- Suivi des devis
- Conversion devis → commande
- Facturation automatique
- Relances de paiement

**Configuration :**
```env
QUOTES_ENABLED=true
PDF_GENERATION=true
AUTO_FOLLOW_UP=true
```

### 4. Module Marketing IA
**Statut :** 🔧 Configurable

**Fonctionnalités :**
- Campagnes automatisées
- Scoring des leads
- Retargeting intelligent
- Analytics prédictifs
- Intégrations publicitaires

**Configuration :**
```env
AI_MARKETING_ENABLED=true
FACEBOOK_ADS_INTEGRATION=true
GOOGLE_ADS_INTEGRATION=true
LEAD_SCORING=true
```

**Activation :**
```bash
# Installer les dépendances IA
npm install tensorflow @tensorflow/tfjs-node
npm install facebook-nodejs-business-sdk google-ads-api

# Configurer les clés API
FACEBOOK_APP_ID=votre_app_id
FACEBOOK_APP_SECRET=votre_app_secret
GOOGLE_ADS_CUSTOMER_ID=votre_customer_id
```

### 5. Module Support Client IA
**Statut :** 🔧 Configurable

**Fonctionnalités :**
- Chatbot IA multilingue
- Tickets de support
- Base de connaissances
- Satisfaction client
- Escalade automatique

**Configuration :**
```env
SUPPORT_ENABLED=true
CHATBOT_ENABLED=true
MULTILINGUAL_SUPPORT=true
AUTO_ESCALATION=true
```

### 6. Module Paiements
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Stripe (cartes bancaires)
- PayPal
- Mobile Money Togo (T-Money, Flooz)
- Paiement à la livraison
- Paiements récurrents

**Configuration :**
```env
PAYMENTS_ENABLED=true
STRIPE_ENABLED=true
PAYPAL_ENABLED=true
MOBILE_MONEY_ENABLED=true
COD_ENABLED=true
```

### 7. Module Logistique
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Gestion des expéditions
- Suivi des livraisons
- Calcul automatique des frais
- Intégration transporteurs
- Notifications clients

**Configuration :**
```env
LOGISTICS_ENABLED=true
SHIPPING_CALCULATOR=true
DELIVERY_TRACKING=true
SMS_NOTIFICATIONS=true
```

### 8. Module Analytics et Rapports
**Statut :** ✅ Activé par défaut

**Fonctionnalités :**
- Tableaux de bord interactifs
- Rapports financiers
- Analytics e-commerce
- Prédictions IA
- Export de données

**Configuration :**
```env
ANALYTICS_ENABLED=true
FINANCIAL_REPORTS=true
PREDICTIVE_ANALYTICS=true
DATA_EXPORT=true
```

## 🔧 Modules Complémentaires

### 1. Newsletter et Email Marketing
**Statut :** 🆕 Nouveau module

**Installation :**
```bash
# Installer les dépendances
npm install nodemailer mailchimp-api-v3 sendgrid

# Créer les tables
psql -U scienceslabs_user -d scienceslabs_db -c "
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    tags TEXT[],
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    sent_at TIMESTAMP,
    recipients_count INTEGER DEFAULT 0,
    opens_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"
```

**Configuration :**
```env
NEWSLETTER_ENABLED=true
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=votre_cle_sendgrid
MAILCHIMP_API_KEY=votre_cle_mailchimp
```

### 2. Relance Panier Abandonné
**Statut :** 🆕 Nouveau module

**Installation :**
```bash
# Créer la table des paniers abandonnés
psql -U scienceslabs_user -d scienceslabs_db -c "
CREATE TABLE abandoned_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    cart_data JSONB NOT NULL,
    total_amount DECIMAL(10,2),
    abandoned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recovered_at TIMESTAMP,
    recovery_email_sent BOOLEAN DEFAULT FALSE,
    recovery_email_count INTEGER DEFAULT 0
);
"
```

**Configuration :**
```env
ABANDONED_CART_ENABLED=true
RECOVERY_EMAIL_DELAY=24
MAX_RECOVERY_EMAILS=3
RECOVERY_DISCOUNT_PERCENT=10
```

**Script de relance automatique :**
```javascript
// scripts/abandoned-cart-recovery.js
const cron = require('node-cron');

// Exécuter toutes les heures
cron.schedule('0 * * * *', async () => {
  console.log('Vérification des paniers abandonnés...');
  
  // Récupérer les paniers abandonnés depuis plus de 24h
  const abandonedCarts = await db.query(`
    SELECT * FROM abandoned_carts 
    WHERE abandoned_at < NOW() - INTERVAL '24 hours'
    AND recovery_email_sent = FALSE
    AND customer_email IS NOT NULL
  `);

  for (const cart of abandonedCarts.rows) {
    await sendRecoveryEmail(cart);
    await markRecoveryEmailSent(cart.id);
  }
});
```

### 3. Statistiques Avancées des Ventes
**Statut :** 🆕 Nouveau module

**Installation :**
```bash
# Créer les vues pour les statistiques
psql -U scienceslabs_user -d scienceslabs_db -c "
-- Vue des ventes par période
CREATE VIEW sales_by_period AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as orders_count,
    SUM(total_amount) as total_sales,
    AVG(total_amount) as avg_order_value
FROM orders 
WHERE status = 'completed'
GROUP BY DATE_TRUNC('day', created_at);

-- Vue des produits les plus vendus
CREATE VIEW top_selling_products AS
SELECT 
    p.name,
    p.sku,
    SUM(oi.quantity) as total_sold,
    SUM(oi.total) as total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name, p.sku
ORDER BY total_sold DESC;

-- Vue des clients les plus actifs
CREATE VIEW top_customers AS
SELECT 
    c.id,
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value
FROM customers c
JOIN users u ON c.user_id = u.id
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
GROUP BY c.id, u.name, u.email
ORDER BY total_spent DESC;
"
```

### 4. Module Fidélité et Récompenses
**Statut :** 🆕 Nouveau module

**Installation :**
```bash
# Créer les tables du programme de fidélité
psql -U scienceslabs_user -d scienceslabs_db -c "
CREATE TABLE loyalty_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points_per_fcfa DECIMAL(5,2) DEFAULT 1.00,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer_loyalty_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    points_balance INTEGER DEFAULT 0,
    total_earned INTEGER DEFAULT 0,
    total_redeemed INTEGER DEFAULT 0,
    tier_level VARCHAR(50) DEFAULT 'bronze',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    order_id UUID REFERENCES orders(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'earned', 'redeemed'
    points INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"
```

### 5. Module Multi-langues
**Statut :** 🆕 Nouveau module

**Installation :**
```bash
# Installer les dépendances i18n
npm install react-i18next i18next i18next-browser-languagedetector

# Créer la structure des traductions
mkdir -p public/locales/{fr,en}
```

**Configuration :**
```env
MULTILINGUAL_ENABLED=true
DEFAULT_LANGUAGE=fr
SUPPORTED_LANGUAGES=fr,en
AUTO_DETECT_LANGUAGE=true
```

## ⚙️ Configuration des Modules

### 1. Fichier de Configuration Principal

Créer `config/modules.js` :

```javascript
module.exports = {
  // Modules core (toujours activés)
  core: {
    ecommerce: true,
    crm: true,
    quotes: true,
    payments: true,
    logistics: true,
    analytics: true
  },

  // Modules optionnels
  optional: {
    aiMarketing: process.env.AI_MARKETING_ENABLED === 'true',
    supportAI: process.env.SUPPORT_ENABLED === 'true',
    newsletter: process.env.NEWSLETTER_ENABLED === 'true',
    abandonedCart: process.env.ABANDONED_CART_ENABLED === 'true',
    loyalty: process.env.LOYALTY_ENABLED === 'true',
    multilingual: process.env.MULTILINGUAL_ENABLED === 'true'
  },

  // Intégrations externes
  integrations: {
    stripe: process.env.STRIPE_ENABLED === 'true',
    paypal: process.env.PAYPAL_ENABLED === 'true',
    mobileMoney: process.env.MOBILE_MONEY_ENABLED === 'true',
    facebookAds: process.env.FACEBOOK_ADS_INTEGRATION === 'true',
    googleAds: process.env.GOOGLE_ADS_INTEGRATION === 'true',
    sendgrid: process.env.EMAIL_PROVIDER === 'sendgrid',
    mailchimp: process.env.EMAIL_PROVIDER === 'mailchimp'
  }
};
```

### 2. Middleware de Vérification des Modules

Créer `server/middleware/moduleCheck.js` :

```javascript
const modules = require('../../config/modules');

const checkModule = (moduleName) => {
  return (req, res, next) => {
    const isEnabled = modules.optional[moduleName] || modules.core[moduleName];
    
    if (!isEnabled) {
      return res.status(403).json({
        error: 'Module non activé',
        module: moduleName,
        message: `Le module ${moduleName} n'est pas activé sur cette instance.`
      });
    }
    
    next();
  };
};

module.exports = { checkModule };
```

## 🔄 Activation/Désactivation des Modules

### 1. Script de Gestion des Modules

Créer `scripts/manage-modules.js` :

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const commands = {
  enable: (moduleName) => {
    console.log(`Activation du module: ${moduleName}`);
    updateEnvFile(`${moduleName.toUpperCase()}_ENABLED`, 'true');
    restartApplication();
  },

  disable: (moduleName) => {
    console.log(`Désactivation du module: ${moduleName}`);
    updateEnvFile(`${moduleName.toUpperCase()}_ENABLED`, 'false');
    restartApplication();
  },

  status: () => {
    const modules = require('../config/modules');
    console.log('État des modules:');
    console.log('Core:', modules.core);
    console.log('Optionnels:', modules.optional);
    console.log('Intégrations:', modules.integrations);
  }
};

function updateEnvFile(key, value) {
  const envPath = path.join(__dirname, '../.env');
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    envContent += `\n${key}=${value}`;
  }
  
  fs.writeFileSync(envPath, envContent);
}

function restartApplication() {
  const { exec } = require('child_process');
  exec('pm2 restart ecosystem.config.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Erreur lors du redémarrage:', error);
    } else {
      console.log('Application redémarrée avec succès');
    }
  });
}

// Exécution des commandes
const [,, command, moduleName] = process.argv;

if (commands[command]) {
  commands[command](moduleName);
} else {
  console.log('Commandes disponibles:');
  console.log('  enable <module>   - Activer un module');
  console.log('  disable <module>  - Désactiver un module');
  console.log('  status           - Voir l\'état des modules');
}
```

### 2. Utilisation du Script

```bash
# Rendre le script exécutable
chmod +x scripts/manage-modules.js

# Voir l'état des modules
node scripts/manage-modules.js status

# Activer un module
node scripts/manage-modules.js enable newsletter

# Désactiver un module
node scripts/manage-modules.js disable aiMarketing
```

## 📊 Modules Spécifiques au Togo

### 1. Module Paiement Mobile Money

**Configuration T-Money :**
```env
TMONEY_ENABLED=true
TMONEY_API_URL=https://api.tmoney.tg
TMONEY_MERCHANT_ID=votre_merchant_id
TMONEY_API_KEY=votre_api_key
TMONEY_SECRET_KEY=votre_secret_key
```

**Configuration Flooz :**
```env
FLOOZ_ENABLED=true
FLOOZ_API_URL=https://api.flooz.moov.africa
FLOOZ_MERCHANT_ID=votre_merchant_id
FLOOZ_API_KEY=votre_api_key
```

### 2. Module Livraison Locale

**Configuration :**
```env
LOCAL_DELIVERY_ENABLED=true
DELIVERY_ZONES=lome,kara,sokode,kpalime
DELIVERY_BASE_COST=2000
DELIVERY_PER_KM=500
FREE_DELIVERY_THRESHOLD=50000
```

### 3. Module Taxes Togo

**Configuration :**
```env
TOGO_TAX_ENABLED=true
TVA_RATE=18
TAX_REGISTRATION_NUMBER=votre_numero_contribuable
```

## 🔍 Tests des Modules

### 1. Tests Unitaires par Module

Créer `tests/modules/` :

```bash
mkdir -p tests/modules
```

### 2. Script de Test Global

Créer `scripts/test-modules.js` :

```javascript
const modules = require('../config/modules');

async function testModules() {
  console.log('🧪 Test des modules activés...');

  for (const [moduleName, isEnabled] of Object.entries(modules.optional)) {
    if (isEnabled) {
      console.log(`Testing ${moduleName}...`);
      try {
        await testModule(moduleName);
        console.log(`✅ ${moduleName} fonctionne correctement`);
      } catch (error) {
        console.log(`❌ ${moduleName} a échoué:`, error.message);
      }
    }
  }
}

async function testModule(moduleName) {
  switch (moduleName) {
    case 'newsletter':
      // Test d'envoi d'email
      break;
    case 'abandonedCart':
      // Test de détection de panier abandonné
      break;
    case 'aiMarketing':
      // Test des APIs IA
      break;
    default:
      throw new Error(`Test non implémenté pour ${moduleName}`);
  }
}

testModules();
```

## 📋 Checklist d'Activation des Modules

### Avant la Production

- [ ] **Core modules** : Tous testés et fonctionnels
- [ ] **Paiements** : Stripe et Mobile Money configurés
- [ ] **Email** : SMTP configuré et testé
- [ ] **SSL** : Certificats installés et valides
- [ ] **Base de données** : Migrations exécutées
- [ ] **Monitoring** : Logs et alertes configurés

### Modules Optionnels

- [ ] **Newsletter** : Intégration email testée
- [ ] **Panier abandonné** : Emails de relance fonctionnels
- [ ] **IA Marketing** : APIs externes connectées
- [ ] **Support IA** : Chatbot entraîné et testé
- [ ] **Fidélité** : Système de points opérationnel
- [ ] **Multi-langues** : Traductions complètes

## 🔄 Prochaines Étapes

1. **Démarrage et maintenance** → Voir `README-5-Demarrage-et-Maintenance.md`

---

**Note :** Chaque module peut être activé/désactivé indépendamment selon vos besoins et votre budget.