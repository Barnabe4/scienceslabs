import React, { useState } from 'react';
import { 
  Brain, Zap, Target, TrendingUp, Users, Eye, MousePointer, 
  ShoppingCart, BarChart3, Settings, Play, Pause, RefreshCw,
  Calendar, DollarSign, Globe, Smartphone, Mail, MessageSquare,
  Bot, Sparkles, ArrowRight, CheckCircle, AlertTriangle,
  PieChart, LineChart, Activity, Filter, Download, Upload
} from 'lucide-react';

interface AICampaign {
  id: string;
  name: string;
  type: 'facebook' | 'google' | 'instagram' | 'linkedin' | 'email' | 'sms';
  status: 'draft' | 'learning' | 'active' | 'paused' | 'completed';
  aiMode: 'auto' | 'assisted' | 'manual';
  budget: number;
  spent: number;
  objective: 'awareness' | 'traffic' | 'leads' | 'conversions' | 'sales';
  audience: {
    size: number;
    demographics: string;
    interests: string[];
    lookalike: boolean;
  };
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    conversionRate: number;
    cpa: number;
    roas: number;
    leads: number;
  };
  aiInsights: {
    optimization: string;
    recommendations: string[];
    predictedPerformance: number;
    confidence: number;
  };
  createdAt: string;
  lastOptimized: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  campaign: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  tags: string[];
  lastActivity: string;
  interactions: number;
  value: number;
}

const AIMarketingDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  const [campaigns, setCampaigns] = useState<AICampaign[]>([
    {
      id: '1',
      name: 'Campagne IA - Équipements Chimie',
      type: 'facebook',
      status: 'active',
      aiMode: 'auto',
      budget: 500000,
      spent: 125000,
      objective: 'leads',
      audience: {
        size: 15000,
        demographics: 'Enseignants 25-55 ans, Mali/Burkina',
        interests: ['éducation', 'sciences', 'laboratoire'],
        lookalike: true
      },
      performance: {
        impressions: 45000,
        clicks: 1350,
        ctr: 3.0,
        conversions: 89,
        conversionRate: 6.6,
        cpa: 1404,
        roas: 4.2,
        leads: 89
      },
      aiInsights: {
        optimization: 'Performance excellente - Budget recommandé +20%',
        recommendations: [
          'Augmenter le budget de 20% pour maximiser les conversions',
          'Tester de nouvelles créatives vidéo',
          'Élargir l\'audience aux pays voisins'
        ],
        predictedPerformance: 85,
        confidence: 92
      },
      createdAt: '2024-01-15T10:00:00Z',
      lastOptimized: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'Retargeting IA - Visiteurs Site',
      type: 'facebook',
      status: 'learning',
      aiMode: 'auto',
      budget: 200000,
      spent: 45000,
      objective: 'conversions',
      audience: {
        size: 3500,
        demographics: 'Visiteurs site derniers 30 jours',
        interests: ['retargeting'],
        lookalike: false
      },
      performance: {
        impressions: 12000,
        clicks: 480,
        ctr: 4.0,
        conversions: 24,
        conversionRate: 5.0,
        cpa: 1875,
        roas: 3.8,
        leads: 24
      },
      aiInsights: {
        optimization: 'Phase d\'apprentissage - Optimisation en cours',
        recommendations: [
          'Laisser l\'IA apprendre pendant 3-5 jours',
          'Éviter les modifications manuelles',
          'Surveiller les métriques de conversion'
        ],
        predictedPerformance: 78,
        confidence: 67
      },
      createdAt: '2024-01-18T09:00:00Z',
      lastOptimized: '2024-01-20T16:45:00Z'
    }
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Dr. Amadou Traoré',
      email: 'a.traore@lyceetechnique.ml',
      phone: '+223 20 22 33 44',
      source: 'Facebook Ads',
      campaign: 'Campagne IA - Équipements Chimie',
      score: 85,
      status: 'qualified',
      tags: ['lycée', 'chimie', 'priorité'],
      lastActivity: '2024-01-20T15:30:00Z',
      interactions: 3,
      value: 450000
    },
    {
      id: '2',
      name: 'Marie Ouédraogo',
      email: 'm.ouedraogo@univ-ouaga.bf',
      phone: '+226 25 30 70 64',
      source: 'Facebook Ads',
      campaign: 'Campagne IA - Équipements Chimie',
      score: 92,
      status: 'new',
      tags: ['université', 'biologie'],
      lastActivity: '2024-01-20T11:15:00Z',
      interactions: 1,
      value: 0
    }
  ]);

  const aiStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(l => l.status === 'qualified').length,
    avgConversionRate: campaigns.reduce((sum, c) => sum + c.performance.conversionRate, 0) / campaigns.length,
    avgROAS: campaigns.reduce((sum, c) => sum + c.performance.roas, 0) / campaigns.length
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAIOptimization = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            lastOptimized: new Date().toISOString(),
            aiInsights: {
              ...campaign.aiInsights,
              optimization: 'Optimisation IA appliquée avec succès'
            }
          }
        : campaign
    ));
    alert('Optimisation IA appliquée avec succès !');
  };

  const generateAIRecommendations = () => {
    const recommendations = [
      'Augmenter le budget des campagnes performantes de 15-25%',
      'Créer une audience lookalike basée sur vos meilleurs clients',
      'Tester des créatives vidéo pour améliorer l\'engagement',
      'Lancer une campagne de retargeting pour les visiteurs récents',
      'Optimiser les heures de diffusion selon l\'activité de votre audience',
      'Créer des séquences d\'emails automatisées pour les leads'
    ];
    setAiRecommendations(recommendations);
    setShowAIAssistant(true);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* AI Assistant Button */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-8 h-8 mr-4" />
            <div>
              <h2 className="text-xl font-bold">Assistant IA Marketing</h2>
              <p className="text-purple-100">Optimisez vos campagnes avec l'intelligence artificielle</p>
            </div>
          </div>
          <button
            onClick={generateAIRecommendations}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Analyser avec l'IA
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
              <p className="text-2xl font-bold text-green-600">{aiStats.activeCampaigns}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">IA optimisée</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leads Générés</p>
              <p className="text-2xl font-bold text-blue-600">{aiStats.totalLeads}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">{aiStats.qualifiedLeads} qualifiés</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux Conversion</p>
              <p className="text-2xl font-bold text-purple-600">{aiStats.avgConversionRate.toFixed(1)}%</p>
            </div>
            <MousePointer className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Brain className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600">IA optimisé</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROAS Moyen</p>
              <p className="text-2xl font-bold text-orange-600">{aiStats.avgROAS.toFixed(1)}x</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Zap className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-sm text-orange-600">Performance IA</span>
          </div>
        </div>
      </div>

      {/* AI Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance des Campagnes IA
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Graphique de performance en temps réel</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Répartition des Sources de Leads
          </h3>
          <div className="space-y-4">
            {[
              { source: 'Facebook Ads IA', leads: 89, percentage: 65, color: 'bg-blue-500' },
              { source: 'Google Ads IA', leads: 34, percentage: 25, color: 'bg-green-500' },
              { source: 'LinkedIn IA', leads: 14, percentage: 10, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm text-gray-700">{item.source}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">{item.leads}</span>
                  <span className="text-xs text-gray-500">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Campagnes IA Actives
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Nouvelle Campagne IA
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campagne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut IA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROAS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.type} • {campaign.objective}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      <Bot className="w-3 h-3 mr-1" />
                      {campaign.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Confiance: {campaign.aiInsights.confidence}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>CTR: {campaign.performance.ctr}%</div>
                      <div>Conv: {campaign.performance.conversionRate}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{campaign.performance.leads}</div>
                    <div className="text-sm text-gray-500">CPA: {formatCurrency(campaign.performance.cpa)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-green-600">{campaign.performance.roas.toFixed(1)}x</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAIOptimization(campaign.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <Brain className="w-3 h-3 mr-1" />
                        Optimiser
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
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

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Campaign Creation Wizard */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Créateur de Campagne IA</h2>
            <p className="text-blue-100">L'IA analyse votre audience et crée automatiquement des campagnes optimisées</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Créer avec l'IA
          </button>
        </div>
      </div>

      {/* Campaign Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Génération de Leads IA',
            description: 'Campagne automatisée pour capturer des prospects qualifiés',
            features: ['Audience IA', 'Créatives auto', 'Optimisation continue'],
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            title: 'Retargeting Intelligent',
            description: 'Relance automatique des visiteurs avec IA prédictive',
            features: ['Scoring IA', 'Timing optimal', 'Messages personnalisés'],
            icon: Target,
            color: 'bg-green-500'
          },
          {
            title: 'Conversion Maximizer',
            description: 'Optimisation IA pour maximiser les ventes',
            features: ['Enchères IA', 'Audiences lookalike', 'A/B test auto'],
            icon: ShoppingCart,
            color: 'bg-purple-500'
          }
        ].map((template, index) => {
          const Icon = template.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <ul className="space-y-1 mb-4">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Utiliser ce template
              </button>
            </div>
          );
        })}
      </div>

      {/* Detailed Campaign List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Toutes les Campagnes</h3>
        
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.type} • Mode {campaign.aiMode}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Budget / Dépensé</div>
                  <div className="font-semibold">{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Leads Générés</div>
                  <div className="font-semibold text-blue-600">{campaign.performance.leads}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Taux Conversion</div>
                  <div className="font-semibold text-green-600">{campaign.performance.conversionRate}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">ROAS</div>
                  <div className="font-semibold text-purple-600">{campaign.performance.roas}x</div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Brain className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-900">Insights IA</span>
                  <span className="ml-2 text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    {campaign.aiInsights.confidence}% confiance
                  </span>
                </div>
                <p className="text-purple-800 text-sm mb-2">{campaign.aiInsights.optimization}</p>
                <div className="space-y-1">
                  {campaign.aiInsights.recommendations.slice(0, 2).map((rec, idx) => (
                    <div key={idx} className="flex items-center text-xs text-purple-700">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Dernière optimisation: {new Date(campaign.lastOptimized).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAIOptimization(campaign.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Optimiser IA
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      {/* Lead Scoring AI */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Scoring IA des Leads</h2>
            <p className="text-green-100">L'IA analyse et score automatiquement vos prospects</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{leads.length}</div>
            <div className="text-green-100">Leads collectés</div>
          </div>
        </div>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nouveaux Leads</p>
              <p className="text-2xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Qualifiés IA</p>
              <p className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'qualified').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score Moyen</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur Potentielle</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(leads.reduce((sum, l) => sum + l.value, 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Base de Leads IA</h3>
            <div className="flex items-center space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Bot className="w-4 h-4 mr-2" />
                Relance Auto IA
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score IA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-xs text-gray-400">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-2 rounded-full mr-2 ${
                        lead.score >= 80 ? 'bg-green-500' :
                        lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.source}</div>
                    <div className="text-xs text-gray-500">{lead.campaign}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeadStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {lead.value > 0 ? formatCurrency(lead.value) : 'À estimer'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                        Relancer IA
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                        Qualifier
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* AI Analytics Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="w-6 h-6 mr-2" />
              Analytics IA Marketing
            </h2>
            <p className="text-gray-600">Analyses prédictives et insights automatisés</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Rapport IA
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prédictions IA</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Leads prochains 7j:</span>
              <span className="font-bold text-blue-600">+45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversions estimées:</span>
              <span className="font-bold text-green-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ROI prévu:</span>
              <span className="font-bold text-purple-600">4.8x</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimisations IA</h3>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Budget optimisé</span>
              </div>
              <p className="text-xs text-green-700 mt-1">+15% performance</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Audience élargie</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">+2,500 prospects</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes IA</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Budget bientôt épuisé</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">Campagne #1 - 85% utilisé</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Performance excellente</span>
              </div>
              <p className="text-xs text-green-700 mt-1">Retargeting - ROAS 6.2x</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Analyse Détaillée par Campagne</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campagne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.performance.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.performance.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.performance.ctr}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.performance.conversions}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(campaign.performance.cpa)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-16 h-2 rounded-full mr-2 ${
                        campaign.aiInsights.confidence >= 80 ? 'bg-green-500' :
                        campaign.aiInsights.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium">{campaign.aiInsights.confidence}%</span>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            Marketing IA & Campagnes
          </h1>
          <p className="text-gray-600">Intelligence artificielle pour l'automatisation marketing</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres IA
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            <Zap className="w-4 h-4 mr-2" />
            Campagne IA
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Dashboard IA', icon: BarChart3 },
              { id: 'campaigns', name: 'Campagnes', icon: Target },
              { id: 'leads', name: 'Leads & Prospects', icon: Users },
              { id: 'analytics', name: 'Analytics IA', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Bot className="w-6 h-6 mr-2 text-purple-600" />
                Assistant IA Marketing
              </h2>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-900">Recommandations IA</span>
                </div>
                <p className="text-purple-800 text-sm">
                  Basé sur l'analyse de vos données, voici mes recommandations pour optimiser vos campagnes:
                </p>
              </div>
              <div className="space-y-3">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowAIAssistant(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Appliquer les recommandations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMarketingDashboard;