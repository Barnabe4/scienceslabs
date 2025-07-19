const express = require('express');
const router = express.Router();

// GET /api/categories - Récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = [
      {
        id: 'chemistry',
        name: 'Équipement de Chimie',
        description: 'Matériel de laboratoire pour expériences chimiques',
        icon: '🧪',
        productCount: 45
      },
      {
        id: 'biology',
        name: 'Équipement de SVT',
        description: 'Matériel pour biologie et sciences naturelles',
        icon: '🔬',
        productCount: 35
      },
      {
        id: 'physics',
        name: 'Équipement de Physique',
        description: 'Matériel pour expériences de physique',
        icon: '⚡',
        productCount: 28
      }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des catégories'
    });
  }
});

module.exports = router;