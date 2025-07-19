import React, { useState } from 'react';
import { 
  Users, Brain, Target, TrendingUp, Mail, Phone, MessageSquare,
  Eye, Edit, Trash2, Plus, Download, Upload, Filter, Search,
  Bot, Zap, CheckCircle, Clock, AlertTriangle, Star, ArrowRight,
  Calendar, DollarSign, Activity, Send, UserCheck, UserX
} from 'lucide-react';

interface AILead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  source: string;
  campaign: string;
  aiScore: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  tags: string[];
  interests: string[];
  behavior: {
    pageViews: number;
    timeOnSite: number;
    downloads: number;
    emailOpens: number;
    emailClicks: number;
  };
  aiInsights: {
    buyingIntent: number;
    bestContactTime: string;
    preferredChannel: string;
    nextAction: string;
    conversionProbability: number;
  };
  interactions: AIInteraction[];
  estimatedValue: number;
  lastActivity: string;
  createdAt: string;
}

interface AIInteraction {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'demo' | 'proposal';
  date: string;
  description: string;
  outcome: string;
  nextAction?: string;
}

interface AISequence {
  id: string;
  name: string;
  type: 'nurturing' | 'follow_up' | 'reactivation';
  triggers: string[];
  steps: AISequenceStep[];
  performance: {
    enrolled: number;
    completed: number;
    conversionRate: number;
  };
  isActive: boolean;
}

interface AISequenceStep {
  id: string;
  delay: number;
  type: 'email' | 'sms' | 'task' | 'call';
  content: string;
  conditions?: string[];
}

