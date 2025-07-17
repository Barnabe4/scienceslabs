import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuoteRequestModal from '../components/QuoteRequestModal';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Panier - Sciences Labs</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .logo { max-height: 60px; margin-bottom: 10px; }
            .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
            .subtitle { color: #666; margin-top: 5px; }
            .cart-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .cart-table th, .cart-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .cart-table th { background-color: #f8f9fa; font-weight: bold; }
            .total-section { margin-top: 30px; text-align: right; }
            .total-row { margin: 5px 0; }
            .total-final { font-size: 18px; font-weight: bold; color: #2563eb; border-top: 2px solid #2563eb; padding-top: 10px; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
            .print-date { margin-top: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo-SciensLabs.png" alt="Sciences Labs" class="logo">
            <div class="company-name">Sciences Labs</div>
            <div class="subtitle">Équipements Scientifiques Éducatifs</div>
            <div class="print-date">Imprimé le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</div>
          </div>
          
          <h2>Panier d'achat</h2>
          
          <table class="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix unitaire</th>
                <th>Quantité</th>
                <th>Sous-total</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.price.toLocaleString()} FCFA</td>
                  <td>${item.quantity}</td>
                  <td>${(item.price * item.quantity).toLocaleString()} FCFA</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-row">Sous-total: ${getTotalPrice().toLocaleString()} FCFA</div>
            <div class="total-row">Livraison: ${getTotalPrice() >= 100000 ? 'Gratuite' : '15,000 FCFA'}</div>
            <div class="total-row">TVA (18%): ${Math.round(getTotalPrice() * 0.18).toLocaleString()} FCFA</div>
            <div class="total-final">Total: ${(getTotalPrice() * 1.18 + (getTotalPrice() >= 100000 ? 0 : 15000)).toLocaleString()} FCFA</div>
          </div>
          
          <div class="footer">
            <p>Sciences Labs - Bamako, Mali</p>
            <p>Téléphone: +223 XX XX XX XX | Email: contact@scienceslabs.com</p>
            <p>WhatsApp: +223 XX XX XX XX</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez notre gamme d'équipements scientifiques
            </p>
            <Link
              to="/boutique"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panier</h1>
            <p className="text-gray-600 mt-1">
              {cart.length} article{cart.length > 1 ? 's' : ''} dans votre panier
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
            <Link
              to="/boutique"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continuer les achats
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-blue-600 font-bold text-lg">
                      {item.price.toLocaleString()} FCFA
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sous-total:</span>
                    <span className="font-bold text-lg">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Vider le panier
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{getTotalPrice().toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-semibold">
                    {getTotalPrice() >= 100000 ? 'Gratuite' : '15,000 FCFA'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA (18%)</span>
                  <span className="font-semibold">
                    {Math.round(getTotalPrice() * 0.18).toLocaleString()} FCFA
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      {(getTotalPrice() * 1.18 + (getTotalPrice() >= 100000 ? 0 : 15000)).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {getTotalPrice() < 100000 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-orange-800 text-sm">
                    Ajoutez {(100000 - getTotalPrice()).toLocaleString()} FCFA pour bénéficier de la livraison gratuite !
                  </p>
                </div>
              )}

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors mb-4">
                Procéder au paiement
              </button>

              <button 
                onClick={() => alert('Commande passée avec succès ! Vous recevrez un email de confirmation.')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4"
              >
                Commander
              </button>

              <button 
                onClick={() => setShowQuoteModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4"
              >
                Demander un devis
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Moyens de paiement acceptés:</p>
                <div className="flex justify-center space-x-2">
                  <div className="bg-gray-200 px-3 py-1 rounded text-xs font-medium">Mobile Money</div>
                  <div className="bg-gray-200 px-3 py-1 rounded text-xs font-medium">Carte Bancaire</div>
                  <div className="bg-gray-200 px-3 py-1 rounded text-xs font-medium">Virement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de demande de devis */}
        <QuoteRequestModal 
          isOpen={showQuoteModal} 
          onClose={() => setShowQuoteModal(false)} 
        />
      </div>
    </div>
  );
};

export default Cart;