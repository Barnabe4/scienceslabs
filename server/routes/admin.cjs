const express = require('express');
const router = express.Router();

// GET /api/admin/users - Récupérer les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = [
      {
        id: 1,
        name: 'Administrateur',
        email: 'admin@scienceslabs.com',
        role: 'admin',
        status: 'active'
      }
    ];

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des utilisateurs'
    });
  }
});

// GET /api/admin/stats - Statistiques administrateur
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      totalUsers: 5,
      totalProducts: 128,
      totalOrders: 92,
      totalRevenue: 8330000,
      systemHealth: 'good'
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

module.exports = router;