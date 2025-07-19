const express = require('express');
const router = express.Router();

// GET /api/orders - Récupérer toutes les commandes
router.get('/', async (req, res) => {
  try {
    const orders = [
      {
        id: 'CMD-2024-001',
        customerName: 'Lycée Technique Bamako',
        total: 85000,
        status: 'processing',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des commandes'
    });
  }
});

// POST /api/orders - Créer une nouvelle commande
router.post('/', async (req, res) => {
  try {
    const { items, customer, total } = req.body;
    
    const newOrder = {
      id: `CMD-${Date.now()}`,
      items,
      customer,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Commande créée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la commande'
    });
  }
});

module.exports = router;