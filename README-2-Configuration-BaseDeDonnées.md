# README-2-Configuration-BaseDeDonnées.md - SciencesLabs E-commerce

## 🗄️ Configuration de la Base de Données

### Choix de la Base de Données

SciencesLabs supporte plusieurs systèmes de base de données :
- **PostgreSQL** (recommandé pour la production)
- **MySQL** (alternative robuste)
- **SQLite** (développement uniquement)

## 📊 Installation PostgreSQL (Recommandé)

### 1. Installation sur Ubuntu/Debian

```bash
# Mettre à jour les paquets
sudo apt update

# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Vérifier l'installation
sudo systemctl status postgresql
```

### 2. Installation sur CentOS/RHEL

```bash
# Installer PostgreSQL
sudo yum install postgresql-server postgresql-contrib

# Initialiser la base
sudo postgresql-setup initdb

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Installation sur macOS

```bash
# Avec Homebrew
brew install postgresql

# Démarrer PostgreSQL
brew services start postgresql
```

## 🔧 Configuration PostgreSQL

### 1. Création de l'Utilisateur et Base de Données

```bash
# Se connecter en tant que postgres
sudo -u postgres psql

# Dans psql, exécuter :
```

```sql
-- Créer l'utilisateur
CREATE USER scienceslabs_user WITH PASSWORD 'votre_mot_de_passe_securise';

-- Créer la base de données
CREATE DATABASE scienceslabs_db OWNER scienceslabs_user;

-- Accorder tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE scienceslabs_db TO scienceslabs_user;

-- Accorder les privilèges sur le schéma
GRANT ALL ON SCHEMA public TO scienceslabs_user;

-- Quitter psql
\q
```

### 2. Configuration de l'Accès

Éditer le fichier `postgresql.conf` :

```bash
# Trouver le fichier de configuration
sudo find /etc -name "postgresql.conf" 2>/dev/null

# Éditer le fichier
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Modifier ces lignes :

```conf
# Écouter sur toutes les interfaces
listen_addresses = '*'

# Port par défaut
port = 5432

# Nombre maximum de connexions
max_connections = 100

# Mémoire partagée
shared_buffers = 256MB

# Logs
log_statement = 'all'
log_directory = 'pg_log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
```

Éditer le fichier `pg_hba.conf` :

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Ajouter cette ligne :

```conf
# Autoriser les connexions locales avec mot de passe
host    scienceslabs_db    scienceslabs_user    127.0.0.1/32    md5
host    scienceslabs_db    scienceslabs_user    ::1/128         md5
```

Redémarrer PostgreSQL :

```bash
sudo systemctl restart postgresql
```

### 3. Test de Connexion

```bash
# Tester la connexion
psql -h localhost -U scienceslabs_user -d scienceslabs_db

# Si succès, vous devriez voir :
# scienceslabs_db=>
```

## 🏗️ Création du Schéma de Base de Données

### 1. Structure des Tables Principales

Créer le fichier `database/schema.sql` :

```sql
-- Extensions PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table des utilisateurs
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'customer',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des catégories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des produits
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    track_inventory BOOLEAN DEFAULT TRUE,
    inventory_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    weight DECIMAL(8,2),
    dimensions JSONB,
    category_id UUID REFERENCES categories(id),
    brand VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    images JSONB,
    specifications JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des clients
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    company_name VARCHAR(255),
    tax_number VARCHAR(100),
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT,
    tags TEXT[],
    total_spent DECIMAL(12,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    last_order_date TIMESTAMP,
    customer_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    fulfillment_status VARCHAR(50) NOT NULL DEFAULT 'unfulfilled',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'XOF',
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT,
    tags TEXT[],
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des articles de commande
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    product_snapshot JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    payment_method VARCHAR(100) NOT NULL,
    payment_provider VARCHAR(100),
    transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'XOF',
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    gateway_response JSONB,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des devis
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    valid_until DATE,
    notes TEXT,
    terms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des articles de devis
CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des tickets de support
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'open',
    priority VARCHAR(50) NOT NULL DEFAULT 'medium',
    category VARCHAR(100),
    assigned_to UUID REFERENCES users(id),
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages de support
CREATE TABLE support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_type VARCHAR(50) NOT NULL, -- 'customer', 'agent', 'system'
    sender_id UUID,
    message TEXT NOT NULL,
    attachments JSONB,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des campagnes marketing
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    budget DECIMAL(10,2),
    spent DECIMAL(10,2) DEFAULT 0,
    target_audience JSONB,
    content JSONB,
    metrics JSONB,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    company VARCHAR(255),
    source VARCHAR(100),
    campaign_id UUID REFERENCES marketing_campaigns(id),
    status VARCHAR(50) DEFAULT 'new',
    score INTEGER DEFAULT 0,
    tags TEXT[],
    notes TEXT,
    converted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sessions de chat
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status VARCHAR(50) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    agent_id UUID REFERENCES users(id),
    satisfaction_rating INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages de chat
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(50) NOT NULL, -- 'customer', 'agent', 'bot'
    sender_id UUID,
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les performances
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_chat_sessions_customer ON chat_sessions(customer_id);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marketing_campaigns_updated_at BEFORE UPDATE ON marketing_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Exécution du Schéma

```bash
# Exécuter le schéma
psql -h localhost -U scienceslabs_user -d scienceslabs_db -f database/schema.sql

