import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Plus, Search, Filter, Edit, Trash2, Eye, School, 
  User, Building, Calendar, ShoppingCart, DollarSign, 
  ChevronDown, MoreHorizontal, Download, Upload, Phone,
  Mail, MapPin, Percent, Clock, Star, AlertCircle
} from 'lucide-react';

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
}

const ClientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
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
      notes: 'Client prioritaire - Commandes régulières'
    },
    {
      id: 2,
      name: 'Université de Ouagadougou',
      type: 'university',
      email: 'labo@univ-ouaga.bf',
      phone: '+226 25 30 70 64',
      address: 'Avenue Charles de Gaulle',
      city: 'Ouagadougou',
      country: 'Burkina Faso',
      status: 'active',
      totalOrders: 8,
      totalSpent: 1850000,
      lastOrderDate: '2024-01-10T14:20:00Z',
      registeredAt: '2023-06-15T00:00:00Z',
      specialConditions: {
        discount: 15,
        paymentDelay: 45,
        creditLimit: 1000000
      },
      contact: {
        name: 'Prof. Marie Ouédraogo',
        position: 'Chef de laboratoire',
        email: 'marie.ouedraogo@univ-ouaga.bf',
        phone: '+226 25 30 70 65'
      },
      rating: 4,
      notes: 'Université partenaire - Formations incluses'
    },
    {
      id: 3,
      name: 'Institut Polytechnique Abidjan',
      type: 'school',
      email: 'commandes@ipa.ci',
      phone: '+225 21 35 42 18',
      address: 'Boulevard Lagunaire',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      status: 'active',
      totalOrders: 12,
      totalSpent: 3200000,
      lastOrderDate: '2024-01-18T09:15:00Z',
      registeredAt: '2023-01-20T00:00:00Z',
      specialConditions: {
        discount: 12,
        paymentDelay: 30,
        creditLimit: 750000
      },
      contact: {
        name: 'M. Kouassi Jean',
        position: 'Responsable achats',
        email: 'j.kouassi@ipa.ci',
        phone: '+225 21 35 42 19'
      },
      rating: 5,
      notes: 'Excellent client - Paiements toujours à temps'
    },
    {
      id: 4,
      name: 'Dr. Fatoumata Sidibé',
      type: 'individual',
      email: 'f.sidibe@gmail.com',
      phone: '+223 76 12 34 56',
      address: 'Quartier Hippodrome',
      city: 'Bamako',
      country: 'Mali',
      status: 'active',
      totalOrders: 3,
      totalSpent: 185000,
      lastOrderDate: '2024-01-05T16:45:00Z',
      registeredAt: '2023-11-08T00:00:00Z',
      specialConditions: {
        discount: 5,
        paymentDelay: 15,
        creditLimit: 100000
      },
      contact: {
        name: 'Dr. Fatoumata Sidibé',
        position: 'Professeur',
        email: 'f.sidibe@gmail.com',
        phone: '+223 76 12 34 56'
      },
      rating: 4,
      notes: 'Professeur indépendant - Achats ponctuels'
    },
    {
      id: 5,
      name: 'Collège Moderne de Niamey',
      type: 'school',
      email: 'direction@college-niamey.ne',
      phone: '+227 20 73 45 67',
      address: 'Quartier Plateau',
      city: 'Niamey',
      country: 'Niger',
      status: 'inactive',
      totalOrders: 2,
      totalSpent: 95000,
      lastOrderDate: '2023-10-15T11:20:00Z',
      registeredAt: '2023-08-12T00:00:00Z',
      specialConditions: {
        discount: 8,
        paymentDelay: 30,
        creditLimit: 200000
      },
      contact: {
        name: 'Mme Aïcha Ibrahim',
        position: 'Directrice',
        email: 'a.ibrahim@college-niamey.ne',
        phone: '+227 20 73 45 68'
      },
      rating: 3,
      notes: 'Client inactif depuis 3 mois'
    }
  ]);

  const clientTypes = [
    { id: 'all', name: 'Tous les types', icon: Users },
    { id: 'school', name: 'Écoles', icon: School },
    { id: 'university', name: 'Universités', icon: Building },
    { id: 'company', name: 'Entreprises', icon: Building },
    { id: 'individual', name: 'Particuliers', icon: User }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || client.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleClientSelect = (clientId: number) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClients(
      selectedClients.length === filteredClients.length 
        ? [] 
        : filteredClients.map(client => client.id)
    );
  };

  const handleStatusChange = (clientId: number, newStatus: Client['status']) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
  };

  const handleDeleteClient = (clientId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school': return <School className="w-4 h-4" />;
      case 'university': return <Building className="w-4 h-4" />;
      case 'company': return <Building className="w-4 h-4" />;
      case 'individual': return <User className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600">Gérez vos clients et leurs conditions spéciales</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </button>
          <Link
            to="/admin/clients/ajouter"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau client
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <School className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(clients.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes Total</p>
              <p className="text-2xl font-bold text-orange-600">
                {clients.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
            <ShoppingCart className="w-8 h-8 text-orange-600" />
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
                placeholder="Rechercher clients..."
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
            <span className="text-sm text-gray-600">
              {selectedClients.length} sélectionné{selectedClients.length > 1 ? 's' : ''}
            </span>
            {selectedClients.length > 0 && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Actions groupées
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de client</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {clientTypes.map(type => (
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
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="suspended">Suspendu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les pays</option>
                  <option value="mali">Mali</option>
                  <option value="burkina">Burkina Faso</option>
                  <option value="cote-ivoire">Côte d'Ivoire</option>
                  <option value="niger">Niger</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chiffre d'affaires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleClientSelect(client.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        {getTypeIcon(client.type)}
                        <span className="text-white text-xs">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.city}, {client.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(client.type)}
                      <span className="ml-2 text-sm text-gray-900">{getTypeLabel(client.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{client.contact.name}</div>
                      <div className="text-sm text-gray-500">{client.contact.position}</div>
                      <div className="text-xs text-gray-400">{client.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.totalOrders}</div>
                    {client.lastOrderDate && (
                      <div className="text-xs text-gray-500">
                        Dernière: {new Date(client.lastOrderDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(client.totalSpent)}
                    </div>
                    {client.specialConditions.discount > 0 && (
                      <div className="text-xs text-green-600">
                        Remise: {client.specialConditions.discount}%
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={client.status}
                      onChange={(e) => handleStatusChange(client.id, e.target.value as Client['status'])}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(client.status)}`}
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="suspended">Suspendu</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRatingStars(client.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/admin/clients/${client.id}/fiche`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir fiche"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/clients/${client.id}/editer`)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Plus d'actions">
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Percent className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Gérer les remises</h4>
              <p className="text-sm text-gray-600">Configurer les conditions spéciales</p>
            </div>
          </button>
          <button 
            onClick={() => alert('Fonctionnalité en cours de développement')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Paiements différés</h4>
              <p className="text-sm text-gray-600">Gérer les délais de paiement</p>
            </div>
          </button>
          <button 
            onClick={() => alert('Fonctionnalité en cours de développement')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <AlertCircle className="w-8 h-8 text-orange-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Clients inactifs</h4>
              <p className="text-sm text-gray-600">Relancer les clients inactifs</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;