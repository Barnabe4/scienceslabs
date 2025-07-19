import React, { useState } from 'react';
import { 
  MessageCircle, Bot, Users, Clock, CheckCircle, AlertTriangle,
  Phone, Mail, MessageSquare, Headphones, Star, TrendingUp,
  BarChart3, Settings, Eye, Edit, Trash2, Plus, Download,
  Filter, Search, Calendar, ArrowRight, Zap, Brain, Target
} from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'product' | 'general';
  source: 'email' | 'chat' | 'phone' | 'form' | 'chatbot';
  assignedTo?: string;
  messages: SupportMessage[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  satisfaction?: number;
  tags: string[];
}

interface SupportMessage {
  id: string;
  content: string;
  sender: 'customer' | 'agent' | 'bot';
  timestamp: string;
  attachments?: string[];
}

interface ChatbotConversation {
  id: string;
  customer: {
    name?: string;
    email?: string;
    sessionId: string;
  };
  messages: ChatMessage[];
  status: 'active' | 'transferred' | 'resolved';
  aiConfidence: number;
  intent: string;
  startedAt: string;
  endedAt?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  intent?: string;
  confidence?: number;
}

const CustomerSupportDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      subject: 'Problème avec la livraison de microscopes',
      customer: {
        name: 'Dr. Amadou Traoré',
        email: 'a.traore@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        company: 'Lycée Technique de Bamako'
      },
      status: 'open',
      priority: 'high',
      category: 'technical',
      source: 'email',
      assignedTo: 'Marie Traoré',
      messages: [
        {
          id: '1',
          content: 'Bonjour, nous avons reçu les microscopes mais ils ne fonctionnent pas correctement.',
          sender: 'customer',
          timestamp: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          content: 'Bonjour Dr. Traoré, je suis désolée pour ce problème. Pouvez-vous me décrire précisément le dysfonctionnement ?',
          sender: 'agent',
          timestamp: '2024-01-20T11:00:00Z'
        }
      ],
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T11:00:00Z',
      tags: ['livraison', 'microscope', 'défaut']
    },
    {
      id: 'TKT-002',
      subject: 'Demande de devis pour équipements chimie',
      customer: {
        name: 'Marie Ouédraogo',
        email: 'm.ouedraogo@univ-ouaga.bf',
        company: 'Université de Ouagadougou'
      },
      status: 'new',
      priority: 'medium',
      category: 'product',
      source: 'chatbot',
      messages: [
        {
          id: '3',
          content: 'Je souhaite obtenir un devis pour équiper notre laboratoire de chimie.',
          sender: 'customer',
          timestamp: '2024-01-20T14:15:00Z'
        }
      ],
      createdAt: '2024-01-20T14:15:00Z',
      updatedAt: '2024-01-20T14:15:00Z',
      tags: ['devis', 'chimie']
    }
  ]);

  const [chatbotConversations, setChatbotConversations] = useState<ChatbotConversation[]>([
    {
      id: 'CHAT-001',
      customer: {
        name: 'Visiteur anonyme',
        sessionId: 'sess_123456',
        email: 'prospect@example.com'
      },
      messages: [
        {
          id: '1',
          content: 'Bonjour, je cherche des informations sur vos microscopes',
          sender: 'user',
          timestamp: '2024-01-20T15:30:00Z'
        },
        {
          id: '2',
          content: 'Bonjour ! Je serais ravi de vous aider avec nos microscopes. Nous avons plusieurs modèles disponibles. Pour quel type d\'utilisation cherchez-vous un microscope ?',
          sender: 'bot',
          timestamp: '2024-01-20T15:30:05Z',
          intent: 'product_inquiry',
          confidence: 95
        }
      ],
      status: 'active',
      aiConfidence: 95,
      intent: 'product_inquiry',
      startedAt: '2024-01-20T15:30:00Z'
    }
  ]);

  const supportStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    newTickets: tickets.filter(t => t.status === 'new').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2h 15min',
    avgResolutionTime: '1.5 jours',
    customerSatisfaction: 4.6,
    chatbotResolutionRate: 78,
    activeChatSessions: chatbotConversations.filter(c => c.status === 'active').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Support Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Headphones className="w-6 h-6 mr-2" />
              Centre de Support Client
            </h2>
            <p className="text-blue-100">Gestion intelligente des demandes clients avec IA</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{supportStats.customerSatisfaction}/5</div>
            <div className="text-blue-100">Satisfaction client</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets Ouverts</p>
              <p className="text-2xl font-bold text-yellow-600">{supportStats.openTickets}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">Temps moyen: {supportStats.avgResponseTime}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nouveaux Tickets</p>
              <p className="text-2xl font-bold text-blue-600">{supportStats.newTickets}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5% cette semaine</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chatbot IA</p>
              <p className="text-2xl font-bold text-purple-600">{supportStats.chatbotResolutionRate}%</p>
            </div>
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center">
            <Brain className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600">Résolution automatique</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-green-600">{supportStats.customerSatisfaction}/5</p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">Excellent service</span>
          </div>
        </div>
      </div>

      {/* Recent Tickets and Chat Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tickets Récents</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Voir tous
            </button>
          </div>
          <div className="space-y-3">
            {tickets.slice(0, 5).map(ticket => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{ticket.subject}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {ticket.customer.name} • {ticket.customer.company}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-600" />
              Activité Chatbot IA
            </h3>
            <span className="text-sm text-purple-600 font-medium">
              {supportStats.activeChatSessions} sessions actives
            </span>
          </div>
          <div className="space-y-3">
            {chatbotConversations.slice(0, 5).map(chat => (
              <div key={chat.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{chat.customer.name}</span>
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 text-purple-500 mr-1" />
                    <span className="text-xs text-purple-600">{chat.aiConfidence}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Intent: {chat.intent}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(chat.startedAt).toLocaleTimeString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Tickets</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Graphique des tickets par jour</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Chatbot IA</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Résolution automatique:</span>
              <span className="font-bold text-purple-600">{supportStats.chatbotResolutionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transferts vers agents:</span>
              <span className="font-bold text-blue-600">22%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Satisfaction IA:</span>
              <span className="font-bold text-green-600">4.3/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temps de réponse:</span>
              <span className="font-bold text-orange-600">< 2 sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      {/* Ticket Management Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gestion des Tickets</h2>
            <p className="text-gray-600">Suivi et résolution des demandes clients</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigné à</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créé le</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-blue-600">{ticket.id}</div>
                      <div className="text-sm text-gray-900">{ticket.subject}</div>
                      <div className="text-xs text-gray-500">{ticket.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{ticket.customer.name}</div>
                      <div className="text-sm text-gray-500">{ticket.customer.company}</div>
                      <div className="text-xs text-gray-400">{ticket.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.assignedTo || 'Non assigné'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketDetail(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
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

  const renderChatbot = () => (
    <div className="space-y-6">
      {/* Chatbot Configuration */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              Chatbot IA Sciences Labs
            </h2>
            <p className="text-purple-100">Assistant virtuel intelligent pour vos clients</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-purple-100">Statut</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="font-medium">Actif</span>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Configurer
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversations</p>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 text-sm text-gray-600">Ce mois</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Résolution Auto</p>
              <p className="text-2xl font-bold text-green-600">{supportStats.chatbotResolutionRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 text-sm text-gray-600">Sans intervention humaine</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leads Générés</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 text-sm text-gray-600">Via chatbot</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-orange-600">4.3/5</p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2 text-sm text-gray-600">Note moyenne</div>
        </div>
      </div>

      {/* Live Chat Sessions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sessions Chat en Direct</h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {supportStats.activeChatSessions} sessions actives
            </span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Bot className="w-4 h-4 mr-2" />
              Entraîner l'IA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chatbotConversations.map(chat => (
            <div key={chat.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{chat.customer.name}</div>
                  <div className="text-sm text-gray-500">Intent: {chat.intent}</div>
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm font-medium text-purple-600">{chat.aiConfidence}%</span>
                </div>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {chat.messages.slice(-3).map(message => (
                  <div key={message.id} className={`text-sm p-2 rounded ${
                    message.sender === 'user' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    <div className="font-medium text-xs mb-1">
                      {message.sender === 'user' ? 'Client' : 'Bot IA'}
                    </div>
                    {message.content}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-gray-500">
                  {new Date(chat.startedAt).toLocaleTimeString('fr-FR')}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Rejoindre
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration du Chatbot IA</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Réponses Automatiques</h4>
            <div className="space-y-3">
              {[
                { intent: 'Salutation', response: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', confidence: 98 },
                { intent: 'Info produits', response: 'Je peux vous renseigner sur tous nos équipements scientifiques...', confidence: 95 },
                { intent: 'Demande devis', response: 'Je vais vous rediriger vers notre formulaire de devis...', confidence: 92 },
                { intent: 'Support technique', response: 'Pour le support technique, je vous mets en relation avec un expert...', confidence: 88 }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{item.intent}</span>
                    <span className="text-xs text-purple-600">{item.confidence}% confiance</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.response}</p>
                  <div className="flex items-center justify-end mt-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Paramètres IA</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seuil de confiance pour transfert
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>70%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Apprentissage automatique</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Collecte de leads automatique</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Transfert automatique si non résolu</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactForms = () => (
    <div className="space-y-6">
      {/* Contact Form Builder */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Formulaires de Contact</h2>
            <p className="text-green-100">Créez et gérez vos formulaires de contact personnalisés</p>
          </div>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Formulaire
          </button>
        </div>
      </div>

      {/* Form Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Contact Général',
            description: 'Formulaire de contact standard',
            fields: ['Nom', 'Email', 'Sujet', 'Message'],
            submissions: 156,
            conversionRate: 12.5
          },
          {
            name: 'Demande de Devis',
            description: 'Formulaire spécialisé pour les devis',
            fields: ['Nom', 'Email', 'Entreprise', 'Besoins', 'Budget'],
            submissions: 89,
            conversionRate: 34.2
          },
          {
            name: 'Support Technique',
            description: 'Formulaire pour le support',
            fields: ['Nom', 'Email', 'Produit', 'Problème', 'Urgence'],
            submissions: 67,
            conversionRate: 8.9
          }
        ].map((form, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{form.name}</h3>
              <button className="text-gray-600 hover:text-gray-800">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">{form.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="text-sm font-medium text-gray-700">Champs:</div>
              <div className="flex flex-wrap gap-1">
                {form.fields.map((field, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {field}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Soumissions</div>
                <div className="font-bold text-blue-600">{form.submissions}</div>
              </div>
              <div>
                <div className="text-gray-600">Conversion</div>
                <div className="font-bold text-green-600">{form.conversionRate}%</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Modifier
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Submissions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Soumissions Récentes</h3>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Formulaire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  date: '2024-01-20',
                  name: 'Dr. Amadou Traoré',
                  email: 'a.traore@lyceetechnique.ml',
                  form: 'Demande de Devis',
                  status: 'new'
                },
                {
                  date: '2024-01-20',
                  name: 'Marie Ouédraogo',
                  email: 'm.ouedraogo@univ-ouaga.bf',
                  form: 'Contact Général',
                  status: 'processed'
                }
              ].map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(submission.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {submission.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.form}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submission.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <MessageCircle className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Headphones className="w-8 h-8 mr-3 text-blue-600" />
            Relation Client & Support
          </h1>
          <p className="text-gray-600">Gestion intelligente du support client avec IA</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Bot className="w-4 h-4 mr-2" />
            Assistant IA
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'tickets', name: 'Tickets Support', icon: MessageCircle },
              { id: 'chatbot', name: 'Chatbot IA', icon: Bot },
              { id: 'forms', name: 'Formulaires', icon: MessageSquare }
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
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'tickets' && renderTickets()}
          {activeTab === 'chatbot' && renderChatbot()}
          {activeTab === 'forms' && renderContactForms()}
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {showTicketDetail && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Ticket {selectedTicket.id} - {selectedTicket.subject}
              </h2>
              <button
                onClick={() => setShowTicketDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-4">Conversation</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedTicket.messages.map(message => (
                      <div key={message.id} className={`p-4 rounded-lg ${
                        message.sender === 'customer' 
                          ? 'bg-gray-100 ml-8' 
                          : 'bg-blue-100 mr-8'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {message.sender === 'customer' ? selectedTicket.customer.name : 'Agent Support'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <textarea
                      placeholder="Tapez votre réponse..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                    <div className="flex justify-end mt-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Envoyer Réponse
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="new">Nouveau</option>
                        <option value="open">Ouvert</option>
                        <option value="pending">En attente</option>
                        <option value="resolved">Résolu</option>
                        <option value="closed">Fermé</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigné à</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Non assigné</option>
                        <option value="marie">Marie Traoré</option>
                        <option value="amadou">Amadou Keita</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-1">
                        {selectedTicket.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tag}
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
      )}
    </div>
  );
};

export default CustomerSupportDashboard;