const express = require('express');
const router = express.Router();

// GET /api/products - Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    
    // Simulation de données produits
    const products = [
      {
        id: 1,
        name: 'Bécher en Verre Borosilicate 50ml',
        category: 'chemistry',
        price: 8500,
        stock: 25,
        image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Bécher gradué en verre borosilicate résistant'
      },
      {
        id: 2,
        name: 'Microscope Binoculaire',
        category: 'biology',
        price: 280000,
        stock: 8,
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Microscope professionnel pour observations biologiques'
      }
    ];

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: products.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des produits'
    });
  }
});

// GET /api/products/:id - Récupérer un produit
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulation de récupération d'un produit
    const product = {
      id: parseInt(id),
      name: 'Bécher en Verre Borosilicate 50ml',
      category: 'chemistry',
      price: 8500,
      stock: 25,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant'
    };

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du produit'
    });
  }
});

module.exports = router;