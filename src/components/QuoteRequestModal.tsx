import React, { useState } from 'react';
import { X, Send, FileText, Mail, User, Building, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({ isOpen, onClose }) => {
  const { cart, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    establishment: '',
    city: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    if (!formData.establishment.trim()) {
      newErrors.establishment = 'L\'établissement est requis';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateQuoteNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `DEV-${year}${month}${day}-${random}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const quoteNumber = generateQuoteNumber();
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    // Configuration des couleurs
    const primaryColor = [37, 99, 235]; // Bleu
    const secondaryColor = [249, 115, 22]; // Orange
    const textColor = [55, 65, 81]; // Gris foncé
    
    // En-tête avec logo et informations entreprise
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo (simulé avec du texte)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SL', 20, 25);
    
    // Nom de l'entreprise
    doc.setFontSize(16);
    doc.text('Sciences Labs', 35, 20);
    doc.setFontSize(10);
    doc.text('Équipements Scientifiques Éducatifs', 35, 28);
    
    // Informations de contact
    doc.setFontSize(8);
    doc.text('Bamako, Mali | +223 XX XX XX XX | contact@scienceslabs.com', 35, 35);
    
    // Titre DEVIS
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('DEVIS', 150, 25);
    
    // Numéro et date
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`N° ${quoteNumber}`, 150, 32);
    doc.text(`Date: ${currentDate}`, 150, 37);
    
    // Informations client
    let yPos = 55;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DEVIS POUR:', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.firstName} ${formData.lastName}`, 20, yPos);
    yPos += 5;
    doc.text(`${formData.establishment}`, 20, yPos);
    yPos += 5;
    doc.text(`${formData.city}`, 20, yPos);
    yPos += 5;
    doc.text(`Email: ${formData.email}`, 20, yPos);
    yPos += 5;
    doc.text(`Tél: ${formData.phone}`, 20, yPos);
    
    // Tableau des produits
    yPos += 15;
    
    // En-tête du tableau
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉSIGNATION', 25, yPos + 5);
    doc.text('QTÉ', 120, yPos + 5);
    doc.text('PRIX UNITAIRE', 135, yPos + 5);
    doc.text('TOTAL', 170, yPos + 5);
    
    yPos += 8;
    
    // Lignes des produits
    doc.setFont('helvetica', 'normal');
    let subtotal = 0;
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      // Ligne de séparation
      if (index > 0) {
        doc.setDrawColor(220, 220, 220);
        doc.line(20, yPos, 190, yPos);
      }
      
      yPos += 6;
      
      // Nom du produit (avec retour à la ligne si nécessaire)
      const productName = item.name.length > 35 ? item.name.substring(0, 35) + '...' : item.name;
      doc.text(productName, 25, yPos);
      doc.text(item.quantity.toString(), 125, yPos);
      doc.text(`${item.price.toLocaleString()} FCFA`, 135, yPos);
      doc.text(`${itemTotal.toLocaleString()} FCFA`, 165, yPos);
    });
    
    // Totaux
    yPos += 15;
    doc.setDrawColor(...primaryColor);
    doc.line(120, yPos, 190, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('Sous-total:', 135, yPos);
    doc.text(`${subtotal.toLocaleString()} FCFA`, 165, yPos);
    
    yPos += 6;
    const tva = Math.round(subtotal * 0.18);
    doc.text('TVA (18%):', 135, yPos);
    doc.text(`${tva.toLocaleString()} FCFA`, 165, yPos);
    
    yPos += 6;
    const shipping = subtotal >= 100000 ? 0 : 15000;
    doc.text('Livraison:', 135, yPos);
    doc.text(shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString()} FCFA`, 165, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    const total = subtotal + tva + shipping;
    doc.text('TOTAL TTC:', 135, yPos);
    doc.text(`${total.toLocaleString()} FCFA`, 165, yPos);
    
    // Conditions
    yPos += 20;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('CONDITIONS:', 20, yPos);
    
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const conditions = [
      '• Devis valable 30 jours',
      '• Livraison sous 7-14 jours ouvrables',
      '• Paiement : Mobile Money, Virement bancaire ou Espèces',
      '• Formation à l\'utilisation incluse',
      '• Garantie constructeur sur tous les produits'
    ];
    
    conditions.forEach(condition => {
      doc.text(condition, 20, yPos);
      yPos += 5;
    });
    
    // Message personnalisé
    if (formData.message.trim()) {
      yPos += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('MESSAGE:', 20, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      const messageLines = doc.splitTextToSize(formData.message, 170);
      doc.text(messageLines, 20, yPos);
    }
    
    // Pied de page
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Merci pour votre confiance. Pour toute question : contact@scienceslabs.com', 20, pageHeight - 20);
    doc.text('Sciences Labs - Votre partenaire pour l\'équipement de laboratoires en Afrique de l\'Ouest', 20, pageHeight - 15);
    
    return doc;
  };

  const sendEmail = async (pdfBlob: Blob) => {
    // Configuration EmailJS (vous devrez configurer votre compte EmailJS)
    const serviceID = 'your_service_id';
    const templateID = 'your_template_id';
    const userID = 'your_user_id';
    
    // Convertir le PDF en base64 pour l'envoi
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64PDF = (reader.result as string).split(',')[1];
        
        const templateParams = {
          to_email: formData.email,
          cc_email: 'devis@scienceslabs.com',
          client_name: `${formData.firstName} ${formData.lastName}`,
          establishment: formData.establishment,
          city: formData.city,
          phone: formData.phone,
          message: formData.message,
          total_amount: (getTotalPrice() * 1.18 + (getTotalPrice() >= 100000 ? 0 : 15000)).toLocaleString(),
          pdf_attachment: base64PDF
        };
        
        try {
          // Pour la démonstration, on simule l'envoi
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log('Email envoyé avec succès', templateParams);
          resolve(true);
        } catch (error) {
          console.error('Erreur envoi email:', error);
          reject(error);
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cart.length === 0) {
      alert('Votre panier est vide. Ajoutez des produits avant de demander un devis.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Générer le PDF
      const pdf = generatePDF();
      const pdfBlob = pdf.output('blob');
      
      // Télécharger le PDF localement
      pdf.save(`Devis_SciencesLabs_${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Créer le devis dans le système
      const quoteData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          establishment: formData.establishment,
          city: formData.city
        },
        items: cart.map((item, index) => ({
          id: index + 1,
          productName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        subtotal: getTotalPrice(),
        tva: Math.round(getTotalPrice() * 0.18),
        shipping: getTotalPrice() >= 100000 ? 0 : 15000,
        totalAmount: getTotalPrice() * 1.18 + (getTotalPrice() >= 100000 ? 0 : 15000),
        status: 'pending' as const,
        priority: 'medium' as const,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        message: formData.message
      };
      
      createQuote(quoteData);
      
      // Simuler l'envoi par email
      await sendEmail(pdfBlob);
      
      // Message de confirmation
      alert('✅ Votre devis a bien été envoyé à votre adresse e-mail. Merci de votre confiance !');
      
      // Fermer le modal
      onClose();
      
      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        establishment: '',
        city: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Erreur lors de la génération du devis:', error);
      alert('Une erreur est survenue lors de la génération du devis. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Demander un devis</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Résumé du panier */}
        <div className="p-6 bg-blue-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Résumé de votre demande</h3>
          <div className="space-y-2">
            {cart.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</span>
              </div>
            ))}
            {cart.length > 3 && (
              <div className="text-sm text-gray-500">
                ... et {cart.length - 3} autre{cart.length - 3 > 1 ? 's' : ''} produit{cart.length - 3 > 1 ? 's' : ''}
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total estimé TTC:</span>
                <span className="text-blue-600">
                  {(getTotalPrice() * 1.18 + (getTotalPrice() >= 100000 ? 0 : 15000)).toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Prénom *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre prénom"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Nom *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+223 XX XX XX XX"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                Établissement *
              </label>
              <input
                type="text"
                name="establishment"
                value={formData.establishment}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.establishment ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nom de votre établissement"
              />
              {errors.establishment && <p className="text-red-500 text-sm mt-1">{errors.establishment}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Ville *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre ville"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (optionnel)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Informations complémentaires, besoins spécifiques..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Génération en cours...' : 'Envoyer le devis'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestModal;