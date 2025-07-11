import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Plus, Edit, Trash2, Users, Settings, 
  ArrowLeft, Save, X, Check, AlertTriangle
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  color: string;
}

const RoleManagement = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrateur',
      description: 'Accès complet à toutes les fonctionnalités du système',
      permissions: ['all'],
      userCount: 1,
      isSystem: true,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'director',
      name: 'Directeur',
      description: 'Gestion complète sauf administration système',
      permissions: ['dashboard', 'financial', 'users', 'products', 'orders', 'reports'],
      userCount: 1,
      isSystem: true,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'secretary',
      name: 'Secrétaire',
      description: 'Gestion administrative et des commandes',
      permissions: ['dashboard', 'orders', 'customers', 'stock'],
      userCount: 2,
      isSystem: true,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'assistant',
      name: 'Assistant',
      description: 'Support opérationnel et logistique',
      permissions: ['dashboard', 'stock', 'shipping'],
      userCount: 1,
      isSystem: false,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'partner',
      name: 'Partenaire',
      description: 'Accès limité aux produits et finances',
      permissions: ['dashboard', 'products', 'financial-view'],
      userCount: 1,
      isSystem: false,
      color: 'bg-orange-100 text-orange-800'
    }
  ]);

  const permissions: Permission[] = [
    { id: 'dashboard', name: 'Tableau de bord', description: 'Accès au tableau de bord principal', module: 'Général' },
    { id: 'users', name: 'Gestion utilisateurs', description: 'Créer, modifier, supprimer des utilisateurs', module: 'Administration' },
    { id: 'roles', name: 'Gestion des rôles', description: 'Gérer les rôles et permissions', module: 'Administration' },
    { id: 'products', name: 'Gestion produits', description: 'Gérer le catalogue de produits', module: 'Catalogue' },
    { id: 'categories', name: 'Gestion catégories', description: 'Gérer les catégories de produits', module: 'Catalogue' },
    { id: 'orders', name: 'Gestion commandes', description: 'Traiter et gérer les commandes', module: 'Ventes' },
    { id: 'customers', name: 'Gestion clients', description: 'Gérer les informations clients', module: 'Ventes' },
    { id: 'stock', name: 'Gestion stock', description: 'Gérer les niveaux de stock', module: 'Inventaire' },
    { id: 'suppliers', name: 'Gestion fournisseurs', description: 'Gérer les fournisseurs', module: 'Inventaire' },
    { id: 'shipping', name: 'Expéditions', description: 'Gérer les expéditions et livraisons', module: 'Logistique' },
    { id: 'financial', name: 'Gestion financière', description: 'Accès complet aux finances', module: 'Finance' },
    { id: 'financial-view', name: 'Consultation finances', description: 'Consultation des données financières', module: 'Finance' },
    { id: 'reports', name: 'Rapports', description: 'Générer et consulter les rapports', module: 'Analyse' },
    { id: 'analytics', name: 'Analyses', description: 'Accès aux outils d\'analyse', module: 'Analyse' },
    { id: 'settings', name: 'Paramètres', description: 'Configurer les paramètres système', module: 'Configuration' },
    { id: 'backup', name: 'Sauvegarde', description: 'Gérer les sauvegardes', module: 'Configuration' }
  ];

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;

    const role: Role = {
      id: newRole.name.toLowerCase().replace(/\s+/g, '-'),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      isSystem: false,
      color: 'bg-gray-100 text-gray-800'
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateRole(false);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      alert('Impossible de supprimer un rôle système');
      return;
    }
    if (role?.userCount > 0) {
      alert('Impossible de supprimer un rôle assigné à des utilisateurs');
      return;
    }
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/utilisateurs"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Rôles</h1>
            <p className="text-gray-600">Configurez les rôles et permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateRole(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau rôle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rôles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rôles Système</p>
              <p className="text-2xl font-bold text-red-600">
                {roles.filter(r => r.isSystem).length}
              </p>
            </div>
            <Settings className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Permissions</p>
              <p className="text-2xl font-bold text-green-600">{permissions.length}</p>
            </div>
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Create Role Modal */}
      {showCreateRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Créer un nouveau rôle</h2>
              <button
                onClick={() => setShowCreateRole(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du rôle *
                    </label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Gestionnaire de stock"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newRole.description}
                      onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description du rôle"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                  <div className="space-y-6">
                    {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                      <div key={module} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{module}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {modulePermissions.map(permission => (
                            <label key={permission.id} className="flex items-start">
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                              />
                              <div className="ml-3">
                                <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                                <p className="text-xs text-gray-600">{permission.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => setShowCreateRole(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateRole}
                disabled={!newRole.name.trim()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Créer le rôle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Rôles configurés</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateurs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.color} mr-3`}>
                          {role.name}
                        </span>
                        {role.isSystem && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            Système
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{role.userCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.includes('all') ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Toutes les permissions
                        </span>
                      ) : (
                        role.permissions.slice(0, 3).map(permId => {
                          const perm = permissions.find(p => p.id === permId);
                          return perm ? (
                            <span key={permId} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {perm.name}
                            </span>
                          ) : null;
                        })
                      )}
                      {role.permissions.length > 3 && !role.permissions.includes('all') && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{role.permissions.length - 3} autres
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {role.isSystem ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Système
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Personnalisé
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingRole(role.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!role.isSystem && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Reference */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Référence des permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
            <div key={module} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">{module}</h3>
              <div className="space-y-2">
                {modulePermissions.map(permission => (
                  <div key={permission.id} className="text-sm">
                    <div className="font-medium text-gray-700">{permission.name}</div>
                    <div className="text-gray-500 text-xs">{permission.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;