import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Printer, Download, Share2 } from 'lucide-react';

const ProductPreview = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Simulation de chargement des données produit
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées basées sur l'ID
      const productData = {
        id: parseInt(id || '1'),
        name: 'Bécher en Verre Borosilicate',
        model: 'BCH-050',
        description: 'Bécher gradué en verre borosilicate résistant aux chocs thermiques',
        longDescription: `Ce bécher en verre borosilicate est conçu pour répondre aux exigences des laboratoires scolaires et universitaires. Sa composition en borosilicate lui confère une résistance exceptionnelle aux variations de température et aux agents chimiques corrosifs.

Caractéristiques principales :
• Verre borosilicate 3.3 de qualité laboratoire
• Graduations précises et durables
• Bec verseur ergonomique pour un versement précis
• Base stable et épaisse
• Résistance thermique de -40°C à +500°C
• Conforme aux normes ISO 3819

Applications :
• Préparation de solutions
• Réactions chimiques
• Chauffage de liquides
• Mesures volumétriques
• Expériences de titrage`,
        category: 'chemistry',
        subCategory: 'beakers',
        sku: 'BCH-050-SL',
        brand: 'Sciences Labs',
        priceHT: 7203,
        priceTTC: 8500,
        tva: 18,
        stock: 25,
        stockAlert: 10,
        status: 'active',
        images: [
          'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        specifications: {
          'Matériau': 'Verre borosilicate 3.3',
          'Capacité': '50ml',
          'Graduation': 'Graduations permanentes',
          'Température max': '500°C',
          'Résistance chimique': 'Excellente',
          'Norme': 'ISO 3819',
          'Origine': 'Allemagne',
          'Garantie': '2 ans'
        },
        variants: [
          { id: 1, size: '50ml', price: 8500, stock: 25 },
          { id: 2, size: '100ml', price: 12000, stock: 20 },
          { id: 3, size: '150ml', price: 15000, stock: 18 },
          { id: 4, size: '200ml', price: 18000, stock: 15 }
        ]
      };
      
      setProduct(productData);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('Téléchargement de la fiche produit en PDF');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Découvrez ${product?.name} sur Sciences Labs`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage', error));
    } else {
      alert('Fonctionnalité de partage non disponible sur ce navigateur');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
            <Link
              to="/admin/produits"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour à la liste des produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/produits"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prévisualisation du produit</h1>
              <p className="text-gray-600">Aperçu avant publication</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Imprimer"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Télécharger PDF"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Partager"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </button>
            <Link
              to={`/admin/produits/${id}/editer`}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              Éditer
            </Link>
          </div>
        </div>

        {/* Product Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>
              <div className="flex space-x-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-blue-600 font-medium">
                  {product.category === 'chemistry' ? 'Équipement de Chimie' : product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                <p className="text-gray-600 mt-2">SKU: {product.sku} | Modèle: {product.model}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatCurrency(product.priceTTC)}
                  </span>
                  <span className="text-lg text-gray-500">
                    HT: {formatCurrency(product.priceHT)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  TVA {product.tva}% incluse
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Stock disponible: {product.stock} unités
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Capacité</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant: any) => (
                    <div
                      key={variant.id}
                      className="p-3 border rounded-lg text-center transition-colors border-blue-600 bg-blue-50 text-blue-600"
                    >
                      <div className="font-medium">{variant.size}</div>
                      <div className="text-xs text-gray-500">{formatCurrency(variant.price)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600">Qualité certifiée</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600">Livraison rapide</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600">Garantie 2 ans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du produit</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description détaillée</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{product.longDescription}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spécifications techniques</h3>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-700">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Notes administratives</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3"></div>
              <div>
                <p className="font-medium text-yellow-800">Statut du produit: <span className="text-green-600">Actif</span></p>
                <p className="text-yellow-700 text-sm">Le produit est visible et disponible à l'achat sur le site.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3"></div>
              <div>
                <p className="font-medium text-yellow-800">Stock: <span className="text-green-600">25 unités</span></p>
                <p className="text-yellow-700 text-sm">Seuil d'alerte configuré à 10 unités.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3"></div>
              <div>
                <p className="font-medium text-yellow-800">Prix et marge</p>
                <p className="text-yellow-700 text-sm">Prix HT: {formatCurrency(product.priceHT)} | Prix TTC: {formatCurrency(product.priceTTC)} | TVA: {product.tva}%</p>
                <p className="text-yellow-700 text-sm">Marge bénéficiaire: 35%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-8">
          <Link
            to="/admin/produits"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Retour à la liste
          </Link>
          <Link
            to={`/admin/produits/${id}/editer`}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Modifier ce produit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;