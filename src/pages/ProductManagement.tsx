import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Plus, Search, Filter, Edit, Trash2, Eye, Image, 
  AlertTriangle, CheckCircle, XCircle, ChevronDown, MoreHorizontal, 
  Download, Upload, Printer, Tag, DollarSign, BarChart3
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  model: string;
  description: string;
  category: string;
  subCategory: string;
  sku: string;
  brand: string;
  priceHT: number;
  priceTTC: number;
  tva: number;
  stock: number;
  stockAlert: number;
  status: 'active' | 'inactive' | 'discontinued';
  images: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

const ProductManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Bécher en Verre Borosilicate',
      model: 'BCH-050',
      description: 'Bécher gradué en verre borosilicate résistant aux chocs thermiques',
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
      images: ['https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'],
      specifications: {
        'Matériau': 'Verre borosilicate 3.3',
        'Capacité': '50ml',
        'Graduation': 'Graduations permanentes',
        'Température max': '500°C'
      },
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:20:00Z'
    },
    {
      id: 2,
      name: 'Liqueur de Fehling A et B',
      model: 'FEH-AB-500',
      description: 'Kit complet liqueur de Fehling A et B pour tests de sucres réducteurs',
      category: 'reagents',
      subCategory: 'fehling',
      sku: 'FEH-AB-500',
      brand: 'ChemLab',
      priceHT: 12712,
      priceTTC: 15000,
      tva: 18,
      stock: 15,
      stockAlert: 5,
      status: 'active',
      images: ['https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'],
      specifications: {
        'Volume': '500ml chaque',
        'Composition': 'Solution A: CuSO4, Solution B: NaOH + Tartrate',
        'Conservation': 'Température ambiante',
        'Durée de vie': '2 ans'
      },
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T11:30:00Z'
    },
    {
      id: 3,
      name: 'Microscope Binoculaire 1000x',
      model: 'MIC-BIN-1000',
      description: 'Microscope binoculaire professionnel grossissement 40x à 1000x',
      category: 'biology',
      subCategory: 'microscopes',
      sku: 'MIC-BIN-1000',
      brand: 'BioLab',
      priceHT: 237288,
      priceTTC: 280000,
      tva: 18,
      stock: 3,
      stockAlert: 2,
      status: 'active',
      images: ['https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'],
      specifications: {
        'Grossissement': '40x, 100x, 400x, 1000x',
        'Type': 'Binoculaire',
        'Éclairage': 'LED',
        'Platine': 'Mécanique'
      },
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-15T10:20:00Z'
    },
    {
      id: 4,
      name: 'Blouse de Laboratoire Coton',
      model: 'BLO-COT-M',
      description: 'Blouse de laboratoire 100% coton avec boutons pression',
      category: 'safety',
      subCategory: 'lab-coats',
      sku: 'BLO-COT-M',
      brand: 'SafeLab',
      priceHT: 10169,
      priceTTC: 12000,
      tva: 18,
      stock: 50,
      stockAlert: 20,
      status: 'active',
      images: ['https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400'],
      specifications: {
        'Matériau': '100% Coton',
        'Taille': 'M',
        'Couleur': 'Blanc',
        'Fermeture': 'Boutons pression'
      },
      createdAt: '2024-01-08T12:00:00Z',
      updatedAt: '2024-01-19T15:45:00Z'
    },
    {
      id: 5,
      name: 'Paillasse de Laboratoire 2m',
      model: 'PAI-2M-CHIM',
      description: 'Paillasse résistante aux produits chimiques avec évier intégré',
      category: 'furniture',
      subCategory: 'benches',
      sku: 'PAI-2M-CHIM',
      brand: 'LabFurniture',
      priceHT: 156780,
      priceTTC: 185000,
      tva: 18,
      stock: 2,
      stockAlert: 1,
      status: 'active',
      images: ['https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'],
      specifications: {
        'Longueur': '2m',
        'Largeur': '60cm',
        'Hauteur': '85cm',
        'Matériau': 'Résine époxy'
      },
      createdAt: '2024-01-03T14:30:00Z',
      updatedAt: '2024-01-12T09:15:00Z'
    }
  ]);

  const categories = [
    { id: 'all', name: 'Toutes catégories' },
    { id: 'chemistry', name: 'Équipement de Chimie' },
    { id: 'reagents', name: 'Réactifs' },
    { id: 'physics', name: 'Équipement de Physique' },
    { id: 'biology', name: 'Équipement de SVT' },
    { id: 'safety', name: 'Équipement de Sécurité' },
    { id: 'furniture', name: 'Mobilier de laboratoire' },
    { id: 'training', name: 'Formations & Accompagnement' },
    { id: 'miscellaneous', name: 'Divers' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleProductSelect = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length 
        ? [] 
        : filteredProducts.map(product => product.id)
    );
  };

  const handleStatusChange = (productId: number, newStatus: Product['status']) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number, alert: number) => {
    if (stock === 0) return { icon: XCircle, color: 'text-red-600', label: 'Rupture' };
    if (stock <= alert) return { icon: AlertTriangle, color: 'text-orange-600', label: 'Alerte' };
    return { icon: CheckCircle, color: 'text-green-600', label: 'Disponible' };
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Liste des Produits - Sciences Labs</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
            .subtitle { color: #666; margin-top: 5px; }
            .products-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .products-table th, .products-table td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            .products-table th { background-color: #f8f9fa; font-weight: bold; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
            .print-date { margin-top: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Sciences Labs</div>
            <div class="subtitle">Liste des Produits</div>
            <div class="print-date">Imprimé le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</div>
          </div>
          
          <table class="products-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix HT</th>
                <th>Prix TTC</th>
                <th>Stock</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts.map(product => `
                <tr>
                  <td>${product.sku}</td>
                  <td>${product.name}</td>
                  <td>${categories.find(c => c.id === product.category)?.name || product.category}</td>
                  <td>${formatCurrency(product.priceHT)}</td>
                  <td>${formatCurrency(product.priceTTC)}</td>
                  <td>${product.stock}</td>
                  <td>${product.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Sciences Labs - Bamako, Mali</p>
            <p>Total produits: ${filteredProducts.length}</p>
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

  const handleExportCSV = () => {
    const headers = ['SKU', 'Nom', 'Modèle', 'Catégorie', 'Prix HT', 'Prix TTC', 'TVA', 'Stock', 'Seuil Alerte', 'Statut'];
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map(product => [
        product.sku,
        `"${product.name}"`,
        product.model,
        product.category,
        product.priceHT,
        product.priceTTC,
        product.tva,
        product.stock,
        product.stockAlert,
        product.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produits_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits et stock</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <Link
            to="/admin/categories"
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Tag className="w-4 h-4 mr-2" />
            Catégories
          </Link>
          <Link
            to="/admin/produits/ajouter"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau produit
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertes Stock</p>
              <p className="text-2xl font-bold text-orange-600">
                {products.filter(p => p.stock <= p.stockAlert).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur Stock</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(products.reduce((sum, p) => sum + (p.priceTTC * p.stock), 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} sélectionné{selectedProducts.length > 1 ? 's' : ''}
            </span>
            {selectedProducts.length > 0 && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Actions groupées
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="discontinued">Discontinué</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les stocks</option>
                  <option value="available">Disponible</option>
                  <option value="low">Stock faible</option>
                  <option value="out">Rupture</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU / Modèle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix HT/TTC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock, product.stockAlert);
                const StockIcon = stockStatus.icon;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductSelect(product.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">{product.sku}</div>
                      <div className="text-sm text-gray-500">{product.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {categories.find(c => c.id === product.category)?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(product.priceHT)}</div>
                      <div className="text-sm font-medium text-blue-600">{formatCurrency(product.priceTTC)}</div>
                      <div className="text-xs text-gray-500">TVA {product.tva}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StockIcon className={`w-4 h-4 mr-2 ${stockStatus.color}`} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.stock}</div>
                          <div className="text-xs text-gray-500">Seuil: {product.stockAlert}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.id, e.target.value as Product['status'])}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(product.status)}`}
                      >
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                        <option value="discontinued">Discontinué</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/produits/${product.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/produits/${product.id}/editer`)}
                          className="text-green-600 hover:text-green-900"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Plus d'actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="w-8 h-8 text-orange-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Alertes stock</h4>
              <p className="text-sm text-gray-600">Gérer les produits en rupture</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Analyse des ventes</h4>
              <p className="text-sm text-gray-600">Voir les produits les plus vendus</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Tag className="w-8 h-8 text-purple-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Gestion des prix</h4>
              <p className="text-sm text-gray-600">Mise à jour des tarifs</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;