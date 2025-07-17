import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCategories } from '../context/CategoryContext';

const Shop = () => {
  const { categories } = useCategories();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { addToCart } = useCart();

  const shopCategories = [
    { 
      id: 'all', 
      name: 'Toutes catégories',
      subCategories: []
    },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      subCategories: cat.subCategories.map(sub => ({
        id: sub.id,
        name: sub.name
      }))
    }))
  ];

  const priceRanges = [
    { id: 'all', name: 'Tous les prix' },
    { id: '0-50000', name: '0 - 50,000 FCFA' },
    { id: '50000-100000', name: '50,000 - 100,000 FCFA' },
    { id: '100000-200000', name: '100,000 - 200,000 FCFA' },
    { id: '200000+', name: '200,000+ FCFA' }
  ];

  const products = [
    {
      id: 1,
      name: 'Bécher en Verre Borosilicate 50ml',
      category: 'chemistry',
      subCategory: 'beakers',
      price: 8500,
      originalPrice: 10000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant',
      rating: 4.8,
      reviews: 24,
      inStock: true,
      isNew: true,
      variants: [
        { size: '50ml', price: 8500, stock: 25 },
        { size: '100ml', price: 12000, stock: 20 },
        { size: '150ml', price: 15000, stock: 18 },
        { size: '200ml', price: 18000, stock: 15 }
      ]
    },
    {
      id: 2,
      name: 'Bécher en Verre Borosilicate 100ml',
      category: 'chemistry',
      subCategory: 'beakers',
      price: 12000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant',
      rating: 4.8,
      reviews: 24,
      inStock: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Bécher en Verre Borosilicate 150ml',
      category: 'chemistry',
      subCategory: 'beakers',
      price: 15000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant',
      rating: 4.8,
      reviews: 24,
      inStock: true,
      isNew: false
    },
    {
      id: 4,
      name: 'Bécher en Verre Borosilicate 200ml',
      category: 'chemistry',
      subCategory: 'beakers',
      price: 18000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant',
      rating: 4.8,
      reviews: 24,
      inStock: true,
      isNew: false
    },
    {
      id: 5,
      name: 'Microscope Binoculaire',
      category: 'biology',
      subCategory: 'microscopes',
      price: 280000,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Microscope professionnel pour observations biologiques',
      rating: 4.9,
      reviews: 18,
      inStock: true,
      isNew: false
    },
    {
      id: 6,
      name: 'Oscilloscope Numérique',
      category: 'physics',
      subCategory: 'electricity',
      price: 195000,
      image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Oscilloscope 2 voies pour mesures électriques',
      rating: 4.7,
      reviews: 12,
      inStock: false,
      isNew: false
    },
    {
      id: 7,
      name: 'Armoire de Sécurité',
      category: 'safety',
      subCategory: 'storage',
      price: 320000,
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Armoire ventilée pour produits chimiques',
      rating: 4.8,
      reviews: 8,
      inStock: true,
      isNew: true
    },
    {
      id: 8,
      name: 'Paillasse de Laboratoire',
      category: 'furniture',
      subCategory: 'benches',
      price: 185000,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Paillasse résistante aux produits chimiques',
      rating: 4.5,
      reviews: 15,
      inStock: true,
      isNew: false
    }
  ];

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = (() => {
      if (priceRange === 'all') return true;
      if (priceRange === '0-50000') return product.price <= 50000;
      if (priceRange === '50000-100000') return product.price > 50000 && product.price <= 100000;
      if (priceRange === '100000-200000') return product.price > 100000 && product.price <= 200000;
      if (priceRange === '200000+') return product.price > 200000;
      return true;
    })();
    
    return matchesCategory && matchesSubCategory && matchesSearch && matchesPrice;
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('all');
  };

  // Gérer les paramètres URL pour la catégorie sélectionnée
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategory(categoryParam);
    }
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Boutique</h1>
          <p className="text-gray-600">Découvrez notre gamme complète d'équipements scientifiques</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtres
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nom du produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Category Filter with Subcategories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                <div className="space-y-2">
                  {shopCategories.map(category => (
                    <div key={category.id}>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleCategoryChange(category.id)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-100 text-blue-800 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                        {category.subCategories.length > 0 && (
                          <button
                            onClick={() => toggleCategoryExpansion(category.id)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            {expandedCategories.includes(category.id) ? 
                              <ChevronDown className="w-4 h-4" /> : 
                              <ChevronRight className="w-4 h-4" />
                            }
                          </button>
                        )}
                      </div>
                      
                      {/* Subcategories */}
                      {category.subCategories.length > 0 && 
                       expandedCategories.includes(category.id) && 
                       selectedCategory === category.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          <button
                            onClick={() => setSelectedSubCategory('all')}
                            className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors ${
                              selectedSubCategory === 'all'
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            Toutes les sous-catégories
                          </button>
                          {category.subCategories.map(subCat => (
                            <button
                              key={subCat.id}
                              onClick={() => setSelectedSubCategory(subCat.id)}
                              className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors ${
                                selectedSubCategory === subCat.id
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {subCat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </div>
                <div className="flex items-center space-x-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Trier par popularité</option>
                    <option>Prix croissant</option>
                    <option>Prix décroissant</option>
                    <option>Nouveautés</option>
                  </select>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-48'} overflow-hidden`}>
                    <Link to={`/produit/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 transform hover:scale-105">
                          Voir détails
                        </button>
                      </div>
                    </Link>
                    {product.isNew && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Nouveau
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Rupture de stock</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews} avis)</span>
                    </div>
                    
                    {/* Product Variants */}
                    {product.variants && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Tailles disponibles:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.variants.map((variant, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {variant.size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold text-blue-600">{product.price.toLocaleString()} FCFA</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.originalPrice.toLocaleString()} FCFA
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Ajouter' : 'Indisponible'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">Aucun produit trouvé</div>
                <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;