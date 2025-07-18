import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { useOrders } from '../context/OrderContext';
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
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';
import OrderManagement from './OrderManagement';
import Settings from './Settings';
import ClientManagement from './ClientManagement';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import Finance from './Finance';
import QuoteManagement from './QuoteManagement';
import InvoiceManagement from './InvoiceManagement';
import ReportsManagement from './ReportsManagement';
import AboutManagement from './AboutManagement';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats } = useDashboard();
  const { orders, stats: orderStats } = useOrders();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('Hier');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'tasks', name: 'Gestion des tâches', icon: CheckSquare },
    { id: 'users', name: 'Gestion des utilisateurs', icon: Users },
    { id: 'orders', name: 'Commandes', icon: Package },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'products', name: 'Produits', icon: ShoppingCart },
    { id: 'quotes', name: 'Devis', icon: FileText },
    { id: 'invoices', name: 'Facturation', icon: FileText },
    { id: 'reports', name: 'Rapports', icon: BarChart3 },
    { id: 'about', name: 'À propos', icon: Users },
    { 
      id: 'finance', 
      name: 'Finances', 
      icon: DollarSign,
      hasSubmenu: true,
      submenu: [
        { id: 'finance-dashboard', name: 'Tableau de bord', icon: BarChart3 },
        { id: 'finance-revenue', name: 'Revenus', icon: TrendingUp },
        { id: 'finance-expenses', name: 'Dépenses', icon: TrendingDown },
        { id: 'finance-invoices', name: 'Factures', icon: FileText },
        { id: 'finance-reports', name: 'Rapports', icon: BarChart3 },
        { id: 'finance-settings', name: 'Paramètres', icon: SettingsIcon }
      ]
    },
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

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
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
        
      case 'quotes':
        return (
          <div className="space-y-6">
            <QuoteManagement />
          </div>
        );
        
      case 'products':
        return (
          <div className="space-y-6">
            <ProductManagement />
          </div>
      );
      
      case 'invoices':
        return (
          <div className="space-y-6">
            <InvoiceManagement />
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6">
            <ReportsManagement />
          </div>
        );
      
      case 'about':
        return (
          <div className="space-y-6">
            <AboutManagement />
          </div>
        );
      
      case 'finance':
      case 'finance-dashboard':
      case 'finance-revenue':
      case 'finance-expenses':
      case 'finance-invoices':
      case 'finance-reports':
      case 'finance-settings':
        return (
          <div className="space-y-6">
            <Finance />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {menuItems.find(item => item.id === activeTab)?.name}
            </h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800">Tâches en cours</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-yellow-700">
                    <input type="checkbox" className="mr-2" />
                    Vérifier le stock des béchers
                  </li>
                  <li className="flex items-center text-yellow-700">
                    <input type="checkbox" className="mr-2" />
                    Préparer la commande CMD-2024-001
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800">Tâches terminées</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-green-700">
                    <input type="checkbox" checked className="mr-2" />
                    Mise à jour du catalogue
                  </li>
                </ul>
              </div>
            </div>
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
              const isExpanded = expandedMenus.includes(item.id);
              const isActive = activeTab === item.id || (item.submenu && item.submenu.some(sub => sub.id === activeTab));
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.hasSubmenu) {
                        toggleMenu(item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.hasSubmenu && (
                      <div className="mr-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {item.hasSubmenu && isExpanded && item.submenu && (
                    <div className="bg-gray-50">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => setActiveTab(subItem.id)}
                            className={`w-full flex items-center px-12 py-2 text-left hover:bg-gray-100 transition-colors ${
                              activeTab === subItem.id
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-600'
                            }`}
                          >
                            <SubIcon className="w-4 h-4 mr-3" />
                            <span className="text-sm font-medium">{subItem.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {(() => {
                const mainItem = menuItems.find(item => item.id === activeTab);
                if (mainItem) return mainItem.name;
                
                // Chercher dans les sous-menus
                for (const item of menuItems) {
                  if (item.submenu) {
                    const subItem = item.submenu.find(sub => sub.id === activeTab);
                    if (subItem) return `${item.name} - ${subItem.name}`;
                  }
                }
                return 'Tableau de bord';
              })()}
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