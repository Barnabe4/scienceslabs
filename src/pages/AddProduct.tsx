import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Package, Image, DollarSign, Tag, AlertTriangle, Plus, X } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';

const AddProduct = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    description: '',
    category: '',
    subCategory: '',
    sku: '',
    brand: '',
    priceHT: 0,
    tva: 18,
    stock: 0,
    stockAlert: 0,
    status: 'active',
    images: [] as string[],
    specifications: {} as Record<string, string>
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      subCategory: ''
    }));
  };

  const calculatePriceTTC = () => {
    return formData.priceHT * (1 + formData.tva / 100);
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'Le SKU est requis';
    }

    if (formData.priceHT <= 0) {
      newErrors.priceHT = 'Le prix HT doit être supérieur à 0';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Le stock ne peut pas être négatif';
    }

    if (formData.stockAlert < 0) {
      newErrors.stockAlert = 'Le seuil d\'alerte ne peut pas être négatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulation de création de produit
    alert('Produit créé avec succès !');
    
    // Redirection vers la liste des produits
    navigate('/admin/produits');
  };

  const selectedCategory = categories.find(c => c.id === formData.category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/produits"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Produit</h1>
            <p className="text-gray-600">Ajouter un nouveau produit au catalogue</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations générales */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Informations générales
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Bécher en Verre Borosilicate"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modèle
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: BCH-050"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.sku ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: BCH-050-SL"
                  />
                  {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marque
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Sciences Labs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="discontinued">Discontinué</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description détaillée du produit..."
                  />
                </div>
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Catégories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie principale *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-catégorie
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    disabled={!selectedCategory}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Sélectionner une sous-catégorie</option>
                    {selectedCategory?.subCategories.map(subCat => (
                      <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Spécifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Spécifications techniques</h2>
              
              <div className="space-y-4">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{key}:</span>
                      <span className="ml-2 text-gray-700">{value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Nom de la spécification"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    placeholder="Valeur"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prix et stock */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Prix et TVA
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix HT (FCFA) *
                  </label>
                  <input
                    type="number"
                    name="priceHT"
                    value={formData.priceHT}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.priceHT ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.priceHT && <p className="text-red-500 text-sm mt-1">{errors.priceHT}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TVA (%)
                  </label>
                  <select
                    name="tva"
                    value={formData.tva}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>0% (Exonéré)</option>
                    <option value={18}>18% (Standard)</option>
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium">Prix TTC calculé:</div>
                    <div className="text-lg font-bold">
                      {calculatePriceTTC().toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Gestion du stock
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock initial
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seuil d'alerte
                  </label>
                  <input
                    type="number"
                    name="stockAlert"
                    value={formData.stockAlert}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.stockAlert ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stockAlert && <p className="text-red-500 text-sm mt-1">{errors.stockAlert}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Alerte quand le stock atteint ce niveau
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Images
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Glissez vos images ici</p>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Choisir des fichiers
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG jusqu'à 5MB chacune
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            to="/admin/produits"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Créer le produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;