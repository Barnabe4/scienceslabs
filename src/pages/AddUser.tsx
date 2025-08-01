import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, Building, Shield, Eye, EyeOff } from 'lucide-react';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'secretary',
    department: '',
    password: '',
    confirmPassword: '',
    status: 'active',
    permissions: [] as string[],
    sendWelcomeEmail: true,
    requirePasswordChange: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    { 
      id: 'admin', 
      name: 'Administrateur', 
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: ['all']
    },
    { 
      id: 'director', 
      name: 'Directeur', 
      description: 'Gestion complète sauf administration système',
      permissions: ['dashboard', 'financial', 'users', 'products', 'orders', 'reports']
    },
    { 
      id: 'secretary', 
      name: 'Secrétaire', 
      description: 'Gestion administrative et des commandes',
      permissions: ['dashboard', 'orders', 'customers', 'stock']
    },
    { 
      id: 'assistant', 
      name: 'Assistant', 
      description: 'Support opérationnel et logistique',
      permissions: ['dashboard', 'stock', 'shipping']
    },
    { 
      id: 'partner', 
      name: 'Partenaire', 
      description: 'Accès limité aux produits et finances',
      permissions: ['dashboard', 'products', 'financial-view']
    }
  ];

  const allPermissions = [
    { id: 'dashboard', name: 'Tableau de bord', module: 'Général' },
    { id: 'users', name: 'Gestion utilisateurs', module: 'Administration' },
    { id: 'products', name: 'Gestion produits', module: 'Catalogue' },
    { id: 'orders', name: 'Gestion commandes', module: 'Ventes' },
    { id: 'customers', name: 'Gestion clients', module: 'Ventes' },
    { id: 'stock', name: 'Gestion stock', module: 'Inventaire' },
    { id: 'shipping', name: 'Expéditions', module: 'Logistique' },
    { id: 'financial', name: 'Gestion financière', module: 'Finance' },
    { id: 'financial-view', name: 'Consultation finances', module: 'Finance' },
    { id: 'reports', name: 'Rapports', module: 'Analyse' },
    { id: 'settings', name: 'Paramètres', module: 'Configuration' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    setFormData(prev => ({
      ...prev,
      role: roleId,
      permissions: role?.permissions || []
    }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulation de création d'utilisateur
    alert('Utilisateur créé avec succès !');
    
    // Redirection vers la liste des utilisateurs
    navigate('/admin/utilisateurs');
  };

  const selectedRole = roles.find(r => r.id === formData.role);

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
            <h1 className="text-2xl font-bold text-gray-900">Nouvel Utilisateur</h1>
            <p className="text-gray-600">Créer un nouveau compte utilisateur</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations personnelles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nom et prénom"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@exemple.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+223 XX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Département
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Administration, Commercial, etc."
                  />
                </div>
              </div>
            </div>

            {/* Mot de passe */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sécurité
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Minimum 6 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Répéter le mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="requirePasswordChange"
                    checked={formData.requirePasswordChange}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Obliger l'utilisateur à changer son mot de passe à la première connexion
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sendWelcomeEmail"
                    checked={formData.sendWelcomeEmail}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Envoyer un email de bienvenue avec les informations de connexion
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Rôle et permissions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Rôle et statut</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  {selectedRole && (
                    <p className="text-sm text-gray-600 mt-1">{selectedRole.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Permissions</h2>
              
              {formData.role === 'admin' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">
                    <Shield className="w-4 h-4 inline mr-2" />
                    L'administrateur a accès à toutes les fonctionnalités
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(
                    allPermissions.reduce((acc, perm) => {
                      if (!acc[perm.module]) acc[perm.module] = [];
                      acc[perm.module].push(perm);
                      return acc;
                    }, {} as Record<string, typeof allPermissions>)
                  ).map(([module, permissions]) => (
                    <div key={module}>
                      <h4 className="font-medium text-gray-900 mb-2">{module}</h4>
                      <div className="space-y-2">
                        {permissions.map(permission => (
                          <label key={permission.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.permissions.includes(permission.id)}
                              onChange={() => handlePermissionChange(permission.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            to="/admin/utilisateurs"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Créer l'utilisateur
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;