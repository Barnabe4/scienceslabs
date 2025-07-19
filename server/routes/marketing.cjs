const express = require('express');
const router = express.Router();

// GET /api/marketing/campaigns - Récupérer les campagnes
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = [
      {
        id: '1',
        name: 'Promotion Rentrée 2024',
        type: 'email',
        status: 'active',
        budget: 500000,
        spent: 125000
      }
    ];

    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des campagnes'
    });
  }
});

// POST /api/marketing/newsletter - Inscription newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    const subscription = {
      id: Date.now(),
      email,
      name,
      subscribedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Inscription à la newsletter réussie'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'inscription'
    });
  }
});

module.exports = router;