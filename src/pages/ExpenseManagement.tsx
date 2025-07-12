import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Filter, Download, FileText, Printer, 
  ChevronDown, Eye, Plus, Trash2, Edit, Calendar, ArrowRight,
  Building, Users, Truck, TrendingUp, Upload
} from 'lucide-react';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  receipt?: string;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy?: string;
  notes?: string;
}

const ExpenseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);

  // Données simulées
  const expenses: Expense[] = [
    {
      id: 'exp-001',
      date: '2024-01-20T10:30:00Z',
      category: 'electricity',
      description: 'Facture électricité janvier',
      amount: 85000,
      paymentMethod: 'bank_transfer',
      reference: 'EDM-2024-001',
      receipt: 'https://example.com/receipts/edm-001.pdf',
      status: 'approved',
      approvedBy: 'Directeur Général',
      notes: 'Paiement mensuel régulier'
    },
    {
      id: 'exp-002',
      date: '2024-01-18T14:45:00Z',
      category: 'store-rent',
      description: 'Loyer magasin janvier',
      amount: 150000,
      paymentMethod: 'bank_transfer',
      reference: 'RENT-2024-001',
      receipt: 'https://example.com/receipts/rent-001.pdf',
      status: 'approved',
      approvedBy: 'Directeur Général',
      notes: 'Paiement mensuel régulier'
    },
    {
      id: 'exp-003',
      date: '2024-01-15T09:15:00Z',
      category: 'secretary-salary',
      description: 'Salaire secrétaires janvier',
      amount: 200000,
      paymentMethod: 'bank_transfer',
      reference: 'SAL-2024-001',
      status: 'approved',
      approvedBy: 'Directeur Général'
    },
    {
      id: 'exp-004',
      date: '2024-01-12T16:20:00Z',
      category: 'director-salary',
      description: 'Salaire directeur janvier',
      amount: 300000,
      paymentMethod: 'bank_transfer',
      reference: 'SAL-2024-002',
      status: 'approved',
      approvedBy: 'Administrateur'
    },
    {
      id: 'exp-005',
      date: '2024-01-10T11:30:00Z',
      category: 'transport',
      description: 'Frais de livraison commandes',
      amount: 45000,
      paymentMethod: 'cash',
      receipt: 'https://example.com/receipts/transport-001.pdf',
      status: 'pending',
      notes: 'En attente de validation'
    }
  ];

  const periods = [
    { id: 'today', name: 'Aujourd\'hui' },
    { id: 'yesterday', name: 'Hier' },
    { id: 'last-7-days', name: '7 derniers jours' },
    { id: 'this-month', name: 'Ce mois' },
    { id: 'last-month', name: 'Mois dernier' },
    { id: 'this-year', name: 'Cette année' },
    { id: 'last-year', name: 'Année dernière' },
    { id: 'custom', name: 'Période personnalisée' }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'electricity', name: 'Électricité' },
    { id: 'store-rent', name: 'Frais du magasin' },
    { id: 'secretary-salary', name: 'Salaire secrétaires' },
    { id: 'director-salary', name: 'Salaire directeur' },
    { id: 'maintenance', name: 'Frais de maintenance' },
    { id: 'transport', name: 'Transport et livraison' },
    { id: 'marketing', name: 'Marketing et publicité' },
    { id: 'insurance', name: 'Assurances' },
    { id: 'taxes', name: 'Taxes et impôts' },
    { id: 'supplies', name: 'Fournitures bureau' },
    { id: 'training', name: 'Formation du personnel' }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    
    // Pour la période, on simplifierait normalement avec une vraie logique de filtrage par date
    // Ici on retourne simplement true pour la démo
    const matchesPeriod = true;
    
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electricity': return <TrendingUp className="w-4 h-4" />;
      case 'store-rent': return <Building className="w-4 h-4" />;
      case 'secretary-salary': return <Users className="w-4 h-4" />;
      case 'director-salary': return <Users className="w-4 h-4" />;
      case 'transport': return <Truck className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowExpenseDetails(true);
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      // Logique de suppression
      alert(`Dépense ${id} supprimée`);
    }
  };

  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = filteredExpenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);

  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'bank_transfer',
    reference: '',
    notes: '',
    hasReceipt: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewExpense(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setNewExpense(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewExpense(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout de dépense
    alert('Dépense ajoutée avec succès');
    setShowAddExpense(false);
    setNewExpense({
      category: '',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'bank_transfer',
      reference: '',
      notes: '',
      hasReceipt: false
    });
  };

  const renderExpensesList = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dépenses Totales</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{filteredExpenses.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
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
                placeholder="Rechercher dépenses..."
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
            <button
              onClick={() => setShowAddExpense(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une dépense
            </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {periods.map(period => (
                    <option key={period.id} value={period.id}>{period.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="approved">Approuvé</option>
                  <option value="pending">En attente</option>
                  <option value="rejected">Rejeté</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getCategoryIcon(expense.category)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getCategoryLabel(expense.category)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    -{formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewExpense(expense)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Ajouter une dépense</h2>
              <button
                onClick={() => setShowAddExpense(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={newExpense.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description de la dépense"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant (FCFA) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Méthode de paiement
                  </label>
                  <select
                    name="paymentMethod"
                    value={newExpense.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="bank_transfer">Virement bancaire</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="cash">Espèces</option>
                    <option value="credit_card">Carte bancaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Référence
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={newExpense.reference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Numéro de référence"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Justificatif
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasReceipt"
                      checked={newExpense.hasReceipt}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">J'ai un justificatif à joindre</span>
                  </div>
                  {newExpense.hasReceipt && (
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG ou JPG (MAX. 2MB)</p>
                          </div>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newExpense.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Notes ou commentaires additionnels"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderExpenseDetails = () => {
    if (!selectedExpense) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowExpenseDetails(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
              Retour
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Détails de la Dépense</h2>
              <p className="text-gray-600">{selectedExpense.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </button>
          </div>
        </div>

        {/* Expense Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de la Dépense</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium text-gray-900">{selectedExpense.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date(selectedExpense.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Catégorie:</span>
                <span className="font-medium text-gray-900">
                  {getCategoryLabel(selectedExpense.category)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Description:</span>
                <span className="font-medium text-gray-900">{selectedExpense.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Montant:</span>
                <span className="font-medium text-red-600">{formatCurrency(selectedExpense.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Méthode de paiement:</span>
                <span className="font-medium text-gray-900">
                  {selectedExpense.paymentMethod.replace('_', ' ')}
                </span>
              </div>
              {selectedExpense.reference && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-medium text-gray-900">{selectedExpense.reference}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedExpense.status)}`}>
                  {selectedExpense.status}
                </span>
              </div>
              {selectedExpense.approvedBy && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Approuvé par:</span>
                  <span className="font-medium text-gray-900">{selectedExpense.approvedBy}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Justificatif & Notes</h3>
            {selectedExpense.receipt ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Justificatif:</p>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Justificatif.pdf</p>
                        <p className="text-xs text-gray-500">Ajouté le {new Date(selectedExpense.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Justificatif:</p>
                <p className="text-gray-500 italic">Aucun justificatif fourni</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {selectedExpense.notes || 'Aucune note'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </button>
            {selectedExpense.receipt && (
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Télécharger le justificatif
              </button>
            )}
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
            {selectedExpense.status === 'pending' && (
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approuver
              </button>
            )}
            <button
              onClick={() => handleDeleteExpense(selectedExpense.id)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Dépenses</h1>
          <p className="text-gray-600">Suivi et gestion des dépenses de l'entreprise</p>
        </div>
      </div>

      {showExpenseDetails ? renderExpenseDetails() : renderExpensesList()}
    </div>
  );
};

export default ExpenseManagement;