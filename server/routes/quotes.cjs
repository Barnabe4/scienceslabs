const express = require('express');
const router = express.Router();

// GET /api/quotes - Récupérer tous les devis
router.get('/', async (req, res) => {
  try {
    const quotes = [
      {
        id: 'DEV-2024-001',
        customerName: 'Dr. Amadou Traoré',
        total: 450000,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des devis'
    });
  }
});

// POST /api/quotes - Créer un nouveau devis
router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    
    const newQuote = {
      id: `DEV-${Date.now()}`,
      customer,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: newQuote,
      message: 'Devis créé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création du devis'
    });
  }
});

module.exports = router;