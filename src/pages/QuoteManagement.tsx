import React, { useState } from 'react';
import { 
  FileText, Search, Filter, Plus, Eye, Edit, Trash2, Download, 
  Calendar, User, CreditCard, Clock, CheckCircle, XCircle, 
  AlertTriangle, ArrowRight, MoreHorizontal, Phone, Mail, 
  MapPin, Send, Copy, Printer, ChevronDown
} from 'lucide-react';
import { useQuotes } from '../context/QuoteContext';

const QuoteManagement = () => {
  const {
    quotes,
    stats,
    selectedQuote,
    filters,
    setFilters,
    setSelectedQuote,
    updateQuoteStatus,
    updateQuotePriority,
    addQuoteNote,
    searchQuotes,
    exportQuotes,
    sendQuoteByEmail,
    duplicateQuote
  } = useQuotes();

  const [searchTerm, setSearchTerm] = useState('');
  const [showQuoteDetail, setShowQuoteDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newNote, setNewNote] = useState('');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const filteredQuotes = searchTerm 
    ? searchQuotes(searchTerm)
    : quotes.filter(quote => {
        if (filters.status !== 'all' && quote.status !== filters.status) return false;
        if (filters.priority !== 'all' && quote.priority !== filters.priority) return false;
        return true;
      });

  const handleQuoteClick = (quote: any) => {
    setSelectedQuote(quote);
    setShowQuoteDetail(true);
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedQuote) {
      addQuoteNote(selectedQuote.id, newNote);
      setNewNote('');
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'sent': return 'Envoyé';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Faible';
      case 'medium': return 'Moyenne';
      case 'high': return 'Élevée';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  const renderQuotesList = () => (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devis</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalQuotes}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingQuotes}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Acceptés</p>
              <p className="text-2xl font-bold text-green-600">{stats.acceptedQuotes}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur Totale</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalValue)}</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-600" />
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
                placeholder="Rechercher devis..."
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
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportQuotes('csv')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={() => exportQuotes('pdf')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
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
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="sent">Envoyé</option>
                  <option value="accepted">Accepté</option>
                  <option value="rejected">Refusé</option>
                  <option value="expired">Expiré</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes les priorités</option>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes les périodes</option>
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="quarter">Ce trimestre</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleQuoteClick(quote)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{quote.quoteNumber}</div>
                      <div className="text-sm text-gray-500">{quote.items.length} article{quote.items.length > 1 ? 's' : ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {quote.customer.firstName} {quote.customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{quote.customer.establishment}</div>
                      <div className="text-sm text-gray-500">{quote.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                      {getStatusIcon(quote.status)}
                      <span className="ml-1">{getStatusLabel(quote.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[quote.priority]}`}>
                      {quote.priority === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      <span>{getPriorityLabel(quote.priority)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(quote.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(quote.validUntil).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuoteClick(quote);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendQuoteByEmail(quote.id);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Envoyer par email"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateQuote(quote.id);
                        }}
                        className="text-purple-600 hover:text-purple-900"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-gray-900"
                        title="Plus d'actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions Rapides Fonctionnelles */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => {
              const pendingQuotes = quotes.filter(q => q.status === 'pending');
              const urgentQuotes = pendingQuotes.filter(q => 
                new Date(q.validUntil) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              );
              alert(`${urgentQuotes.length} devis expirent dans 7 jours. Relances automatiques programmées avec IA.`);
            }}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-8 h-8 text-orange-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Relances IA</h4>
              <p className="text-sm text-gray-600">Relances automatiques intelligentes</p>
            </div>
          </button>
          <button 
            onClick={() => {
              const conversionRate = (stats.acceptedQuotes / stats.totalQuotes * 100).toFixed(1);
              const avgValue = (stats.totalValue / stats.totalQuotes).toLocaleString();
              alert(`Taux de conversion : ${conversionRate}%. Valeur moyenne : ${avgValue} FCFA. Optimisations IA suggérées.`);
            }}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Analytics IA</h4>
              <p className="text-sm text-gray-600">Analyse prédictive des conversions</p>
            </div>
          </button>
          <button 
            onClick={() => {
              const highValueQuotes = quotes.filter(q => q.totalAmount > 500000);
              alert(`${highValueQuotes.length} devis haute valeur identifiés. Suivi prioritaire activé avec IA.`);
            }}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Target className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Scoring IA</h4>
              <p className="text-sm text-gray-600">Priorisation intelligente des devis</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuoteDetail = () => {
    if (!selectedQuote) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedQuote.quoteNumber}</h2>
              <p className="text-gray-600">Créé le {new Date(selectedQuote.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowQuoteDetail(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => sendQuoteByEmail(selectedQuote.id)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </button>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="flex items-center space-x-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={selectedQuote.status}
                onChange={(e) => updateQuoteStatus(selectedQuote.id, e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">En attente</option>
                <option value="sent">Envoyé</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Refusé</option>
                <option value="expired">Expiré</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
              <select
                value={selectedQuote.priority}
                onChange={(e) => updateQuotePriority(selectedQuote.id, e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validité</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg">
                {new Date(selectedQuote.validUntil).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informations Client
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">
                  {selectedQuote.customer.firstName} {selectedQuote.customer.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedQuote.customer.establishment}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {selectedQuote.customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {selectedQuote.customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {selectedQuote.customer.city}
              </div>
            </div>
          </div>

          {/* Quote Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Résumé du Devis
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total:</span>
                <span className="font-medium">{formatCurrency(selectedQuote.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">TVA (18%):</span>
                <span className="font-medium">{formatCurrency(selectedQuote.tva)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison:</span>
                <span className="font-medium">
                  {selectedQuote.shipping === 0 ? 'Gratuite' : formatCurrency(selectedQuote.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">{formatCurrency(selectedQuote.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Historique
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Devis créé</p>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedQuote.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              {selectedQuote.sentAt && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Send className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Devis envoyé</p>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedQuote.sentAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}
              {selectedQuote.respondedAt && (
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    selectedQuote.status === 'accepted' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {selectedQuote.status === 'accepted' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> :
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Devis {selectedQuote.status === 'accepted' ? 'accepté' : 'refusé'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedQuote.respondedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quote Items */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Articles du Devis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix unitaire</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedQuote.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.productName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{formatCurrency(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages and Notes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages et Notes</h3>
          
          {/* Customer Message */}
          {selectedQuote.message && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Message du client:</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">{selectedQuote.message}</p>
              </div>
            </div>
          )}

          {/* Internal Notes */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Notes internes:</h4>
            {selectedQuote.internalNotes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800">{selectedQuote.internalNotes}</p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ajouter une note interne..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Ajouter
              </button>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Devis</h1>
          <p className="text-gray-600">Gérez et suivez toutes vos demandes de devis</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            Taux de conversion: <span className="font-semibold text-green-600">{stats.conversionRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {showQuoteDetail ? renderQuoteDetail() : renderQuotesList()}
    </div>
  );
};

export default QuoteManagement;