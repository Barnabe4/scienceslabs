const express = require('express');
const router = express.Router();

// POST /api/payments/process - Traiter un paiement
router.post('/process', async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;
    
    // Simulation de traitement de paiement
    const payment = {
      id: `PAY-${Date.now()}`,
      orderId,
      amount,
      method,
      status: 'success',
      transactionId: `TXN-${Date.now()}`,
      processedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: payment,
      message: 'Paiement traité avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors du traitement du paiement'
    });
  }
});

// GET /api/payments/test - Test de paiement
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Service de paiement opérationnel',
    methods: ['mobile_money', 'bank_transfer', 'cash', 'credit_card']
  });
});

module.exports = router;