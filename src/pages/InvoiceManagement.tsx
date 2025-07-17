import React, { useState } from 'react';
import { 
  FileText, Search, Filter, Download, Printer, 
  ChevronDown, Eye, Edit, Trash2, Calendar, ArrowRight,
  CheckCircle, Clock, XCircle, Settings, Plus
} from 'lucide-react';

import { Package } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  orderId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
}

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);

  // Données simulées
  const invoices: Invoice[] = [
    {
      id: 'inv-001',
      number: 'INV-2024-001',
      date: '2024-01-20T10:30:00Z',
      dueDate: '2024-02-20T10:30:00Z',
      customer: {
        id: 1,
        name: 'Lycée Technique de Bamako',
        email: 'contact@lyceetechnique.ml'
      },
      orderId: 'CMD-2024-001',
      amount: 936550,
      status: 'paid',
      items: [
        { id: 1, name: 'Bécher en Verre Borosilicate 50ml (x25)', quantity: 25, price: 8500 },
        { id: 2, name: 'Microscope Binoculaire 1000x', quantity: 2, price: 280000 }
      ]
    },
    {
      id: 'inv-002',
      number: 'INV-2024-002',
      date: '2024-01-18T14:45:00Z',
      dueDate: '2024-02-18T14:45:00Z',
      customer: {
        id: 2,
        name: 'Université de Ouagadougou',
        email: 'labo@univ-ouaga.bf'
      },
      orderId: 'CMD-2024-002',
      amount: 406600,
      status: 'pending',
      items: [
        { id: 3, name: 'Armoire de Sécurité', quantity: 1, price: 320000 }
      ],
      notes: 'Paiement attendu par virement bancaire'
    },
    {
      id: 'inv-003',
      number: 'INV-2024-003',
      date: '2024-01-15T09:15:00Z',
      dueDate: '2024-02-15T09:15:00Z',
      customer: {
        id: 3,
        name: 'Institut Polytechnique Abidjan',
        email: 'commandes@ipa.ci'
      },
      orderId: 'CMD-2024-003',
      amount: 696050,
      status: 'paid',
      items: [
        { id: 4, name: 'Oscilloscope Numérique 2 Voies (x3)', quantity: 3, price: 195000 }
      ]
    },
    {
      id: 'inv-004',
      number: 'INV-2024-004',
      date: '2024-01-12T16:20:00Z',
      dueDate: '2024-01-27T16:20:00Z',
      customer: {
        id: 4,
        name: 'Dr. Fatoumata Sidibé',
        email: 'f.sidibe@gmail.com'
      },
      orderId: 'CMD-2024-004',
      amount: 185000,
      status: 'overdue',
      items: [
        { id: 5, name: 'Paillasse de Laboratoire 2m', quantity: 1, price: 185000 }
      ],
      notes: 'Relance effectuée le 28/01/2024'
    },
    {
      id: 'inv-005',
      number: 'INV-2024-005',
      date: '2024-01-10T11:30:00Z',
      dueDate: '2024-01-25T11:30:00Z',
      customer: {
        id: 5,
        name: 'Collège Moderne de Niamey',
        email: 'direction@college-niamey.ne'
      },
      orderId: 'CMD-2024-005',
      amount: 95000,
      status: 'cancelled',
      items: [
        { id: 6, name: 'Tabouret de Laboratoire Réglable', quantity: 2, price: 45000 }
      ],
      notes: 'Commande annulée par le client'
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

  const statuses = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'paid', name: 'Payée' },
    { id: 'pending', name: 'En attente' },
    { id: 'overdue', name: 'En retard' },
    { id: 'cancelled', name: 'Annulée' }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    
    // Pour la période, on simplifierait normalement avec une vraie logique de filtrage par date
    // Ici on retourne simplement true pour la démo
    const matchesPeriod = true;
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'pending': return 'En attente';
      case 'overdue': return 'En retard';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    alert(`Téléchargement de la facture ${invoiceNumber} en cours...`);
  };

  const totalPaid = filteredInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = filteredInvoices
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = filteredInvoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const renderInvoicesList = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Factures</p>
              <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payées</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Retard</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
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
                placeholder="Rechercher factures..."
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
              onClick={() => setShowTemplateSettings(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Modèle
            </button>
            <button
              onClick={() => alert('Création de facture manuelle')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle facture
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les clients</option>
                  <option value="1">Lycée Technique de Bamako</option>
                  <option value="2">Université de Ouagadougou</option>
                  <option value="3">Institut Polytechnique Abidjan</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {invoice.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.customer.name}</div>
                    <div className="text-sm text-gray-500">{invoice.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1">{getStatusLabel(invoice.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(invoice.number)}
                        className="text-green-600 hover:text-green-900"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-900"
                        title="Imprimer"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Settings Modal */}
      {showTemplateSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Paramètres du modèle de facture</h2>
              <button
                onClick={() => setShowTemplateSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de l'entreprise
                  </label>
                  <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-gray-400">Logo</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Changer le logo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informations de l'entreprise
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="Sciences Labs
Équipements Scientifiques Éducatifs
Bamako, Mali
+223 XX XX XX XX
contact@scienceslabs.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pied de page
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="Merci pour votre confiance. Pour toute question concernant cette facture, veuillez nous contacter à contact@scienceslabs.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#2563eb"
                      className="w-10 h-10 rounded border-0"
                    />
                    <input
                      type="text"
                      defaultValue="#2563eb"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conditions de paiement par défaut
                  </label>
                  <input
                    type="text"
                    defaultValue="Paiement à 30 jours"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => setShowTemplateSettings(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  alert('Modèle de facture mis à jour');
                  setShowTemplateSettings(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInvoiceDetails = () => {
    if (!selectedInvoice) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowInvoiceDetails(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
              Retour
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Facture {selectedInvoice.number}</h2>
              <p className="text-gray-600">
                Émise le {new Date(selectedInvoice.date).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDownloadInvoice(selectedInvoice.number)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger
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

        {/* Invoice Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Sciences Labs</div>
              <div className="text-gray-600">Équipements Scientifiques Éducatifs</div>
              <div className="text-gray-600">Bamako, Mali</div>
              <div className="text-gray-600">+223 XX XX XX XX</div>
              <div className="text-gray-600">contact@scienceslabs.com</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">FACTURE</div>
              <div className="text-xl font-semibold text-gray-900 mb-1">{selectedInvoice.number}</div>
              <div className="text-gray-600">
                Date: {new Date(selectedInvoice.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="text-gray-600">
                Échéance: {new Date(selectedInvoice.dueDate).toLocaleDateString('fr-FR')}
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                  {getStatusIcon(selectedInvoice.status)}
                  <span className="ml-1">{getStatusLabel(selectedInvoice.status)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <div className="text-sm font-medium text-gray-500 mb-2">FACTURER À</div>
            <div className="text-lg font-semibold text-gray-900">{selectedInvoice.customer.name}</div>
            <div className="text-gray-600">{selectedInvoice.customer.email}</div>
            <div className="text-gray-600 mt-1">Commande: {selectedInvoice.orderId}</div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedInvoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.price)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Sous-total:</span>
                <span className="font-medium">{formatCurrency(selectedInvoice.amount / 1.18)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">TVA (18%):</span>
                <span className="font-medium">{formatCurrency(selectedInvoice.amount - (selectedInvoice.amount / 1.18))}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                <span>Total:</span>
                <span>{formatCurrency(selectedInvoice.amount)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {selectedInvoice.notes && (
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-500 mb-2">NOTES</div>
              <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {selectedInvoice.notes}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
            <p>Merci pour votre confiance. Pour toute question concernant cette facture,</p>
            <p>veuillez nous contacter à contact@scienceslabs.com</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </button>
            {selectedInvoice.status === 'pending' && (
              <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <Clock className="w-4 h-4 mr-2" />
                Envoyer un rappel
              </button>
            )}
            {selectedInvoice.status === 'pending' && (
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <XCircle className="w-4 h-4 mr-2" />
                Annuler
              </button>
            )}
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Factures</h1>
          <p className="text-gray-600">Créez, gérez et suivez toutes vos factures</p>
        </div>
      </div>

      {showInvoiceDetails ? renderInvoiceDetails() : renderInvoicesList()}
    </div>
  );
};

export default InvoiceManagement;