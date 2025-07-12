import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, ShoppingCart, 
  DollarSign, Percent, Clock, Star, FileText, Package, User,
  Building, TrendingUp, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

interface Client {
  id: number;
  name: string;
  type: 'school' | 'individual' | 'university' | 'company';
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'suspended';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  registeredAt: string;
  specialConditions: {
    discount: number;
    paymentDelay: number;
    creditLimit: number;
  };
  contact: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  rating: number;
  notes: string;
  orders: Order[];
}

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulation de chargement des données client
  useEffect(() => {
    const loadClient = async () => {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées
      const clientData: Client = {
        id: parseInt(id || '1'),
        name: 'Lycée Technique de Bamako',
        type: 'school',
        email: 'contact@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        address: 'Avenue Modibo Keita',
        city: 'Bamako',
        country: 'Mali',
        status: 'active',
        totalOrders: 15,
        totalSpent: 2450000,
        lastOrderDate: '2024-01-15T10:30:00Z',
        registeredAt: '2023-03-10T00:00:00Z',
        specialConditions: {
          discount: 10,
          paymentDelay: 30,
          creditLimit: 500000
        },
        contact: {
          name: 'Dr. Amadou Traoré',
          position: 'Directeur',
          email: 'directeur@lyceetechnique.ml',
          phone: '+223 20 22 33 45'
        },
        rating: 5,
        notes: 'Client prioritaire - Commandes régulières pour le laboratoire de chimie',
        orders: [
          { id: 'CMD-2024-001', date: '2024-01-15', total: 185000, status: 'delivered', items: 5 },
          { id: 'CMD-2024-002', date: '2024-01-10', total: 95000, status: 'processing', items: 3 },
          { id: 'CMD-2023-045', date: '2023-12-20', total: 320000, status: 'delivered', items: 8 },
          { id: 'CMD-2023-038', date: '2023-12-05', total: 150000, status: 'delivered', items: 4 },
          { id: 'CMD-2023-032', date: '2023-11-18', total: 275000, status: 'delivered', items: 6 }
        ]
      };
      
      setClient(clientData);
      setLoading(false);
    };

    loadClient();
  }, [id]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school': return <Building className="w-5 h-5" />;
      case 'university': return <Building className="w-5 h-5" />;
      case 'company': return <Building className="w-5 h-5" />;
      case 'individual': return <User className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'school': return 'École';
      case 'university': return 'Université';
      case 'company': return 'Entreprise';
      case 'individual': return 'Particulier';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'shipped': return <Package className="w-4 h-4 text-purple-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En cours';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Client non trouvé</h2>
        <Link to="/admin/clients" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Retour à la liste des clients
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/clients"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fiche Client</h1>
            <p className="text-gray-600">{client.name}</p>
          </div>
        </div>
        <Link
          to={`/admin/clients/${client.id}/editer`}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </Link>
      </div>

      {/* Client Info Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              {getTypeIcon(client.type)}
              <span className="text-white font-bold text-lg ml-2">
                {client.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className="flex items-center text-gray-600">
                  {getTypeIcon(client.type)}
                  <span className="ml-1">{getTypeLabel(client.type)}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status === 'active' ? 'Actif' : client.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                </span>
                <div className="flex items-center">
                  {getRatingStars(client.rating)}
                  <span className="ml-2 text-sm text-gray-600">({client.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Client depuis</p>
            <p className="font-medium">{new Date(client.registeredAt).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-blue-600">{client.totalOrders}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(client.totalSpent)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remise</p>
              <p className="text-2xl font-bold text-orange-600">{client.specialConditions.discount}%</p>
            </div>
            <Percent className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Délai Paiement</p>
              <p className="text-2xl font-bold text-purple-600">{client.specialConditions.paymentDelay}j</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Vue d\'ensemble' },
              { id: 'orders', name: 'Commandes' },
              { id: 'contact', name: 'Contact' },
              { id: 'conditions', name: 'Conditions spéciales' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">{client.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">{client.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{client.address}</p>
                      <p className="text-gray-700">{client.city}, {client.country}</p>
                    </div>
                  </div>
                  {client.lastOrderDate && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-700">
                        Dernière commande: {new Date(client.lastOrderDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{client.notes || 'Aucune note'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des commandes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commande</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {client.orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {new Date(order.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{order.items}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            {getOrderStatusIcon(order.status)}
                            <span className="ml-2 text-sm text-gray-900">
                              {getOrderStatusLabel(order.status)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Contact principal</h4>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Nom:</strong> {client.contact.name}</p>
                    <p className="text-gray-700"><strong>Poste:</strong> {client.contact.position}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {client.contact.email}</p>
                    <p className="text-gray-700"><strong>Téléphone:</strong> {client.contact.phone}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Adresse de facturation</h4>
                  <div className="space-y-2">
                    <p className="text-gray-700">{client.name}</p>
                    <p className="text-gray-700">{client.address}</p>
                    <p className="text-gray-700">{client.city}, {client.country}</p>
                    <p className="text-gray-700">{client.email}</p>
                    <p className="text-gray-700">{client.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conditions' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions spéciales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Percent className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-medium text-green-900">Remise accordée</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{client.specialConditions.discount}%</p>
                  <p className="text-sm text-green-700">Sur toutes les commandes</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900">Délai de paiement</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{client.specialConditions.paymentDelay} jours</p>
                  <p className="text-sm text-blue-700">Paiement différé autorisé</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
                    <h4 className="font-medium text-purple-900">Limite de crédit</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(client.specialConditions.creditLimit)}
                  </p>
                  <p className="text-sm text-purple-700">Crédit maximum autorisé</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;