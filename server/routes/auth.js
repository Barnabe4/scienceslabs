const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const db = require('../config/database');
const { sendEmail } = require('../services/emailService');
const router = express.Router();

// Rate limiting pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par IP
  message: {
    error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Inscription
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('phone').optional().isMobilePhone('any').withMessage('Numéro de téléphone invalide')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Données invalides', 
        details: errors.array() 
      });
    }

    const { name, email, password, phone, company } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Un compte avec cet email existe déjà' 
      });
    }

    // Hasher le mot de passe
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Générer un token de vérification email
    const emailVerificationToken = jwt.sign(
      { email, type: 'email_verification' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Créer l'utilisateur
    const userResult = await db.query(`
      INSERT INTO users (name, email, password_hash, phone, email_verification_token)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, status, created_at
    `, [name, email, passwordHash, phone, emailVerificationToken]);

    const user = userResult.rows[0];

    // Créer le profil client
    await db.query(`
      INSERT INTO customers (user_id, company_name)
      VALUES ($1, $2)
    `, [user.id, company]);

    // Envoyer l'email de vérification
    await sendEmail({
      to: email,
      subject: 'Vérifiez votre compte SciencesLabs',
      template: 'email-verification',
      data: {
        name,
        verificationUrl: `${process.env.APP_URL}/verify-email?token=${emailVerificationToken}`
      }
    });

    res.status(201).json({
      message: 'Compte créé avec succès. Vérifiez votre email pour activer votre compte.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la création du compte' 
    });
  }
});

// Connexion
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Données invalides', 
        details: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Récupérer l'utilisateur
    const userResult = await db.query(`
      SELECT id, name, email, password_hash, role, status, email_verified
      FROM users 
      WHERE email = $1
    `, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    const user = userResult.rows[0];

    // Vérifier le statut du compte
    if (user.status !== 'active') {
      return res.status(403).json({ 
        error: 'Compte désactivé. Contactez l\'administrateur.' 
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Mettre à jour la dernière connexion
    await db.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.email_verified
      }
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la connexion' 
    });
  }
});

// Vérification email
router.post('/verify-email', [
  body('token').notEmpty().withMessage('Token requis')
], async (req, res) => {
  try {
    const { token } = req.body;

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'email_verification') {
      return res.status(400).json({ error: 'Token invalide' });
    }

    // Mettre à jour l'utilisateur
    const result = await db.query(`
      UPDATE users 
      SET email_verified = TRUE, email_verification_token = NULL
      WHERE email = $1 AND email_verification_token = $2
      RETURNING id, name, email
    `, [decoded.email, token]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }

    res.json({
      message: 'Email vérifié avec succès',
      user: result.rows[0]
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token expiré' });
    }
    console.error('Erreur vérification email:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification' });
  }
});

// Mot de passe oublié
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide')
], async (req, res) => {
  try {
    const { email } = req.body;

    const userResult = await db.query(
      'SELECT id, name FROM users WHERE email = $1',
      [email]
    );

    // Toujours retourner succès pour éviter l'énumération d'emails
    if (userResult.rows.length === 0) {
      return res.json({
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
      });
    }

    const user = userResult.rows[0];

    // Générer un token de réinitialisation
    const resetToken = jwt.sign(
      { userId: user.id, type: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Sauvegarder le token en base
    await db.query(`
      UPDATE users 
      SET password_reset_token = $1, password_reset_expires = NOW() + INTERVAL '1 hour'
      WHERE id = $2
    `, [resetToken, user.id]);

    // Envoyer l'email de réinitialisation
    await sendEmail({
      to: email,
      subject: 'Réinitialisation de votre mot de passe SciencesLabs',
      template: 'password-reset',
      data: {
        name: user.name,
        resetUrl: `${process.env.APP_URL}/reset-password?token=${resetToken}`
      }
    });

    res.json({
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
    });

  } catch (error) {
    console.error('Erreur mot de passe oublié:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du lien de réinitialisation' 
    });
  }
});

// Réinitialiser le mot de passe
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token requis'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], async (req, res) => {
  try {
    const { token, password } = req.body;

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'password_reset') {
      return res.status(400).json({ error: 'Token invalide' });
    }

    // Vérifier que le token existe en base et n'est pas expiré
    const userResult = await db.query(`
      SELECT id FROM users 
      WHERE id = $1 
      AND password_reset_token = $2 
      AND password_reset_expires > NOW()
    `, [decoded.userId, token]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }

    // Hasher le nouveau mot de passe
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Mettre à jour le mot de passe
    await db.query(`
      UPDATE users 
      SET password_hash = $1, 
          password_reset_token = NULL, 
          password_reset_expires = NULL
      WHERE id = $2
    `, [passwordHash, decoded.userId]);

    res.json({
      message: 'Mot de passe réinitialisé avec succès'
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token expiré' });
    }
    console.error('Erreur réinitialisation mot de passe:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la réinitialisation' 
    });
  }
});

// Profil utilisateur
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userResult = await db.query(`
      SELECT u.id, u.name, u.email, u.role, u.status, u.phone, u.avatar_url,
             u.email_verified, u.last_login, u.created_at,
             c.company_name, c.billing_address, c.shipping_address
      FROM users u
      LEFT JOIN customers c ON u.id = c.user_id
      WHERE u.id = $1
    `, [req.user.userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const user = userResult.rows[0];
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        avatarUrl: user.avatar_url,
        emailVerified: user.email_verified,
        lastLogin: user.last_login,
        createdAt: user.created_at,
        companyName: user.company_name,
        billingAddress: user.billing_address,
        shippingAddress: user.shipping_address
      }
    });

  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération du profil' 
    });
  }
});

// Mettre à jour le profil
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('phone').optional().isMobilePhone('any'),
  body('companyName').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Données invalides', 
        details: errors.array() 
      });
    }

    const { name, phone, companyName, billingAddress, shippingAddress } = req.body;

    // Mettre à jour l'utilisateur
    await db.query(`
      UPDATE users 
      SET name = COALESCE($1, name), 
          phone = COALESCE($2, phone),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `, [name, phone, req.user.userId]);

    // Mettre à jour le profil client
    await db.query(`
      UPDATE customers 
      SET company_name = COALESCE($1, company_name),
          billing_address = COALESCE($2, billing_address),
          shipping_address = COALESCE($3, shipping_address),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $4
    `, [companyName, JSON.stringify(billingAddress), JSON.stringify(shippingAddress), req.user.userId]);

    res.json({
      message: 'Profil mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour du profil' 
    });
  }
});

// Changer le mot de passe
router.put('/change-password', authenticateToken, [
  body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
  body('newPassword').isLength({ min: 6 }).withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
], async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Récupérer le mot de passe actuel
    const userResult = await db.query(
      'SELECT password_hash FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe actuel
    const isValidPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Mot de passe actuel incorrect' });
    }

    // Hasher le nouveau mot de passe
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe
    await db.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newPasswordHash, req.user.userId]
    );

    res.json({
      message: 'Mot de passe modifié avec succès'
    });

  } catch (error) {
    console.error('Erreur changement mot de passe:', error);
    res.status(500).json({ 
      error: 'Erreur lors du changement de mot de passe' 
    });
  }
});

// Déconnexion (côté client principalement)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    message: 'Déconnexion réussie'
  });
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;