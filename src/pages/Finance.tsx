import React, { useState } from 'react';
import { 
  BarChart3, DollarSign, FileText, Settings as SettingsIcon, 
  CreditCard, ShoppingBag, TrendingUp, ChevronRight
} from 'lucide-react';
import FinancialDashboard from './FinancialDashboard';
import RevenueManagement from './RevenueManagement';
import ExpenseManagement from './ExpenseManagement';
import InvoiceManagement from './InvoiceManagement';
import FinancialSettings from './FinancialSettings';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

const Finance = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      name: 'Tableau de bord', 
      icon: BarChart3,
      description: 'Vue d\'ensemble des finances'
    },
    { 
      id: 'revenue', 
      name: 'Revenus', 
      icon: TrendingUp,
      description: 'Gestion des paiements reçus'
    },
    { 
      id: 'expenses', 
      name: 'Dépenses', 
      icon: ShoppingBag,
      description: 'Suivi des dépenses'
    },
    { 
      id: 'invoices', 
      name: 'Factures', 
      icon: FileText,
      description: 'Gestion des factures'
    },
    { 
      id: 'reports', 
      name: 'Rapports', 
      icon: BarChart3,
      description: 'Rapports financiers'
    },
    { 
      id: 'settings', 
      name: 'Paramètres', 
      icon: SettingsIcon,
      description: 'Configuration financière'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <FinancialDashboard />;
      case 'revenue': return <RevenueManagement />;
      case 'expenses': return <ExpenseManagement />;
      case 'invoices': return <InvoiceManagement />;
      case 'reports': return <FinancialReports />;
      case 'settings': return <FinancialSettings />;
      default: return <FinancialDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">Finances</h1>
            <p className="text-sm text-gray-600">Gestion financière</p>
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

          {/* Quick Links */}
          <div className="p-6 mt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Accès rapide
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 py-2">
                <span>Factures impayées</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 py-2">
                <span>Paiements récents</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 py-2">
                <span>Bilan mensuel</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Finance;