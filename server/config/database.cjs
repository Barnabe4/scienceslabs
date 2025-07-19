const { Pool } = require('pg');

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'scienceslabs_db',
  user: process.env.DB_USER || 'scienceslabs_user',
  password: process.env.DB_PASSWORD,
  max: 20, // Nombre maximum de connexions dans le pool
  idleTimeoutMillis: 30000, // Fermer les connexions inactives après 30s
  connectionTimeoutMillis: 2000, // Timeout de connexion
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Créer le pool de connexions
const pool = new Pool(dbConfig);

// Gestion des erreurs de connexion
pool.on('error', (err, client) => {
  console.error('Erreur inattendue sur le client de base de données:', err);
  process.exit(-1);
});

// Test de connexion au démarrage
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    process.exit(-1);
  } else {
    console.log('✅ Connexion à la base de données établie');
    release();
  }
});

// Fonction helper pour les requêtes
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Log des requêtes lentes en développement
    if (process.env.NODE_ENV === 'development' && duration > 1000) {
      console.log('Requête lente détectée:', { text, duration, rows: res.rowCount });
    }
    
    return res;
  } catch (error) {
    console.error('Erreur de requête SQL:', { text, params, error: error.message });
    throw error;
  }
};

// Fonction pour les transactions
const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Fonction de nettoyage
const cleanup = async () => {
  await pool.end();
  console.log('🔌 Connexions à la base de données fermées');
};

module.exports = {
  query,
  transaction,
  pool,
  cleanup
};