# Vérifier les tables créées
psql -h localhost -U scienceslabs_user -d scienceslabs_db -c "\dt"
```

## 🌱 Données de Test (Seed)

### 1. Créer le fichier de données de test

Créer `database/seed.sql` :

```sql
-- Insérer des catégories
INSERT INTO categories (id, name, slug, description, icon) VALUES
(uuid_generate_v4(), 'Équipement de Chimie', 'equipement-chimie', 'Matériel de laboratoire pour expériences chimiques', '🧪'),
(uuid_generate_v4(), 'Réactifs', 'reactifs', 'Produits chimiques pour expériences', '⚗️'),
(uuid_generate_v4(), 'Équipement de Physique', 'equipement-physique', 'Matériel pour expériences de physique', '⚡'),
(uuid_generate_v4(), 'Équipement de SVT', 'equipement-svt', 'Matériel pour biologie et sciences naturelles', '🔬'),
(uuid_generate_v4(), 'Équipement de Sécurité', 'equipement-securite', 'Matériel de protection et sécurité', '🛡️');

-- Insérer des produits
INSERT INTO products (name, slug, description, sku, price, category_id, inventory_quantity, images) VALUES
('Bécher en Verre Borosilicate 50ml', 'becher-verre-50ml', 'Bécher gradué en verre borosilicate résistant', 'BCH-050-SL', 8500, 
 (SELECT id FROM categories WHERE slug = 'equipement-chimie' LIMIT 1), 25, 
 '["https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg"]'),
('Microscope Binoculaire 1000x', 'microscope-binoculaire-1000x', 'Microscope professionnel pour observations biologiques', 'MIC-BIN-1000', 280000,
 (SELECT id FROM categories WHERE slug = 'equipement-svt' LIMIT 1), 8,
 '["https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg"]');

-- Insérer un utilisateur admin
INSERT INTO users (name, email, password_hash, role, status, email_verified) VALUES
('Administrateur', 'admin@scienceslabs.tg', crypt('admin123', gen_salt('bf')), 'admin', 'active', TRUE);
```

### 2. Exécuter les données de test

```bash
# Exécuter le seed
psql -h localhost -U scienceslabs_user -d scienceslabs_db -f database/seed.sql
```

## 🔄 Migrations de Base de Données

### 1. Créer le système de migration

Créer `scripts/migrate.js` :

```javascript
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function runMigrations() {
  try {
    // Créer la table des migrations si elle n'existe pas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Lire les fichiers de migration
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      // Vérifier si la migration a déjà été exécutée
      const result = await pool.query(
        'SELECT id FROM migrations WHERE filename = $1',
        [file]
      );

      if (result.rows.length === 0) {
        console.log(`Exécution de la migration: ${file}`);
        
        // Lire et exécuter la migration
        const migrationSQL = fs.readFileSync(
          path.join(migrationsDir, file),
          'utf8'
        );
        
        await pool.query(migrationSQL);
        
        // Marquer comme exécutée
        await pool.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        );
        
        console.log(`Migration ${file} exécutée avec succès`);
      }
    }

    console.log('Toutes les migrations ont été exécutées');
  } catch (error) {
    console.error('Erreur lors des migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
```

### 2. Rendre le script exécutable

```bash
chmod +x scripts/migrate.js
```

## 🔍 Vérification de la Configuration

### 1. Test de Connexion

Créer `scripts/test-db.js` :

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Connexion à la base de données réussie');
    console.log('Heure du serveur:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
```

### 2. Exécuter le test

```bash
node scripts/test-db.js
```

## 📊 Monitoring de la Base de Données

### 1. Requêtes de Monitoring

```sql
-- Vérifier la taille de la base
SELECT pg_size_pretty(pg_database_size('scienceslabs_db'));

-- Lister les tables et leur taille
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Vérifier les connexions actives
SELECT count(*) FROM pg_stat_activity WHERE datname = 'scienceslabs_db';
```

### 2. Sauvegarde Automatique

Créer `scripts/backup.sh` :

```bash
#!/bin/bash

# Configuration
DB_NAME="scienceslabs_db"
DB_USER="scienceslabs_user"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

# Effectuer la sauvegarde
pg_dump -h localhost -U $DB_USER -d $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compresser la sauvegarde
gzip $BACKUP_DIR/backup_$DATE.sql

echo "Sauvegarde créée: $BACKUP_DIR/backup_$DATE.sql.gz"

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

## ✅ Validation de la Configuration

La configuration est réussie si :

- [ ] PostgreSQL est installé et fonctionne
- [ ] La base de données `scienceslabs_db` est créée
- [ ] L'utilisateur `scienceslabs_user` peut se connecter
- [ ] Toutes les tables sont créées sans erreur
- [ ] Les données de test sont insérées
- [ ] Le script de test de connexion fonctionne

## 🔄 Prochaines Étapes

1. **Configuration du déploiement** → Voir `README-3-Deploiement.md`
2. **Gestion des modules** → Voir `README-4-Gestion-Modules.md`

---

**Note :** Gardez vos mots de passe en sécurité et utilisez des mots de passe forts en production.