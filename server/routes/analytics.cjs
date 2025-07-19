const express = require('express');
const router = express.Router();

// GET /api/analytics/dashboard - Données du tableau de bord
router.get('/dashboard', async (req, res) => {
  try {
    const analytics = {
      totalRevenue: 8330000,
      totalOrders: 92,
      newCustomers: 45,
      conversionRate: 3.2,
      topProducts: [
        { name: 'Bécher 50ml', sales: 156 },
        { name: 'Microscope', sales: 23 }
      ]
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des analytics'
    });
  }
});

// GET /api/analytics/sales - Données de ventes
router.get('/sales', async (req, res) => {
  try {
    const salesData = {
      daily: [
        { date: '2024-01-20', sales: 125000 },
        { date: '2024-01-21', sales: 98000 }
      ],
      monthly: [
        { month: 'Janvier', sales: 2850000 },
        { month: 'Décembre', sales: 2340000 }
      ]
    };

    res.json({
      success: true,
      data: salesData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des données de ventes'
    });
  }
});

module.exports = router;