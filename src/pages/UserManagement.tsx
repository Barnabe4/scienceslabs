import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Plus, Search, Filter, Edit, Trash2, Eye, Shield, 
  Calendar, Clock, Activity, Settings, UserCheck, UserX,
  ChevronDown, MoreHorizontal, Download, Upload, AlertTriangle,
  CheckCircle, X, Mail, Phone, MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'secretary' | 'assistant' | 'partner';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  department?: string;
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
}

interface UserActivity {
  id: string;
  userId: number;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showInactiveUsersModal, setShowInactiveUsersModal] = useState(false);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Administrateur Système',
      email: 'admin@scienceslabs.com',
      role: 'admin',
      status: 'active',
      department: 'Administration',
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2023-01-01T00:00:00Z',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Directeur Général',
      email: 'directeur@scienceslabs.com',
      role: 'director',
      status: 'active',
      department: 'Direction',
      lastLogin: '2024-01-19T16:45:00Z',
      createdAt: '2023-01-15T00:00:00Z',
      permissions: ['dashboard', 'financial', 'users', 'products', 'orders', 'reports']
    },
    {
      id: 3,
      name: 'Marie Traoré',
      email: 'marie@scienceslabs.com',
      role: 'secretary',
      status: 'active',
      department: 'Administration',
      lastLogin: '2024-01-20T09:15:00Z',
      createdAt: '2023-03-10T00:00:00Z',
      permissions: ['dashboard', 'orders', 'customers', 'stock']
    },
    {
      id: 4,
      name: 'Amadou Keita',
      email: 'amadou@scienceslabs.com',
      role: 'assistant',
      status: 'active',
      department: 'Logistique',
      lastLogin: '2024-01-18T14:20:00Z',
      createdAt: '2023-06-20T00:00:00Z',
      permissions: ['dashboard', 'stock', 'shipping']
    },
    {
      id: 5,
      name: 'Partenaire Commercial',
      email: 'partenaire@scienceslabs.com',
      role: 'partner',
      status: 'inactive',
      department: 'Commercial',
      lastLogin: '2024-01-10T11:30:00Z',
      createdAt: '2023-09-05T00:00:00Z',
      permissions: ['dashboard', 'products', 'financial-view']
    }
  ]);

  const roles = [
    { id: 'admin', name: 'Administrateur', color: 'bg-red-100 text-red-800', description: 'Accès complet' },
    { id: 'director', name: 'Directeur', color: 'bg-purple-100 text-purple-800', description: 'Gestion complète' },
    { id: 'secretary', name: 'Secrétaire', color: 'bg-blue-100 text-blue-800', description: 'Gestion administrative' },
    { id: 'assistant', name: 'Assistant', color: 'bg-green-100 text-green-800', description: 'Support opérationnel' },
    { id: 'partner', name: 'Partenaire', color: 'bg-orange-100 text-orange-800', description: 'Accès limité' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const handleStatusChange = (userId: number, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getRoleInfo = (roleId: string) => {
    return roles.find(role => role.id === roleId) || roles[0];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'inactive': return <UserX className="w-4 h-4 text-gray-600" />;
      case 'suspended': return <Shield className="w-4 h-4 text-red-600" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleViewActivity = () => {
    // Simulation de données d'activité
    const mockActivity = [
      {
        id: '1',
        user: 'Marie Traoré',
        action: 'Connexion',
        module: 'Dashboard',
        timestamp: '2024-01-20T15:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0'
      },
      {
        id: '2',
        user: 'Amadou Keita',
        action: 'Modification commande',
        module: 'Commandes',
        timestamp: '2024-01-20T14:45:00Z',
        ipAddress: '192.168.1.101',
        userAgent: 'Firefox 121.0.0.0'
      },
      {
        id: '3',
        user: 'Administrateur Système',
        action: 'Création utilisateur',
        module: 'Utilisateurs',
        timestamp: '2024-01-20T13:20:00Z',
        ipAddress: '192.168.1.102',
        userAgent: 'Chrome 120.0.0.0'
      },
      {
        id: '4',
        user: 'Directeur Général',
        action: 'Consultation rapport',
        module: 'Finances',
        timestamp: '2024-01-20T12:15:00Z',
        ipAddress: '192.168.1.103',
        userAgent: 'Safari 17.0.0.0'
      }
    ];
    setActivityData(mockActivity);
    setShowActivityModal(true);
  };

  const handleSecuritySettings = () => {
    setShowSecurityModal(true);
  };

  const handleInactiveUsers = () => {
    // Filtrer les utilisateurs inactifs (pas de connexion depuis 30 jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const inactive = users.filter(user => {
      if (!user.lastLogin) return true;
      return new Date(user.lastLogin) < thirtyDaysAgo;
    });
    
    setInactiveUsers(inactive);
    setShowInactiveUsersModal(true);
  };

  const handleReactivateUser = (userId: number) => {
    // Envoyer email de réactivation
    const user = users.find(u => u.id === userId);
    if (user) {
      alert(`Email de réactivation envoyé à ${user.email}`);
      // Mettre à jour le statut
      handleStatusChange(userId, 'active');
    }
  };

  const handleSuspendInactiveUser = (userId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir suspendre cet utilisateur inactif ?')) {
      handleStatusChange(userId, 'suspended');
      setInactiveUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez les utilisateurs, rôles et permissions</p>
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
            to="/admin/utilisateurs/ajouter"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel utilisateur
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactifs</p>
              <p className="text-2xl font-bold text-gray-600">
                {users.filter(u => u.status === 'inactive').length}
              </p>
            </div>
            <UserX className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Administrateurs</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-red-600" />
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
                placeholder="Rechercher utilisateurs..."
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
              {selectedUsers.length} sélectionné{selectedUsers.length > 1 ? 's' : ''}
            </span>
            {selectedUsers.length > 0 && (
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les rôles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les départements</option>
                  <option value="administration">Administration</option>
                  <option value="direction">Direction</option>
                  <option value="logistique">Logistique</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleInfo.color}`}>
                        {roleInfo.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                          className="ml-2 text-sm border-0 bg-transparent focus:ring-0 capitalize"
                        >
                          <option value="active">Actif</option>
                          <option value="inactive">Inactif</option>
                          <option value="suspended">Suspendu</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? (
                        <div>
                          <div>{new Date(user.lastLogin).toLocaleDateString('fr-FR')}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(user.lastLogin).toLocaleTimeString('fr-FR')}
                          </div>
                        </div>
                      ) : (
                        'Jamais connecté'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.department || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/utilisateurs/${user.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/utilisateurs/${user.id}/editer`)}
                          className="text-green-600 hover:text-green-900"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                          disabled={user.id === currentUser?.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Plus d'actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/roles"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Shield className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Gérer les rôles</h4>
              <p className="text-sm text-gray-600">Configurer les rôles et permissions</p>
            </div>
          </Link>
          <button 
            onClick={handleViewActivity}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Activity className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Historique des connexions</h4>
              <p className="text-sm text-gray-600">Voir l'activité des utilisateurs</p>
            </div>
          </button>
          <button
            onClick={handleSecuritySettings}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-8 h-8 text-purple-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Paramètres de sécurité</h4>
              <p className="text-sm text-gray-600">Configurer la sécurité</p>
            </div>
          </button>
          <button
            onClick={handleInactiveUsers}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <AlertTriangle className="w-8 h-8 text-orange-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900">Utilisateurs inactifs</h4>
              <p className="text-sm text-gray-600">Gérer les comptes inactifs</p>
            </div>
          </button>
        </div>
      </div>

      {/* Modal Historique des Connexions */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-green-600" />
                Historique des Connexions
              </h2>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Activité des dernières 24 heures
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Module</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activityData.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {activity.user}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {activity.action}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {activity.module}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString('fr-FR')}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 font-mono">
                          {activity.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Paramètres de Sécurité */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-purple-600" />
                Paramètres de Sécurité
              </h2>
              <button
                onClick={() => setShowSecurityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Politique des Mots de Passe</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Minimum 8 caractères</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Au moins une majuscule</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Au moins un caractère spécial</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Expiration tous les 90 jours</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sessions et Connexions</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Durée de session (minutes)
                      </label>
                      <input
                        type="number"
                        defaultValue="480"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Déconnexion automatique après inactivité</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Authentification à deux facteurs obligatoire</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Surveillance</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Enregistrer toutes les connexions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Alertes de connexions suspectes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Blocage automatique après 5 tentatives</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowSecurityModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    alert('Paramètres de sécurité sauvegardés avec succès !');
                    setShowSecurityModal(false);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Utilisateurs Inactifs */}
      {showInactiveUsersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
                Utilisateurs Inactifs ({inactiveUsers.length})
              </h2>
              <button
                onClick={() => setShowInactiveUsersModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-800">Attention</span>
                  </div>
                  <p className="text-yellow-700 text-sm mt-1">
                    Ces utilisateurs n'ont pas de connexion enregistrée ou ne se sont pas connectés depuis plus de 30 jours.
                  </p>
                </div>
              </div>
              
              {inactiveUsers.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun utilisateur inactif</h3>
                  <p className="text-gray-600">Tous vos utilisateurs sont actifs et se connectent régulièrement.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inactiveUsers.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <span className="text-gray-600 font-bold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">
                              {user.lastLogin 
                                ? `Dernière connexion: ${new Date(user.lastLogin).toLocaleDateString('fr-FR')}`
                                : 'Jamais connecté'
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleReactivateUser(user.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            Relancer
                          </button>
                          <button
                            onClick={() => handleSuspendInactiveUser(user.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            Suspendre
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        inactiveUsers.forEach(user => handleReactivateUser(user.id));
                        setShowInactiveUsersModal(false);
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Relancer tous
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir suspendre tous les utilisateurs inactifs ?')) {
                          inactiveUsers.forEach(user => handleSuspendInactiveUser(user.id));
                          setShowInactiveUsersModal(false);
                        }
                      }}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Suspendre tous
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;