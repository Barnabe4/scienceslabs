const express = require('express');
const router = express.Router();

// GET /api/support/tickets - Récupérer les tickets de support
router.get('/tickets', async (req, res) => {
  try {
    const tickets = [
      {
        id: 'TKT-001',
        subject: 'Problème avec la livraison',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: tickets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des tickets'
    });
  }
});

// POST /api/support/contact - Formulaire de contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Simulation d'envoi de message de contact
    const ticket = {
      id: `TKT-${Date.now()}`,
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: ticket,
      message: 'Message envoyé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi du message'
    });
  }
});

module.exports = router;