const AILeadManagement = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedScore, setSelectedScore] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AILead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);

  const [leads, setLeads] = useState<AILead[]>([
    {
      id: '1',
      name: 'Dr. Amadou Traoré',
      email: 'a.traore@lyceetechnique.ml',
      phone: '+223 20 22 33 44',
      company: 'Lycée Technique de Bamako',
      position: 'Directeur',
      source: 'Facebook Ads',
      campaign: 'Campagne IA - Équipements Chimie',
      aiScore: 92,
      status: 'qualified',
      tags: ['lycée', 'chimie', 'priorité', 'budget-confirmé'],
      interests: ['équipements chimie', 'formation', 'sécurité'],
      behavior: {
        pageViews: 15,
        timeOnSite: 1250,
        downloads: 3,
        emailOpens: 8,
        emailClicks: 5
      },
      aiInsights: {
        buyingIntent: 85,
        bestContactTime: '14h-16h',
        preferredChannel: 'email',
        nextAction: 'Envoyer devis personnalisé',
        conversionProbability: 78
      },
      interactions: [
        {
          id: '1',
          type: 'email',
          date: '2024-01-20T10:30:00Z',
          description: 'Email de bienvenue envoyé',
          outcome: 'Ouvert et cliqué',
          nextAction: 'Programmer appel de qualification'
        }
      ],
      estimatedValue: 450000,
      lastActivity: '2024-01-20T15:30:00Z',
      createdAt: '2024-01-18T09:00:00Z'
    },
    {
      id: '2',
      name: 'Marie Ouédraogo',
      email: 'm.ouedraogo@univ-ouaga.bf',
      phone: '+226 25 30 70 64',
      company: 'Université de Ouagadougou',
      position: 'Professeure',
      source: 'Google Ads',
      campaign: 'Recherche Microscopes',
      aiScore: 76,
      status: 'new',
      tags: ['université', 'biologie', 'recherche'],
      interests: ['microscopes', 'équipements SVT'],
      behavior: {
        pageViews: 8,
        timeOnSite: 890,
        downloads: 1,
        emailOpens: 3,
        emailClicks: 2
      },
      aiInsights: {
        buyingIntent: 65,
        bestContactTime: '09h-11h',
        preferredChannel: 'phone',
        nextAction: 'Appel de qualification',
        conversionProbability: 55
      },
      interactions: [],
      estimatedValue: 280000,
      lastActivity: '2024-01-20T11:15:00Z',
      createdAt: '2024-01-19T14:30:00Z'
    },
    {
      id: '3',
      name: 'Jean Kouassi',
      email: 'j.kouassi@ipa.ci',
      phone: '+225 21 35 42 18',
      company: 'Institut Polytechnique Abidjan',
      position: 'Responsable Achats',
      source: 'Site Web',
      campaign: 'Organique',
      aiScore: 58,
      status: 'contacted',
      tags: ['institut', 'physique', 'budget-limité'],
      interests: ['oscilloscopes', 'équipements physique'],
      behavior: {
        pageViews: 12,
        timeOnSite: 1450,
        downloads: 2,
        emailOpens: 5,
        emailClicks: 1
      },
      aiInsights: {
        buyingIntent: 45,
        bestContactTime: '15h-17h',
        preferredChannel: 'email',
        nextAction: 'Envoyer contenu éducatif',
        conversionProbability: 35
      },
      interactions: [
        {
          id: '2',
          type: 'email',
          date: '2024-01-19T16:00:00Z',
          description: 'Email de suivi envoyé',
          outcome: 'Ouvert mais pas de clic',
          nextAction: 'Relance avec offre spéciale'
        }
      ],
      estimatedValue: 195000,
      lastActivity: '2024-01-19T16:45:00Z',
      createdAt: '2024-01-17T11:20:00Z'
    }
  ]);

  const [sequences, setSequences] = useState<AISequence[]>([
    {
      id: '1',
      name: 'Séquence Nurturing IA - Nouveaux Leads',
      type: 'nurturing',
      triggers: ['Lead créé', 'Score IA > 50'],
      steps: [
        {
          id: '1',
          delay: 0,
          type: 'email',
          content: 'Email de bienvenue personnalisé',
          conditions: ['Premier contact']
        },
        {
          id: '2',
          delay: 2,
          type: 'email',
          content: 'Guide des équipements selon intérêts',
          conditions: ['Email précédent ouvert']
        },
        {
          id: '3',
          delay: 5,
          type: 'task',
          content: 'Appel de qualification par commercial',
          conditions: ['Score IA > 70']
        }
      ],
      performance: {
        enrolled: 89,
        completed: 67,
        conversionRate: 24.5
      },
      isActive: true
    },
    {
      id: '2',
      name: 'Réactivation IA - Leads Dormants',
      type: 'reactivation',
      triggers: ['Pas d\'activité 30j', 'Score IA en baisse'],
      steps: [
        {
          id: '1',
          delay: 0,
          type: 'email',
          content: 'Offre spéciale de réactivation',
        },
        {
          id: '2',
          delay: 7,
          type: 'sms',
          content: 'SMS de rappel avec lien direct',
        }
      ],
      performance: {
        enrolled: 45,
        completed: 23,
        conversionRate: 12.8
      },
      isActive: true
    }
  ]);

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    highScore: leads.filter(l => l.aiScore >= 80).length,
    totalValue: leads.reduce((sum, l) => sum + l.estimatedValue, 0),
    avgScore: Math.round(leads.reduce((sum, l) => sum + l.aiScore, 0) / leads.length),
    conversionRate: 15.2
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesScore = selectedScore === 'all' || 
                        (selectedScore === 'high' && lead.aiScore >= 80) ||
                        (selectedScore === 'medium' && lead.aiScore >= 50 && lead.aiScore < 80) ||
                        (selectedScore === 'low' && lead.aiScore < 50);
    return matchesSearch && matchesStatus && matchesScore;
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleLeadClick = (lead: AILead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  const renderLeads = () => (
    <div className="space-y-6">
      {/* AI Lead Scoring Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              Scoring IA des Leads
            </h2>
            <p className="text-blue-100">L'IA analyse et score automatiquement vos prospects en temps réel</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{leadStats.avgScore}</div>
            <div className="text-blue-100">Score moyen IA</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leadStats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score Élevé (80+)</p>
              <p className="text-2xl font-bold text-green-600">{leadStats.highScore}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Brain className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600">IA qualifiés</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur Pipeline</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(leadStats.totalValue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center">
            <ArrowRight className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600">Estimé IA</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux Conversion</p>
              <p className="text-2xl font-bold text-orange-600">{leadStats.conversionRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Zap className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-sm text-orange-600">Optimisé IA</span>
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
                placeholder="Rechercher leads..."
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
              Filtres IA
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              Analyse IA
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Relance Auto
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="new">Nouveau</option>
                  <option value="contacted">Contacté</option>
                  <option value="qualified">Qualifié</option>
                  <option value="proposal">Proposition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Score IA</label>
                <select
                  value={selectedScore}
                  onChange={(e) => setSelectedScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les scores</option>
                  <option value="high">Élevé (80+)</option>
                  <option value="medium">Moyen (50-79)</option>
                  <option value="low">Faible (&lt;50)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Toutes les sources</option>
                  <option value="facebook">Facebook Ads</option>
                  <option value="google">Google Ads</option>
                  <option value="organic">Organique</option>
                  <option value="referral">Référence</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intention d'achat</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Toutes les intentions</option>
                  <option value="high">Élevée (70+)</option>
                  <option value="medium">Moyenne (40-69)</option>
                  <option value="low">Faible (&lt;40)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score IA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valeur Estimée</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prochaine Action IA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleLeadClick(lead)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold text-sm">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                        <div className="text-xs text-gray-400">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-16 h-2 rounded-full mr-2 ${
                        lead.aiScore >= 80 ? 'bg-green-500' :
                        lead.aiScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-bold ${getScoreColor(lead.aiScore)}`}>
                        {lead.aiScore}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Conversion: {lead.aiInsights.conversionProbability}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.source}</div>
                    <div className="text-xs text-gray-500">{lead.campaign}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(lead.estimatedValue)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-purple-700 font-medium">
                      {lead.aiInsights.nextAction}
                    </div>
                    <div className="text-xs text-gray-500">
                      Meilleur moment: {lead.aiInsights.bestContactTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Relance IA programmée');
                        }}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                      >
                        Relancer IA
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

  const renderSequences = () => (
    <div className="space-y-6">
      {/* Sequence Builder */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Séquences IA Automatisées</h2>
            <p className="text-green-100">Créez des parcours de nurturing intelligents</p>
          </div>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Séquence
          </button>
        </div>
      </div>

      {/* Active Sequences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sequences.map(sequence => (
          <div key={sequence.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{sequence.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{sequence.type.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sequence.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {sequence.isActive ? 'Active' : 'Inactive'}
                </span>
                <button className="text-gray-600 hover:text-gray-800">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Triggers */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Déclencheurs IA:</h4>
              <div className="space-y-1">
                {sequence.triggers.map((trigger, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700">
                    <Zap className="w-3 h-3 mr-2 text-blue-500" />
                    {trigger}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Étapes:</h4>
              <div className="space-y-2">
                {sequence.steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center text-sm">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-xs">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{step.content}</div>
                      <div className="text-xs text-gray-500">
                        Délai: {step.delay === 0 ? 'Immédiat' : `${step.delay} jours`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Performance:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Inscrits</div>
                  <div className="font-bold text-blue-600">{sequence.performance.enrolled}</div>
                </div>
                <div>
                  <div className="text-gray-600">Complétés</div>
                  <div className="font-bold text-green-600">{sequence.performance.completed}</div>
                </div>
                <div>
                  <div className="text-gray-600">Conversion</div>
                  <div className="font-bold text-purple-600">{sequence.performance.conversionRate}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Gestion IA des Leads
          </h1>
          <p className="text-gray-600">Scoring automatique et nurturing intelligent des prospects</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'leads', name: 'Leads IA', icon: Users },
              { id: 'sequences', name: 'Séquences Auto', icon: Bot }
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
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'sequences' && renderSequences()}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {showLeadDetail && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Profil Lead IA - {selectedLead.name}
              </h2>
              <button
                onClick={() => setShowLeadDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lead Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Informations Contact</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <div className="font-medium">{selectedLead.email}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Téléphone:</span>
                        <div className="font-medium">{selectedLead.phone || 'Non renseigné'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Entreprise:</span>
                        <div className="font-medium">{selectedLead.company}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Poste:</span>
                        <div className="font-medium">{selectedLead.position}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Insights IA
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Intention d'achat:</span>
                        <span className="font-bold text-purple-900">{selectedLead.aiInsights.buyingIntent}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Probabilité conversion:</span>
                        <span className="font-bold text-purple-900">{selectedLead.aiInsights.conversionProbability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Meilleur moment contact:</span>
                        <span className="font-bold text-purple-900">{selectedLead.aiInsights.bestContactTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Canal préféré:</span>
                        <span className="font-bold text-purple-900">{selectedLead.aiInsights.preferredChannel}</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-purple-100 rounded">
                      <div className="font-medium text-purple-900">Prochaine action recommandée:</div>
                      <div className="text-purple-800">{selectedLead.aiInsights.nextAction}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Comportement Digital</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Pages vues:</span>
                        <div className="font-medium">{selectedLead.behavior.pageViews}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Temps sur site:</span>
                        <div className="font-medium">{Math.round(selectedLead.behavior.timeOnSite / 60)} min</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Téléchargements:</span>
                        <div className="font-medium">{selectedLead.behavior.downloads}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Emails ouverts:</span>
                        <div className="font-medium">{selectedLead.behavior.emailOpens}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Score and Actions */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-center">Score IA</h3>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(selectedLead.aiScore)}`}>
                        {selectedLead.aiScore}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">sur 100</div>
                      <div className={`w-full h-2 rounded-full mt-3 ${
                        selectedLead.aiScore >= 80 ? 'bg-green-500' :
                        selectedLead.aiScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Actions Rapides</h3>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer Email IA
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Programmer Appel
                      </button>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <Bot className="w-4 h-4 mr-2" />
                        Séquence Auto
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Tags & Intérêts</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Tags:</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Intérêts:</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.interests.map((interest, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILeadManagement;