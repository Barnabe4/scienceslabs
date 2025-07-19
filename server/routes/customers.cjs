const express = require('express');
const router = express.Router();

// GET /api/customers - Récupérer tous les clients
router.get('/', async (req, res) => {
  try {
    const customers = [
      {
        id: 1,
        name: 'Lycée Technique de Bamako',
        email: 'contact@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        totalOrders: 15,
        totalSpent: 2450000
      }
    ];

    res.json({
      success: true,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des clients'
    });
  }
});

module.exports = router;