import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tag, Plus, Edit, Trash2, ChevronDown, ChevronRight, 
  ArrowLeft, Save, X, Package, AlertTriangle
} from 'lucide-react';

interface SubCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories: SubCategory[];
  productCount: number;
  isExpanded?: boolean;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'chemistry',
      name: 'Équipement de Chimie',
      description: 'Matériel de laboratoire pour expériences chimiques',
      icon: '🧪',
      productCount: 45,
      subCategories: [
        { id: 'glassware', name: 'Verreries', description: 'Verreries diverses pour laboratoire', productCount: 12 },
        { id: 'beakers', name: 'Béchers', description: 'Béchers de différentes tailles', productCount: 8 },
        { id: 'volumetric-flasks', name: 'Fioles jaugées', description: 'Fioles jaugées de précision', productCount: 6 },
        { id: 'erlenmeyers', name: 'Erlenmeyers', description: 'Erlenmeyers de différentes tailles', productCount: 5 },
        { id: 'test-tubes', name: 'Tubes à essai', description: 'Tubes à essai en verre', productCount: 4 },
        { id: 'burettes', name: 'Burettes et Pipettes', description: 'Instruments de mesure volumétrique', productCount: 7 },
        { id: 'balances', name: 'Balances de précision', description: 'Balances électroniques de précision', productCount: 3 }
      ],
      isExpanded: true
    },
    {
      id: 'reagents',
      name: 'Réactifs',
      description: 'Produits chimiques pour expériences',
      icon: '⚗️',
      productCount: 32,
      subCategories: [
        { id: 'fehling', name: 'Liqueur de Fehling', description: 'Pour tests de sucres réducteurs', productCount: 2 },
        { id: 'schiff', name: 'Réactif de Schiff', description: 'Pour détection des aldéhydes', productCount: 1 },
        { id: 'acids', name: 'Acides', description: 'Acides pour laboratoire', productCount: 8 },
        { id: 'bases', name: 'Bases', description: 'Bases pour laboratoire', productCount: 6 },
        { id: 'salts', name: 'Sels', description: 'Sels minéraux divers', productCount: 10 },
        { id: 'indicators', name: 'Indicateurs colorés', description: 'Indicateurs de pH', productCount: 5 }
      ]
    },
    {
      id: 'physics',
      name: 'Équipement de Physique',
      description: 'Matériel pour expériences de physique',
      icon: '⚡',
      productCount: 28,
      subCategories: [
        { id: 'oscilloscopes', name: 'Oscilloscopes', description: 'Pour visualisation de signaux électriques', productCount: 3 },
        { id: 'generators', name: 'Générateurs', description: 'Générateurs de fonctions et de signaux', productCount: 4 },
        { id: 'mechanics', name: 'Mécanique', description: 'Équipements pour expériences de mécanique', productCount: 8 },
        { id: 'electricity', name: 'Électricité', description: 'Matériel pour circuits électriques', productCount: 7 },
        { id: 'optics', name: 'Optique', description: 'Équipements pour expériences d\'optique', productCount: 6 }
      ]
    },
    {
      id: 'biology',
      name: 'Équipement de SVT',
      description: 'Matériel pour biologie et sciences naturelles',
      icon: '🔬',
      productCount: 35,
      subCategories: [
        { id: 'microscopes', name: 'Microscopes', description: 'Microscopes optiques et numériques', productCount: 8 },
        { id: 'petri-dishes', name: 'Boîtes de Pétri', description: 'Pour cultures microbiologiques', productCount: 4 },
        { id: 'models', name: 'Modèles anatomiques', description: 'Modèles du corps humain et animal', productCount: 12 },
        { id: 'specimens', name: 'Échantillons', description: 'Spécimens conservés pour observation', productCount: 6 },
        { id: 'dissection', name: 'Matériel de dissection', description: 'Instruments pour dissection', productCount: 5 }
      ]
    },
    {
      id: 'safety',
      name: 'Équipement de Sécurité',
      description: 'Matériel de protection et sécurité',
      icon: '🛡️',
      productCount: 22,
      subCategories: [
        { id: 'lab-coats', name: 'Blouses de laboratoire', description: 'Protection vestimentaire', productCount: 5 },
        { id: 'gloves', name: 'Gants de protection', description: 'Protection des mains', productCount: 4 },
        { id: 'safety-glasses', name: 'Lunettes de sécurité', description: 'Protection des yeux', productCount: 3 },
        { id: 'ppe', name: 'EPI complets', description: 'Équipements de protection individuelle', productCount: 2 },
        { id: 'showers', name: 'Douches de sécurité', description: 'Pour décontamination d\'urgence', productCount: 1 },
        { id: 'extinguishers', name: 'Extincteurs', description: 'Lutte contre incendie', productCount: 3 },
        { id: 'storage', name: 'Armoires de sécurité', description: 'Stockage sécurisé de produits dangereux', productCount: 4 }
      ]
    }
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<{categoryId: string, subCategoryId: string} | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '🔬'
  });

  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    description: ''
  });

  const toggleCategoryExpansion = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
    ));
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    const newCat: Category = {
      id: categoryId,
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      productCount: 0,
      subCategories: [],
      isExpanded: true
    };

    setCategories(prev => [...prev, newCat]);
    setNewCategory({ name: '', description: '', icon: '🔬' });
    setShowAddCategory(false);
  };

  const handleAddSubCategory = (categoryId: string) => {
    if (!newSubCategory.name.trim()) return;

    const subCategoryId = newSubCategory.name.toLowerCase().replace(/\s+/g, '-');
    const newSubCat: SubCategory = {
      id: subCategoryId,
      name: newSubCategory.name,
      description: newSubCategory.description,
      productCount: 0
    };

    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subCategories: [...cat.subCategories, newSubCat] }
        : cat
    ));
    setNewSubCategory({ name: '', description: '' });
    setShowAddSubCategory(null);
  };

  const handleUpdateCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, name: newCategory.name || cat.name, description: newCategory.description || cat.description, icon: newCategory.icon || cat.icon }
        : cat
    ));
    setNewCategory({ name: '', description: '', icon: '🔬' });
    setEditingCategory(null);
  };

  const handleUpdateSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            subCategories: cat.subCategories.map(subCat => 
              subCat.id === subCategoryId 
                ? { ...subCat, name: newSubCategory.name || subCat.name, description: newSubCategory.description || subCat.description }
                : subCat
            )
          }
        : cat
    ));
    setNewSubCategory({ name: '', description: '' });
    setEditingSubCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    if (category.productCount > 0) {
      alert(`Impossible de supprimer cette catégorie car elle contient ${category.productCount} produits.`);
      return;
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleDeleteSubCategory = (categoryId: string, subCategoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const subCategory = category.subCategories.find(subCat => subCat.id === subCategoryId);
    if (!subCategory) return;

    if (subCategory.productCount > 0) {
      alert(`Impossible de supprimer cette sous-catégorie car elle contient ${subCategory.productCount} produits.`);
      return;
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la sous-catégorie "${subCategory.name}" ?`)) {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subCategories: cat.subCategories.filter(subCat => subCat.id !== subCategoryId) }
          : cat
      ));
    }
  };

  const startEditCategory = (category: Category) => {
    setNewCategory({
      name: category.name,
      description: category.description,
      icon: category.icon
    });
    setEditingCategory(category.id);
  };

  const startEditSubCategory = (categoryId: string, subCategory: SubCategory) => {
    setNewSubCategory({
      name: subCategory.name,
      description: subCategory.description
    });
    setEditingSubCategory({ categoryId, subCategoryId: subCategory.id });
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>
            <p className="text-gray-600">Organisez votre catalogue de produits</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddCategory(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Catégories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <Tag className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sous-catégories</p>
              <p className="text-2xl font-bold text-purple-600">
                {categories.reduce((sum, cat) => sum + cat.subCategories.length, 0)}
              </p>
            </div>
            <Tag className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits classés</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Catégories et sous-catégories</h2>
        
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gray-50 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCategoryExpansion(category.id)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    {category.isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{category.productCount} produits</span>
                  <button
                    onClick={() => startEditCategory(category)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Supprimer"
                    disabled={category.productCount > 0}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Edit Category Form */}
              {editingCategory === category.id && (
                <div className="p-4 bg-blue-50 border-t border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Modifier la catégorie</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                      <input
                        type="text"
                        value={newCategory.icon}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="🔬"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingCategory(null)}
                      className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateCategory(category.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              )}

              {/* Subcategories */}
              {category.isExpanded && (
                <div className="p-4">
                  <div className="space-y-2">
                    {category.subCategories.map(subCategory => (
                      <div key={subCategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{subCategory.name}</h4>
                          <p className="text-sm text-gray-600">{subCategory.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{subCategory.productCount} produits</span>
                          <button
                            onClick={() => startEditSubCategory(category.id, subCategory)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Supprimer"
                            disabled={subCategory.productCount > 0}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Edit Subcategory Form */}
                    {editingSubCategory && editingSubCategory.categoryId === category.id && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-3">
                        <h4 className="font-medium text-green-900 mb-3">Modifier la sous-catégorie</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={newSubCategory.name}
                              onChange={(e) => setNewSubCategory(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={newSubCategory.description}
                              onChange={(e) => setNewSubCategory(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setEditingSubCategory(null)}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateSubCategory(editingSubCategory.categoryId, editingSubCategory.subCategoryId)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Add Subcategory Button */}
                    {showAddSubCategory === category.id ? (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3">
                        <h4 className="font-medium text-gray-900 mb-3">Ajouter une sous-catégorie</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={newSubCategory.name}
                              onChange={(e) => setNewSubCategory(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nom de la sous-catégorie"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={newSubCategory.description}
                              onChange={(e) => setNewSubCategory(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Description courte"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddSubCategory(null);
                              setNewSubCategory({ name: '', description: '' });
                            }}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddSubCategory(category.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={!newSubCategory.name.trim()}
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSubCategory(category.id)}
                        className="flex items-center mt-3 text-blue-600 hover:text-blue-800"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter une sous-catégorie
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Ajouter une catégorie</h2>
              <button
                onClick={() => setShowAddCategory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la catégorie *</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Équipement de Chimie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description courte de la catégorie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icône</label>
                  <input
                    type="text"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="🔬"
                  />
                  <p className="text-xs text-gray-500 mt-1">Utilisez un emoji comme icône</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.name.trim()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Créer la catégorie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning for Categories with Products */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Attention</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Les catégories et sous-catégories contenant des produits ne peuvent pas être supprimées.
              Vous devez d'abord déplacer ou supprimer tous les produits associés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;