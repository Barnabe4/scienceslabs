import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { useOrders } from '../context/OrderContext';
import { useSettings } from '../context/SettingsContext';
import { 
  BarChart3, 
  CheckSquare, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';
import OrderManagement from './OrderManagement';
import Settings from './Settings';
import ClientManagement from './ClientManagement';
import UserManagement from './UserManagement';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats } = useDashboard();
  const { orders, stats: orderStats } = useOrders();
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('Hier');

  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'tasks', name: 'Gestion des tâches', icon: CheckSquare },
    { id: 'users', name: 'Gestion des utilisateurs', icon: Users },
    { id: 'orders', name: 'Commandes', icon: Package },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'products', name: 'Produits', icon: ShoppingCart },
    { id: 'finances', name: 'Finances', icon: DollarSign },
    { id: 'reports', name: 'Rapports', icon: FileText },
    { id: 'settings', name: 'Paramètres', icon: SettingsIcon },
  ];

  const periods = [
    'Aujourd\'hui', 'Hier', '7 derniers jours', 'Ce mois',
    'Mois dernier', 'Cette année', 'Année dernière', 'Période personnalisée'
  ];

  const currentPeriodIndex = periods.indexOf(selectedPeriod);

  const handlePreviousPeriod = () => {
    if (currentPeriodIndex > 0) {
      setSelectedPeriod(periods[currentPeriodIndex - 1]);
    }
  };

  const handleNextPeriod = () => {
    if (currentPeriodIndex < periods.length - 1) {
      setSelectedPeriod(periods[currentPeriodIndex + 1]);
    }
  };

  const getPeriodStats = () => {
    return {
      orders: orderStats.totalOrders,
      revenue: orderStats.totalRevenue,
      customers: 45,
      products: 128
    };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        const periodStats = getPeriodStats();
        return (
          <div className="space-y-6">
            {/* Période d'analyse */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Période d'analyse
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreviousPeriod}
                    disabled={currentPeriodIndex === 0}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Période précédente"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium min-w-[150px] text-center">
                    {selectedPeriod}
                  </span>
                  <button
                    onClick={handleNextPeriod}
                    disabled={currentPeriodIndex === periods.length - 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Période suivante"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grille des périodes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Commandes</p>
                    <p className="text-2xl font-bold text-gray-900">{periodStats.orders}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Période: {selectedPeriod}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenus</p>
                    <p className="text-2xl font-bold text-gray-900">{periodStats.revenue.toLocaleString()} FCFA</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Période: {selectedPeriod}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nouveaux clients</p>
                    <p className="text-2xl font-bold text-gray-900">{periodStats.customers}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Période: {selectedPeriod}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Produits vendus</p>
                    <p className="text-2xl font-bold text-gray-900">{periodStats.products}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Période: {selectedPeriod}</p>
              </div>
            </div>

            {/* Graphiques */}
            <DashboardCharts />
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestion des Commandes</h2>
              <OrderManagement />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres</h2>
              <Settings />
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <UserManagement />
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-6">
            <ClientManagement />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {menuItems.find(item => item.id === activeTab)?.name}
            </h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">Sciences Labs</h1>
            <p className="text-sm text-gray-600">Administration</p>
          </div>
          
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.name}
            </h1>
            <p className="text-gray-600">
              Bienvenue, {user?.name || 'Administrateur'}
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;