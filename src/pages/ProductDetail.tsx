import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, Award, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app, fetch based on id
  const product = {
    id: parseInt(id || '1'),
    name: 'Bécher en Verre Borosilicate',
    price: 8500,
    originalPrice: 10000,
    description: 'Bécher gradué en verre borosilicate de haute qualité, résistant aux chocs thermiques et aux produits chimiques. Idéal pour les expériences de chimie en laboratoire scolaire.',
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
• Expériences de titrage

Entretien :
• Lavage à l'eau chaude savonneuse
• Compatible lave-vaisselle
• Éviter les chocs thermiques brutaux
• Stockage dans un endroit sec`,
    images: [
      'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    variants: [
      { id: 1, size: '50ml', price: 8500, stock: 25 },
      { id: 2, size: '100ml', price: 12000, stock: 20 },
      { id: 3, size: '150ml', price: 15000, stock: 18 },
      { id: 4, size: '200ml', price: 18000, stock: 15 }
    ],
    rating: 4.8,
    reviews: 24,
    inStock: true,
    category: 'Équipement de Chimie',
    brand: 'Sciences Labs',
    sku: 'BCH-050-SL',
    specifications: {
      'Matériau': 'Verre borosilicate 3.3',
      'Graduation': 'Graduations permanentes',
      'Précision': '±5%',
      'Température max': '500°C',
      'Résistance chimique': 'Excellente',
      'Norme': 'ISO 3819',
      'Origine': 'Allemagne',
      'Garantie': '2 ans',
      'Certification': 'CE, ISO'
    }
  };

  const reviews = [
    {
      id: 1,
      author: 'Prof. Amadou Traoré',
      rating: 5,
      date: '2024-01-10',
      comment: 'Excellent produit, très résistant et précis. Parfait pour nos expériences de chimie.',
      verified: true
    },
    {
      id: 2,
      author: 'Lycée Technique Bamako',
      rating: 4,
      date: '2024-01-05',
      comment: 'Bonne qualité, livraison rapide. Les graduations sont bien visibles.',
      verified: true
    },
    {
      id: 3,
      author: 'Dr. Fatoumata Sidibé',
      rating: 5,
      date: '2023-12-28',
      comment: 'Matériel de qualité professionnelle, recommandé pour tous les laboratoires.',
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: 'Erlenmeyer 100ml',
      price: 14000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Tube à essai',
      price: 2500,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      name: 'Pipette graduée',
      price: 6500,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  // Données pour le tableau de sélection par capacité
  const capacityVariants = [
    { 
      id: 'FJ-050', 
      name: 'Fiole 50 mL', 
      capacity: '50 mL', 
      reference: 'FJ-050', 
      price: 8500, 
      inStock: true, 
      quantity: 1,
      productId: 1
    },
    { 
      id: 'FJ-100', 
      name: 'Fiole 100 mL', 
      capacity: '100 mL', 
      reference: 'FJ-100', 
      price: 10000, 
      inStock: true, 
      quantity: 1,
      productId: 2
    },
    { 
      id: 'FJ-150', 
      name: 'Fiole 150 mL', 
      capacity: '150 mL', 
      reference: 'FJ-150', 
      price: 12000, 
      inStock: false, 
      quantity: 0,
      productId: 3
    },
    { 
      id: 'FJ-200', 
      name: 'Fiole 200 mL', 
      capacity: '200 mL', 
      reference: 'FJ-200', 
      price: 15000, 
      inStock: true, 
      quantity: 1,
      productId: 4
    },
    { 
      id: 'FJ-500', 
      name: 'Fiole 500 mL', 
      capacity: '500 mL', 
      reference: 'FJ-500', 
      price: 25000, 
      inStock: true, 
      quantity: 1,
      productId: 5
    }
  ];

  const [variantQuantities, setVariantQuantities] = useState<{[key: string]: number}>({});

  const currentVariant = product.variants[selectedVariant];

  const handleVariantQuantityChange = (variantId: string, change: number) => {
    setVariantQuantities(prev => ({
      ...prev,
      [variantId]: Math.max(0, (prev[variantId] || 1) + change)
    }));
  };

  const handleAddVariantToCart = (variant: any) => {
    const quantity = variantQuantities[variant.id] || 1;
    if (quantity > 0 && variant.inStock) {
      addToCart({
        id: variant.productId,
        name: variant.name,
        price: variant.price,
        image: product.images[0],
        quantity: quantity
      });
    }
  };

  const handleImageClick = () => {
    const tableElement = document.getElementById('capacity-selection-table');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} ${currentVariant.size}`,
      price: currentVariant.price,
      image: product.images[0],
      quantity: quantity
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {product.longDescription}
            </p>
          </div>
        );
      
      case 'specifications':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">{key}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Avis clients</h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}/5 ({product.reviews} avis)
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                Laisser un avis
              </button>
            </div>
            
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('fr-FR')}
                      </span>
                      {review.verified && (
                        <div className="text-xs text-green-600 mt-1">✓ Achat vérifié</div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <Link to="/boutique" className="hover:text-blue-600">Boutique</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          to="/boutique"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 cursor-pointer hover:shadow-xl transition-shadow relative group"
              onClick={handleImageClick}
              title="Cliquez pour voir les options de capacité"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-105">
                  Voir les options de capacité
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
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
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-4">
                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                <p className="text-gray-600 mt-2">SKU: {product.sku}</p>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews} avis)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {currentVariant.price.toLocaleString()} FCFA
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} FCFA
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Stock disponible: {currentVariant.stock} unités
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Capacité</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedVariant === index
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{variant.size}</div>
                      <div className="text-xs text-gray-500">{variant.price.toLocaleString()} FCFA</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantité</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-xs text-gray-600">Livraison rapide</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-xs text-gray-600">Garantie 2 ans</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-xs text-gray-600">Qualité certifiée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau de Sélection par Capacité */}
        <div id="capacity-selection-table" className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Fioles jaugées</h2>
            <p className="text-gray-600 mt-1">Sélectionnez la capacité qui vous convient</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Modèle / Capacité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Référence
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Prix unitaire
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Disponibilité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Quantité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {capacityVariants.map((variant) => (
                  <tr key={variant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{variant.name}</div>
                      <div className="text-sm text-gray-500">{variant.capacity}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                      {variant.reference}
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {variant.price.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      {variant.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ En stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          ✗ Rupture
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {variant.inStock ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVariantQuantityChange(variant.id, -1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors text-gray-600 font-bold"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-medium text-gray-900">
                            {variantQuantities[variant.id] || 1}
                          </span>
                          <button
                            onClick={() => handleVariantQuantityChange(variant.id, 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors text-gray-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {variant.inStock ? (
                          <>
                            <button
                              onClick={() => handleAddVariantToCart(variant)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Ajouter
                            </button>
                            <button className="text-red-500 hover:text-red-700 p-1 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed flex items-center"
                          >
                            🔒 Indisponible
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'description', name: 'Description' },
                { id: 'specifications', name: 'Spécifications' },
                { id: 'reviews', name: `Avis (${product.reviews})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/produit/${relatedProduct.id}`}
                disabled={!product.inStock}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-blue-600 font-bold">{relatedProduct.price.toLocaleString()} FCFA</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;