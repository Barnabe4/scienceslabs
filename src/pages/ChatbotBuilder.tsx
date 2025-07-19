import React, { useState } from 'react';
import { 
  Bot, Plus, Edit, Trash2, Play, Pause, Settings, Eye,
  MessageCircle, Brain, Zap, Target, Users, BarChart3,
  ArrowRight, CheckCircle, AlertTriangle, Clock, Star
} from 'lucide-react';

interface ChatbotFlow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  nodes: FlowNode[];
  isActive: boolean;
  performance: {
    triggered: number;
    completed: number;
    satisfaction: number;
    conversionRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface FlowNode {
  id: string;
  type: 'message' | 'question' | 'condition' | 'action' | 'transfer';
  content: string;
  options?: string[];
  conditions?: string[];
  nextNode?: string;
  position: { x: number; y: number };
}

const ChatbotBuilder = () => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [showFlowBuilder, setShowFlowBuilder] = useState(false);

  const [flows, setFlows] = useState<ChatbotFlow[]>([
    {
      id: '1',
      name: 'Accueil et Orientation',
      description: 'Flow principal pour accueillir les visiteurs',
      trigger: 'Première visite',
      nodes: [
        {
          id: 'start',
          type: 'message',
          content: 'Bonjour ! Bienvenue chez Sciences Labs. Comment puis-je vous aider ?',
          position: { x: 100, y: 100 }
        },
        {
          id: 'question1',
          type: 'question',
          content: 'Que recherchez-vous ?',
          options: ['Informations produits', 'Demande de devis', 'Support technique', 'Autre'],
          position: { x: 100, y: 200 }
        }
      ],
      isActive: true,
      performance: {
        triggered: 1247,
        completed: 967,
        satisfaction: 4.3,
        conversionRate: 12.8
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'Génération de Leads',
      description: 'Collecte d\'informations pour prospects qualifiés',
      trigger: 'Intérêt produit exprimé',
      nodes: [
        {
          id: 'lead_start',
          type: 'message',
          content: 'Parfait ! Pour vous proposer les meilleurs équipements, j\'aimerais en savoir plus sur vos besoins.',
          position: { x: 100, y: 100 }
        }
      ],
      isActive: true,
      performance: {
        triggered: 456,
        completed: 289,
        satisfaction: 4.1,
        conversionRate: 34.2
      },
      createdAt: '2024-01-18T09:00:00Z',
      updatedAt: '2024-01-20T16:45:00Z'
    }
  ]);

  const [intents, setIntents] = useState([
    { name: 'Salutation', examples: ['bonjour', 'salut', 'hello'], confidence: 98 },
    { name: 'Info produits', examples: ['produit', 'équipement', 'microscope'], confidence: 95 },
    { name: 'Demande prix', examples: ['prix', 'coût', 'tarif'], confidence: 92 },
    { name: 'Support', examples: ['aide', 'problème', 'support'], confidence: 90 }
  ]);

  const renderFlowBuilder = () => (
    <div className="space-y-6">
      {/* Flow Builder Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Constructeur de Flows Chatbot</h2>
            <p className="text-purple-100">Créez des conversations intelligentes avec glisser-déposer</p>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Flow
          </button>
        </div>
      </div>

      {/* Flow Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Accueil Standard',
            description: 'Flow d\'accueil pour nouveaux visiteurs',
            icon: MessageCircle,
            color: 'bg-blue-500'
          },
          {
            name: 'Qualification Lead',
            description: 'Collecte d\'informations prospects',
            icon: Target,
            color: 'bg-green-500'
          },
          {
            name: 'Support Technique',
            description: 'Assistance technique automatisée',
            icon: Settings,
            color: 'bg-orange-500'
          }
        ].map((template, index) => {
          const Icon = template.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Utiliser ce template
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Flows */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Flows Actifs</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Créer Flow
          </button>
        </div>

        <div className="space-y-4">
          {flows.map(flow => (
            <div key={flow.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{flow.name}</h4>
                    <p className="text-sm text-gray-600">{flow.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    flow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {flow.isActive ? 'Actif' : 'Inactif'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Déclenchements</div>
                  <div className="font-semibold text-blue-600">{flow.performance.triggered}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Complétés</div>
                  <div className="font-semibold text-green-600">{flow.performance.completed}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Satisfaction</div>
                  <div className="font-semibold text-orange-600">{flow.performance.satisfaction}/5</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Conversion</div>
                  <div className="font-semibold text-purple-600">{flow.performance.conversionRate}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Trigger: {flow.trigger} • {flow.nodes.length} étapes
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                    <Eye className="w-3 h-3 mr-1" />
                    Tester
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAITraining = () => (
    <div className="space-y-6">
      {/* AI Training Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              Entraînement IA du Chatbot
            </h2>
            <p className="text-blue-100">Améliorez les performances de votre assistant virtuel</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Entraîner Maintenant
          </button>
        </div>
      </div>

      {/* Intent Management */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Gestion des Intentions</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Intention
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {intents.map((intent, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{intent.name}</h4>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm font-medium text-purple-600">{intent.confidence}%</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Exemples d'entraînement:</div>
                <div className="flex flex-wrap gap-1">
                  {intent.examples.map((example, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Ajouter exemples
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm">
                  Tester intention
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance IA</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Précision globale:</span>
              <span className="font-bold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Intentions reconnues:</span>
              <span className="font-bold text-blue-600">87.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confiance moyenne:</span>
              <span className="font-bold text-purple-600">91.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transferts humains:</span>
              <span className="font-bold text-orange-600">12.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions d'Amélioration</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Intention "Prix" à améliorer</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">Ajouter plus d'exemples de variations</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Nouvelle intention détectée</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">"Livraison" mentionnée 45 fois</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Performance excellente</span>
              </div>
              <p className="text-xs text-green-700 mt-1">Intention "Support" bien maîtrisée</p>
            </div>
          </div>
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
            <Bot className="w-8 h-8 mr-3 text-purple-600" />
            Constructeur de Chatbot IA
          </h1>
          <p className="text-gray-600">Créez et entraînez votre assistant virtuel intelligent</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'flows', name: 'Flows de Conversation', icon: MessageCircle },
              { id: 'training', name: 'Entraînement IA', icon: Brain }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFlow(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    selectedFlow === tab.id
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
          {selectedFlow === 'flows' && renderFlowBuilder()}
          {selectedFlow === 'training' && renderAITraining()}
          {!selectedFlow && renderFlowBuilder()}
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;