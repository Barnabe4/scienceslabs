import React, { useState } from 'react';
import { 
  Zap, Brain, Target, Users, Globe, Smartphone, Mail, 
  MessageSquare, Play, Pause, Settings, Eye, Edit, Trash2,
  Plus, Download, Upload, Calendar, DollarSign, TrendingUp,
  Bot, Sparkles, CheckCircle, AlertTriangle, ArrowRight,
  Facebook, Instagram, Linkedin, Twitter, Youtube
} from 'lucide-react';

interface AIAutomation {
  id: string;
  name: string;
  type: 'lead_nurturing' | 'retargeting' | 'lookalike' | 'conversion_optimization';
  platform: 'facebook' | 'google' | 'instagram' | 'linkedin' | 'email';
  status: 'active' | 'paused' | 'learning' | 'draft';
  triggers: string[];
  actions: string[];
  performance: {
    triggered: number;
    completed: number;
    conversionRate: number;
    revenue: number;
  };
  aiConfig: {
    learningMode: boolean;
    optimizationGoal: string;
    audienceExpansion: boolean;
    budgetOptimization: boolean;
  };
}

const AIMarketingCampaigns = () => {
  const [activeTab, setActiveTab] = useState('automations');
  const [showCreateAutomation, setShowCreateAutomation] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('facebook');

  const [automations, setAutomations] = useState<AIAutomation[]>([
    {
      id: '1',
      name: 'Séquence de Nurturing IA - Prospects Chimie',
      type: 'lead_nurturing',
      platform: 'email',
      status: 'active',
      triggers: ['Téléchargement catalogue', 'Visite page produit', 'Abandon panier'],
      actions: ['Email personnalisé', 'Retargeting Facebook', 'SMS de relance'],
      performance: {
        triggered: 245,
        completed: 189,
        conversionRate: 12.8,
        revenue: 1850000
      },
      aiConfig: {
        learningMode: true,
        optimizationGoal: 'conversions',
        audienceExpansion: true,
        budgetOptimization: true
      }
    },
    {
      id: '2',
      name: 'Retargeting Intelligent - Visiteurs 7j',
      type: 'retargeting',
      platform: 'facebook',
      status: 'active',
      triggers: ['Visite site', 'Temps sur page >2min', 'Pages vues >3'],
      actions: ['Publicité Facebook', 'Audience personnalisée', 'Enchères automatiques'],
      performance: {
        triggered: 1250,
        completed: 890,
        conversionRate: 8.5,
        revenue: 2340000
      },
      aiConfig: {
        learningMode: false,
        optimizationGoal: 'roas',
        audienceExpansion: true,
        budgetOptimization: true
      }
    },
    {
      id: '3',
      name: 'Lookalike IA - Meilleurs Clients',
      type: 'lookalike',
      platform: 'facebook',
      status: 'learning',
      triggers: ['Profil client similaire', 'Comportement d\'achat', 'Données démographiques'],
      actions: ['Création audience lookalike', 'Campagne automatique', 'Optimisation continue'],
      performance: {
        triggered: 450,
        completed: 234,
        conversionRate: 15.2,
        revenue: 3200000
      },
      aiConfig: {
        learningMode: true,
        optimizationGoal: 'quality',
        audienceExpansion: false,
        budgetOptimization: true
      }
    }
  ]);

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
    { id: 'google', name: 'Google Ads', icon: Globe, color: 'bg-green-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-purple-600' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'bg-orange-600' }
  ];

  const automationTypes = [
    {
      id: 'lead_nurturing',
      name: 'Nurturing de Leads',
      description: 'Séquences automatisées pour convertir les prospects',
      icon: Users,
      features: ['Emails personnalisés', 'Scoring automatique', 'Relances intelligentes']
    },
    {
      id: 'retargeting',
      name: 'Retargeting Intelligent',
      description: 'Relance automatique des visiteurs avec IA prédictive',
      icon: Target,
      features: ['Audiences dynamiques', 'Timing optimal', 'Enchères automatiques']
    },
    {
      id: 'lookalike',
      name: 'Audiences Lookalike',
      description: 'Création automatique d\'audiences similaires',
      icon: Brain,
      features: ['Analyse comportementale', 'Expansion intelligente', 'Optimisation continue']
    },
    {
      id: 'conversion_optimization',
      name: 'Optimisation Conversions',
      description: 'Maximisation automatique des conversions',
      icon: TrendingUp,
      features: ['Enchères IA', 'Tests A/B auto', 'Optimisation budget']
    }
  ];

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

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    if (!platformData) return Globe;
    return platformData.icon;
  };

  const renderAutomations = () => (
    <div className="space-y-6">
      {/* AI Automation Builder */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              Constructeur d'Automatisations IA
            </h2>
            <p className="text-purple-100">Créez des séquences marketing automatisées avec l'intelligence artificielle</p>
          </div>
          <button
            onClick={() => setShowCreateAutomation(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center"
          >
            <Zap className="w-5 h-5 mr-2" />
            Créer Automatisation
          </button>
        </div>
      </div>

      {/* Automation Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {automationTypes.map(type => {
          const Icon = type.icon;
          return (
            <div key={type.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{type.description}</p>
              <ul className="space-y-1 mb-4">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-700">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Utiliser ce template
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Automations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Automatisations IA Actives
          </h3>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {automations.map(automation => {
            const PlatformIcon = getPlatformIcon(automation.platform);
            return (
              <div key={automation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Brain className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{automation.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <PlatformIcon className="w-4 h-4 mr-1" />
                        {automation.platform} • {automation.type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(automation.status)}`}>
                      {automation.status}
                    </span>
                    {automation.aiConfig.learningMode && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        IA Learning
                      </span>
                    )}
                  </div>
                </div>

                {/* Triggers and Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Déclencheurs:</h5>
                    <div className="space-y-1">
                      {automation.triggers.map((trigger, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-500" />
                          {trigger}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Actions IA:</h5>
                    <div className="space-y-1">
                      {automation.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <Zap className="w-3 h-3 mr-2 text-purple-500" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Déclenchements</div>
                    <div className="font-semibold text-blue-600">{automation.performance.triggered}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Complétés</div>
                    <div className="font-semibold text-green-600">{automation.performance.completed}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Taux Conversion</div>
                    <div className="font-semibold text-purple-600">{automation.performance.conversionRate}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Revenus Générés</div>
                    <div className="font-semibold text-orange-600">{formatCurrency(automation.performance.revenue)}</div>
                  </div>
                </div>

                {/* AI Configuration */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Brain className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Configuration IA</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${automation.aiConfig.learningMode ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Mode apprentissage
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${automation.aiConfig.audienceExpansion ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Expansion audience
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${automation.aiConfig.budgetOptimization ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Optimisation budget
                    </div>
                    <div className="text-purple-700">
                      Objectif: {automation.aiConfig.optimizationGoal}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Dernière optimisation IA: il y a 2 heures
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center">
                      <Brain className="w-3 h-3 mr-1" />
                      Optimiser
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPlatformIntegrations = () => (
    <div className="space-y-6">
      {/* Platform Status */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Intégrations Plateformes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map(platform => {
            const Icon = platform.icon;
            const isConnected = ['facebook', 'email'].includes(platform.id);
            return (
              <div key={platform.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                      <p className="text-sm text-gray-600">API Marketing</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                
                {isConnected ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Statut:</span>
                      <span className="text-green-600 font-medium">Connecté</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Campagnes actives:</span>
                      <span className="font-medium">2</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Gérer la connexion
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Statut:</span>
                      <span className="text-red-600 font-medium">Non connecté</span>
                    </div>
                    <button className={`w-full ${platform.color} text-white py-2 rounded-lg hover:opacity-90 transition-opacity text-sm`}>
                      Connecter {platform.name}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Facebook Pixel Setup */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Facebook className="w-5 h-5 mr-2 text-blue-600" />
          Configuration Facebook Pixel
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">Pixel installé et fonctionnel</span>
          </div>
          <p className="text-blue-800 text-sm mt-1">ID Pixel: 1234567890123456</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Événements Trackés</h4>
            <div className="space-y-2">
              {[
                { event: 'PageView', status: 'active', count: '2,450' },
                { event: 'ViewContent', status: 'active', count: '890' },
                { event: 'AddToCart', status: 'active', count: '234' },
                { event: 'Purchase', status: 'active', count: '45' },
                { event: 'Lead', status: 'active', count: '123' }
              ].map((event, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">{event.event}</span>
                  </div>
                  <span className="text-sm text-gray-600">{event.count} derniers 7j</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Audiences Personnalisées</h4>
            <div className="space-y-2">
              {[
                { name: 'Visiteurs Site 30j', size: '3,450', status: 'ready' },
                { name: 'Acheteurs 90j', size: '890', status: 'ready' },
                { name: 'Abandons Panier', size: '234', status: 'updating' },
                { name: 'Lookalike Acheteurs', size: '125,000', status: 'ready' }
              ].map((audience, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">{audience.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{audience.size}</span>
                    <div className={`w-2 h-2 rounded-full ${audience.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration API</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook App ID
            </label>
            <input
              type="text"
              value="1234567890123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook App Secret
            </label>
            <input
              type="password"
              value="••••••••••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Ads Customer ID
            </label>
            <input
              type="text"
              placeholder="123-456-7890"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Campaign Manager
            </label>
            <input
              type="text"
              placeholder="Non configuré"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sauvegarder Configuration
          </button>
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
            <Zap className="w-8 h-8 mr-3 text-purple-600" />
            Campagnes IA Automatisées
          </h1>
          <p className="text-gray-600">Automatisation intelligente de vos campagnes marketing</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'automations', name: 'Automatisations IA', icon: Brain },
              { id: 'platforms', name: 'Intégrations', icon: Globe }
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
          {activeTab === 'automations' && renderAutomations()}
          {activeTab === 'platforms' && renderPlatformIntegrations()}
        </div>
      </div>

      {/* Create Automation Modal */}
      {showCreateAutomation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Bot className="w-6 h-6 mr-2 text-purple-600" />
                Créer une Automatisation IA
              </h2>
              <button
                onClick={() => setShowCreateAutomation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">1. Choisir le Type d'Automatisation</h3>
                  <div className="space-y-3">
                    {automationTypes.map(type => {
                      const Icon = type.icon;
                      return (
                        <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                          <div className="flex items-center mb-2">
                            <Icon className="w-5 h-5 text-purple-600 mr-2" />
                            <span className="font-medium">{type.name}</span>
                          </div>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">2. Sélectionner la Plateforme</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map(platform => {
                      const Icon = platform.icon;
                      return (
                        <button
                          key={platform.id}
                          onClick={() => setSelectedPlatform(platform.id)}
                          className={`p-4 border rounded-lg transition-colors ${
                            selectedPlatform === platform.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${
                            selectedPlatform === platform.id ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                          <div className="text-sm font-medium">{platform.name}</div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">3. Configuration IA</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                        <span className="ml-2 text-sm">Mode apprentissage automatique</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                        <span className="ml-2 text-sm">Optimisation budget automatique</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                        <span className="ml-2 text-sm">Expansion audience intelligente</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowCreateAutomation(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Créer l'Automatisation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMarketingCampaigns;