import React, { useState } from 'react';
import { 
  Megaphone, Plus, Search, Filter, Edit, Trash2, Eye, Play, 
  Pause, Square, Copy, BarChart3, Mail, MessageSquare, 
  Users, Target, Calendar, DollarSign, TrendingUp, TrendingDown,
  ChevronDown, MoreHorizontal, Download, Upload, Settings,
  Send, Image, Tag, Clock, CheckCircle, XCircle, AlertTriangle,
  Zap, Star, Heart, Share2, MousePointer, ShoppingCart
} from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';

const MarketingManagement = () => {
  const {
    campaigns,
    templates,
    segments,
    stats,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    launchCampaign,
    pauseCampaign,
    stopCampaign,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    addSegment,
    updateSegment,
    deleteSegment,
    calculateSegmentSize,
    getCampaignsByStatus,
    searchCampaigns
  } = useMarketing();

  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [showAddSegment, setShowAddSegment] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email' as const,
    status: 'draft' as const,
    objective: 'sales' as const,
    budget: 0,
    spent: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetAudience: {
      segments: [] as string[],
      demographics: {
        ageRange: '25-55',
        location: ['Mali'],
        interests: ['éducation']
      },
      size: 0
    },
    content: {
      subject: '',
      message: '',
      images: [] as string[],
      ctaText: '',
      ctaUrl: ''
    },
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      ctr: 0,
      conversionRate: 0,
      roas: 0
    },
    channels: ['email'] as string[],
    createdBy: 'Administrateur'
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'newsletter' as const,
    subject: '',
    content: '',
    isHtml: true,
    variables: [] as string[],
    thumbnail: '',
    isActive: true
  });

  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    criteria: {
      customerType: [] as string[],
      location: [] as string[],
      purchaseHistory: {
        minAmount: 0,
        maxAmount: 10000000,
        timeframe: 'all'
      },
      engagement: 'medium',
      lastActivity: '6_months'
    },
    isActive: true
  });

  const campaignTypes = [
    { id: 'all', name: 'Tous les types', icon: Megaphone },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'sms', name: 'SMS', icon: MessageSquare },
    { id: 'social', name: 'Réseaux sociaux', icon: Share2 },
    { id: 'display', name: 'Display', icon: Image },
    { id: 'print', name: 'Print', icon: Tag }
  ];

  const campaignStatuses = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'draft', name: 'Brouillon' },
    { id: 'scheduled', name: 'Programmée' },
    { id: 'running', name: 'En cours' },
    { id: 'paused', name: 'En pause' },
    { id: 'completed', name: 'Terminée' },
    { id: 'cancelled', name: 'Annulée' }
  ];

  const objectives = [
    { id: 'awareness', name: 'Notoriété', icon: Eye },
    { id: 'leads', name: 'Génération de leads', icon: Users },
    { id: 'sales', name: 'Ventes', icon: ShoppingCart },
    { id: 'retention', name: 'Fidélisation', icon: Heart },
    { id: 'engagement', name: 'Engagement', icon: MousePointer }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = searchTerm === '' || searchCampaigns(searchTerm).includes(campaign);
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    const matchesType = selectedType === 'all' || campaign.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCampaigns(
      selectedCampaigns.length === filteredCampaigns.length 
        ? [] 
        : filteredCampaigns.map(campaign => campaign.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      case 'display': return <Image className="w-4 h-4" />;
      case 'print': return <Tag className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleAddCampaign = () => {
    if (!newCampaign.name.trim()) {
      alert('Le nom de la campagne est requis');
      return;
    }

    addCampaign(newCampaign);
    setNewCampaign({
      name: '',
      type: 'email',
      status: 'draft',
      objective: 'sales',
      budget: 0,
      spent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      targetAudience: {
        segments: [],
        demographics: {
          ageRange: '25-55',
          location: ['Mali'],
          interests: ['éducation']
        },
        size: 0
      },
      content: {
        subject: '',
        message: '',
        images: [],
        ctaText: '',
        ctaUrl: ''
      },
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        ctr: 0,
        conversionRate: 0,
        roas: 0
      },
      channels: ['email'],
      createdBy: 'Administrateur'
    });
    setShowAddCampaign(false);
    alert('Campagne créée avec succès !');
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      alert('Le nom et le contenu du template sont requis');
      return;
    }

    addTemplate(newTemplate);
    setNewTemplate({
      name: '',
      category: 'newsletter',
      subject: '',
      content: '',
      isHtml: true,
      variables: [],
      thumbnail: '',
      isActive: true
    });
    setShowAddTemplate(false);
    alert('Template créé avec succès !');
  };

  const handleAddSegment = () => {
    if (!newSegment.name.trim()) {
      alert('Le nom du segment est requis');
      return;
    }

    addSegment(newSegment);
    setNewSegment({
      name: '',
      description: '',
      criteria: {
        customerType: [],
        location: [],
        purchaseHistory: {
          minAmount: 0,
          maxAmount: 10000000,
          timeframe: 'all'
        },
        engagement: 'medium',
        lastActivity: '6_months'
      },
      isActive: true
    });
    setShowAddSegment(false);
    alert('Segment créé avec succès !');
  };

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Total</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalBudget)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impressions</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalImpressions.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROAS Moyen</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalROAS.toFixed(1)}x</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
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
                placeholder="Rechercher campagnes..."
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
              onClick={() => setShowAddCampaign(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle campagne
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {campaignTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
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
                  {campaignStatuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objectif</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les objectifs</option>
                  {objectives.map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campagne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleCampaignSelect(campaign.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(campaign.startDate).toLocaleDateString('fr-FR')} - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-gray-400">Audience: {campaign.targetAudience.size.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(campaign.type)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{campaign.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1 capitalize">{campaign.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(campaign.budget)}</div>
                    <div className="text-xs text-gray-500">
                      Dépensé: {formatCurrency(campaign.spent)} ({Math.round((campaign.spent / campaign.budget) * 100)}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      CTR: {campaign.metrics.ctr.toFixed(1)}% | Conv: {campaign.metrics.conversionRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      ROAS: {campaign.metrics.roas.toFixed(1)}x | Rev: {formatCurrency(campaign.metrics.revenue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => alert(`Voir détails campagne ${campaign.name}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingItem(campaign.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() => launchCampaign(campaign.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Lancer"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      {campaign.status === 'running' && (
                        <button
                          onClick={() => pauseCampaign(campaign.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Mettre en pause"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => duplicateCampaign(campaign.id)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCampaign(campaign.id)}
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

      {/* Add Campaign Modal */}
      {showAddCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Nouvelle Campagne</h2>
              <button
                onClick={() => setShowAddCampaign(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la campagne *
                    </label>
                    <input
                      type="text"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Promotion Rentrée 2024"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={newCampaign.type}
                        onChange={(e) => setNewCampaign(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="social">Réseaux sociaux</option>
                        <option value="display">Display</option>
                        <option value="print">Print</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Objectif</label>
                      <select
                        value={newCampaign.objective}
                        onChange={(e) => setNewCampaign(prev => ({ ...prev, objective: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="awareness">Notoriété</option>
                        <option value="leads">Génération de leads</option>
                        <option value="sales">Ventes</option>
                        <option value="retention">Fidélisation</option>
                        <option value="engagement">Engagement</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                      <input
                        type="date"
                        value={newCampaign.startDate}
                        onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                      <input
                        type="date"
                        value={newCampaign.endDate}
                        onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (FCFA)</label>
                    <input
                      type="number"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sujet/Titre</label>
                    <input
                      type="text"
                      value={newCampaign.content.subject}
                      onChange={(e) => setNewCampaign(prev => ({ 
                        ...prev, 
                        content: { ...prev.content, subject: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sujet de votre campagne"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={newCampaign.content.message}
                      onChange={(e) => setNewCampaign(prev => ({ 
                        ...prev, 
                        content: { ...prev.content, message: e.target.value }
                      }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contenu de votre message..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
                      <input
                        type="text"
                        value={newCampaign.content.ctaText}
                        onChange={(e) => setNewCampaign(prev => ({ 
                          ...prev, 
                          content: { ...prev.content, ctaText: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: Découvrir l'offre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL du bouton</label>
                      <input
                        type="url"
                        value={newCampaign.content.ctaUrl}
                        onChange={(e) => setNewCampaign(prev => ({ 
                          ...prev, 
                          content: { ...prev.content, ctaUrl: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Segments cibles</label>
                    <div className="space-y-2">
                      {segments.map(segment => (
                        <label key={segment.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newCampaign.targetAudience.segments.includes(segment.id)}
                            onChange={(e) => {
                              const segments = e.target.checked
                                ? [...newCampaign.targetAudience.segments, segment.id]
                                : newCampaign.targetAudience.segments.filter(s => s !== segment.id);
                              setNewCampaign(prev => ({
                                ...prev,
                                targetAudience: { ...prev.targetAudience, segments }
                              }));
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {segment.name} ({segment.size.toLocaleString()})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => setShowAddCampaign(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCampaign}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer la campagne
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Templates Email</h2>
        <button
          onClick={() => setShowAddTemplate(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.category === 'newsletter' ? 'bg-blue-100 text-blue-800' :
                  template.category === 'promotion' ? 'bg-red-100 text-red-800' :
                  template.category === 'welcome' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Utilisé {template.usageCount} fois</span>
                <span>{template.variables.length} variables</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Aperçu template ${template.name}`)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Aperçu
                </button>
                <button
                  onClick={() => duplicateTemplate(template.id)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                  title="Dupliquer"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-red-600"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Segments d'Audience</h2>
        <button
          onClick={() => setShowAddSegment(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau segment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map(segment => (
          <div key={segment.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{segment.name}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingItem(segment.id)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteSegment(segment.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{segment.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Taille:</span>
                <span className="font-medium">{segment.size.toLocaleString()} contacts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Types de clients:</span>
                <span className="font-medium">{segment.criteria.customerType.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Localisation:</span>
                <span className="font-medium">{segment.criteria.location.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className={`font-medium ${
                  segment.criteria.engagement === 'high' ? 'text-green-600' :
                  segment.criteria.engagement === 'medium' ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>
                  {segment.criteria.engagement}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Analytics & Performance</h2>
      
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux de Conversion</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.averageConversionRate.toFixed(1)}%</div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2.3% vs mois dernier
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CTR Moyen</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.averageCTR.toFixed(1)}%</div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +1.8% vs mois dernier
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus Générés</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {formatCurrency(campaigns.reduce((sum, c) => sum + c.metrics.revenue, 0))}
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15.2% vs mois dernier
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campagnes les Plus Performantes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campagne</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROAS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenus</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns
                .filter(c => c.status === 'completed' || c.status === 'running')
                .sort((a, b) => b.metrics.roas - a.metrics.roas)
                .slice(0, 5)
                .map(campaign => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{campaign.metrics.roas.toFixed(1)}x</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(campaign.metrics.revenue)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{campaign.metrics.conversions}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{campaign.metrics.ctr.toFixed(1)}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing & Campagnes</h1>
          <p className="text-gray-600">Gérez vos campagnes marketing et analysez leurs performances</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'campaigns', name: 'Campagnes', icon: Megaphone },
              { id: 'templates', name: 'Templates', icon: Mail },
              { id: 'segments', name: 'Segments', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'segments' && renderSegments()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default MarketingManagement;