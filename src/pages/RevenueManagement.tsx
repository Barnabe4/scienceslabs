import React, { useState } from 'react';
import { 
  DollarSign, Search, Filter, Download, FileText, Printer, 
  ChevronDown, Eye, ArrowUpRight, CheckCircle, Clock, XCircle,
  CreditCard, Smartphone, Building, Coins, Calendar, ArrowRight
} from 'lucide-react';

import { Package } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  orderId: string;
  amount: number;
  paymentMethod: 'mobile_money' | 'bank_transfer' | 'cash' | 'credit_card';
  provider?: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  reference?: string;
  invoiceNumber: string;
}

const RevenueManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  // Données simulées
  const transactions: Transaction[] = [
    {
      id: 'txn-001',
      date: '2024-01-20T10:30:00Z',
      customer: {
        id: 1,
        name: 'Lycée Technique de Bamako',
        email: 'contact@lyceetechnique.ml'
      },
      orderId: 'CMD-2024-001',
      amount: 936550,
      paymentMethod: 'bank_transfer',
      provider: 'ECOBANK',
      status: 'paid',
      reference: 'ECO-2024-001',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 'txn-002',
      date: '2024-01-18T14:45:00Z',
      customer: {
        id: 2,
        name: 'Université de Ouagadougou',
        email: 'labo@univ-ouaga.bf'
      },
      orderId: 'CMD-2024-002',
      amount: 406600,
      paymentMethod: 'mobile_money',
      provider: 'Orange Money',
      status: 'pending',
      reference: 'OM-2024-002',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: 'txn-003',
      date: '2024-01-15T09:15:00Z',
      customer: {
        id: 3,
        name: 'Institut Polytechnique Abidjan',
        email: 'commandes@ipa.ci'
      },
      orderId: 'CMD-2024-003',
      amount: 696050,
      paymentMethod: 'credit_card',
      provider: 'Visa',
      status: 'paid',
      reference: 'VISA-2024-003',
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: 'txn-004',
      date: '2024-01-12T16:20:00Z',
      customer: {
        id: 4,
        name: 'Dr. Fatoumata Sidibé',
        email: 'f.sidibe@gmail.com'
      },
      orderId: 'CMD-2024-004',
      amount: 185000,
      paymentMethod: 'mobile_money',
      provider: 'Orange Money',
      status: 'failed',
      reference: 'OM-2024-004',
      invoiceNumber: 'INV-2024-004'
    },
    {
      id: 'txn-005',
      date: '2024-01-10T11:30:00Z',
      customer: {
        id: 5,
        name: 'Collège Moderne de Niamey',
        email: 'direction@college-niamey.ne'
      },
      orderId: 'CMD-2024-005',
      amount: 95000,
      paymentMethod: 'cash',
      status: 'paid',
      invoiceNumber: 'INV-2024-005'
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

  const paymentMethods = [
    { id: 'all', name: 'Tous les moyens' },
    { id: 'mobile_money', name: 'Mobile Money' },
    { id: 'bank_transfer', name: 'Virement bancaire' },
    { id: 'cash', name: 'Espèces' },
    { id: 'credit_card', name: 'Carte bancaire' }
  ];

  const statuses = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'paid', name: 'Payé' },
    { id: 'pending', name: 'En attente' },
    { id: 'failed', name: 'Échoué' },
    { id: 'refunded', name: 'Remboursé' }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesPaymentMethod = selectedPaymentMethod === 'all' || transaction.paymentMethod === selectedPaymentMethod;
    
    // Pour la période, on simplifierait normalement avec une vraie logique de filtrage par date
    // Ici on retourne simplement true pour la démo
    const matchesPeriod = true;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesPeriod;
  });

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'mobile_money': return <Smartphone className="w-4 h-4" />;
      case 'bank_transfer': return <Building className="w-4 h-4" />;
      case 'cash': return <Coins className="w-4 h-4" />;
      case 'credit_card': return <CreditCard className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'mobile_money': return 'Mobile Money';
      case 'bank_transfer': return 'Virement bancaire';
      case 'cash': return 'Espèces';
      case 'credit_card': return 'Carte bancaire';
      default: return method;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded': return <ArrowUpRight className="w-4 h-4 text-purple-600" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'refunded': return 'Remboursé';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  const handleExportInvoice = (invoiceNumber: string) => {
    alert(`Téléchargement de la facture ${invoiceNumber} en cours...`);
  };

  const totalRevenue = filteredTransactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = filteredTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const renderTransactionsList = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
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
                placeholder="Rechercher transactions..."
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
              onClick={() => alert('Export CSV en cours...')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={() => alert('Export PDF en cours...')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moyen de paiement</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
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
            </div>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.customer.name}</div>
                    <div className="text-sm text-gray-500">{transaction.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {transaction.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPaymentMethodIcon(transaction.paymentMethod)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getPaymentMethodLabel(transaction.paymentMethod)}
                      </span>
                    </div>
                    {transaction.provider && (
                      <div className="text-xs text-gray-500 mt-1">{transaction.provider}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{getStatusLabel(transaction.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleExportInvoice(transaction.invoiceNumber)}
                        className="text-green-600 hover:text-green-900"
                        title="Télécharger facture"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTransactionDetails = () => {
    if (!selectedTransaction) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTransactionDetails(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
              Retour
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Détails de la Transaction</h2>
              <p className="text-gray-600">{selectedTransaction.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleExportInvoice(selectedTransaction.invoiceNumber)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger Facture
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de Transaction</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Transaction:</span>
                <span className="font-medium text-gray-900">{selectedTransaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date(selectedTransaction.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heure:</span>
                <span className="font-medium text-gray-900">
                  {new Date(selectedTransaction.date).toLocaleTimeString('fr-FR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Montant:</span>
                <span className="font-medium text-gray-900">{formatCurrency(selectedTransaction.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                  {getStatusIcon(selectedTransaction.status)}
                  <span className="ml-1">{getStatusLabel(selectedTransaction.status)}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Méthode de paiement:</span>
                <span className="font-medium text-gray-900">
                  {getPaymentMethodLabel(selectedTransaction.paymentMethod)}
                </span>
              </div>
              {selectedTransaction.provider && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Fournisseur:</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.provider}</span>
                </div>
              )}
              {selectedTransaction.reference && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.reference}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Client & Commande</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-medium text-gray-900">{selectedTransaction.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{selectedTransaction.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID Client:</span>
                <span className="font-medium text-gray-900">{selectedTransaction.customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commande:</span>
                <span className="font-medium text-blue-600">{selectedTransaction.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Facture:</span>
                <span className="font-medium text-gray-900">{selectedTransaction.invoiceNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              Voir la commande
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Télécharger la facture
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer le reçu
            </button>
            {selectedTransaction.status === 'pending' && (
              <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <Clock className="w-4 h-4 mr-2" />
                Relancer le paiement
              </button>
            )}
            {selectedTransaction.status === 'paid' && (
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Rembourser
              </button>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique</h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 w-px bg-gray-300 my-1"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Paiement reçu</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedTransaction.date).toLocaleDateString('fr-FR')} à {new Date(selectedTransaction.date).toLocaleTimeString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Paiement de {formatCurrency(selectedTransaction.amount)} reçu via {getPaymentMethodLabel(selectedTransaction.paymentMethod)}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 w-px bg-gray-300 my-1"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Facture générée</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedTransaction.date).toLocaleDateString('fr-FR')} à {new Date(selectedTransaction.date).toLocaleTimeString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Facture {selectedTransaction.invoiceNumber} générée automatiquement
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Commande créée</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedTransaction.date).toLocaleDateString('fr-FR')} à {new Date(selectedTransaction.date).toLocaleTimeString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Commande {selectedTransaction.orderId} créée par {selectedTransaction.customer.name}
                </p>
              </div>
            </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Revenus</h1>
          <p className="text-gray-600">Suivi des paiements et transactions</p>
        </div>
      </div>

      {showTransactionDetails ? renderTransactionDetails() : renderTransactionsList()}
    </div>
  );
};

export default RevenueManagement;