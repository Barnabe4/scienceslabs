import React, { useState } from 'react';
import { 
  BarChart3, FileText, Download, Printer, Calendar, Filter, 
  TrendingUp, TrendingDown, DollarSign, Users, Package, 
  ShoppingCart, Eye, ArrowRight, ChevronDown, Settings,
  PieChart, LineChart, Activity, Target, Zap
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useOrders } from '../context/OrderContext';
import { useQuotes } from '../context/QuoteContext';
import { useCategories } from '../context/CategoryContext';
import { 
  SalesChart, 
  ProfitChart, 
  ConversionChart, 
  CartAbandonChart, 
  OrderSizeChart, 
  SiteTrafficChart, 
  TransactionsChart 
} from '../components/DashboardCharts';

const ReportsManagement = () => {
  const { stats: dashboardStats, financialEntries } = useDashboard();
  const { stats: orderStats, orders } = useOrders();
  const { stats: quoteStats, quotes } = useQuotes();
  const { categories } = useCategories();
  
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  const periods = [
    { id: 'today', name: 'Aujourd\'hui' },
    { id: 'yesterday', name: 'Hier' },
    { id: 'last-7-days', name: '7 derniers jours' },
    { id: 'this-month', name: 'Ce mois' },
    { id: 'last-month', name: 'Mois dernier' },
    { id: 'this-quarter', name: 'Ce trimestre' },
    { id: 'last-quarter', name: 'Trimestre dernier' },
    { id: 'this-year', name: 'Cette année' },
    { id: 'last-year', name: 'Année dernière' },
    { id: 'custom', name: 'Période personnalisée' }
  ];

  const reportTypes = [
    { 
      id: 'overview', 
      name: 'Vue d\'ensemble', 
      icon: BarChart3,
      description: 'Aperçu global des performances'
    },
    { 
      id: 'sales', 
      name: 'Rapport des ventes', 
      icon: TrendingUp,
      description: 'Analyse détaillée des ventes'
    },
    { 
      id: 'financial', 
      name: 'Rapport financier', 
      icon: DollarSign,
      description: 'Revenus, dépenses et bénéfices'
    },
    { 
      id: 'customers', 
      name: 'Rapport clients', 
      icon: Users,
      description: 'Analyse de la clientèle'
    },
    { 
      id: 'products', 
      name: 'Rapport produits', 
      icon: Package,
      description: 'Performance des produits'
    },
    { 
      id: 'quotes', 
      name: 'Rapport devis', 
      icon: FileText,
      description: 'Suivi des devis et conversions'
    },
    { 
      id: 'inventory', 
      name: 'Rapport stock', 
      icon: Package,
      description: 'État des stocks et mouvements'
    },
    { 
      id: 'performance', 
      name: 'Indicateurs de performance', 
      icon: Target,
      description: 'KPIs et métriques clés'
    }
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleGenerateReport = () => {
    alert(`Génération du rapport ${selectedReport} pour la période ${selectedPeriod}`);
  };

  const handleExportPDF = () => {
    alert('Export PDF en cours...');
  };

  const handleExportCSV = () => {
    alert('Export CSV en cours...');
  };

  const handlePrint = () => {
    window.print();
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(dashboardStats.totalRevenue)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% vs période précédente</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-green-600">{orderStats.totalOrders}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8% vs période précédente</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Devis</p>
              <p className="text-2xl font-bold text-purple-600">{quoteStats.totalQuotes}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-600">Taux conversion: {quoteStats.conversionRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bénéfice Net</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(dashboardStats.netProfit)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15% vs période précédente</span>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du Chiffre d'Affaires</h3>
          <div className="h-64">
            <SiteTrafficChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Ventes</h3>
          <div className="h-64">
            <SalesChart />
          </div>
        </div>
      </div>

      {/* Top produits et clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Produits</h3>
          <div className="space-y-3">
            {[
              { name: 'Bécher en Verre Borosilicate', sales: 156, revenue: 1326000 },
              { name: 'Microscope Binoculaire', sales: 23, revenue: 6440000 },
              { name: 'Oscilloscope Numérique', sales: 12, revenue: 2340000 },
              { name: 'Armoire de Sécurité', sales: 8, revenue: 2560000 },
              { name: 'Paillasse de Laboratoire', sales: 15, revenue: 2775000 }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} ventes</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{formatCurrency(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Clients</h3>
          <div className="space-y-3">
            {[
              { name: 'Institut Polytechnique Abidjan', orders: 12, revenue: 3200000 },
              { name: 'Lycée Technique de Bamako', orders: 15, revenue: 2450000 },
              { name: 'Université de Ouagadougou', orders: 8, revenue: 1850000 },
              { name: 'Collège Moderne Niamey', orders: 6, revenue: 980000 },
              { name: 'École Supérieure Dakar', orders: 4, revenue: 750000 }
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.orders} commandes</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(client.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventes par Catégorie</h3>
          <div className="h-64">
            <SalesChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Commandes</h3>
          <div className="h-64">
            <OrderSizeChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux de Conversion</h3>
          <div className="h-64">
            <ConversionChart />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des Ventes par Période</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Période</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commandes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Panier Moyen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Évolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { period: 'Janvier 2024', orders: 45, revenue: 2850000, avg: 63333, growth: '+12%' },
                { period: 'Décembre 2023', orders: 38, revenue: 2340000, avg: 61579, growth: '+8%' },
                { period: 'Novembre 2023', orders: 42, revenue: 2680000, avg: 63810, growth: '+15%' },
                { period: 'Octobre 2023', orders: 35, revenue: 2120000, avg: 60571, growth: '+5%' }
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.period}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.orders}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(row.revenue)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(row.avg)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-green-600 font-medium">{row.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marge Bénéficiaire</h3>
          <div className="h-64">
            <ProfitChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions par Catégorie</h3>
          <div className="h-64">
            <TransactionsChart />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé Financier</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Revenus Totaux</h4>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(dashboardStats.totalRevenue)}</p>
            <p className="text-sm text-green-700 mt-1">+12% vs période précédente</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Dépenses Totales</h4>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(dashboardStats.totalExpenses)}</p>
            <p className="text-sm text-red-700 mt-1">+5% vs période précédente</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Bénéfice Net</h4>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(dashboardStats.netProfit)}</p>
            <p className="text-sm text-blue-700 mt-1">Marge: {Math.round((dashboardStats.netProfit / dashboardStats.totalRevenue) * 100)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions Récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {financialEntries.slice(0, 5).map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(entry.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{entry.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{entry.category}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={entry.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      entry.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.type === 'income' ? 'Revenu' : 'Dépense'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderQuotesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devis</p>
              <p className="text-2xl font-bold text-gray-900">{quoteStats.totalQuotes}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Devis Acceptés</p>
              <p className="text-2xl font-bold text-green-600">{quoteStats.acceptedQuotes}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-2xl font-bold text-purple-600">{quoteStats.conversionRate.toFixed(1)}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur Totale</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(quoteStats.totalValue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des Devis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Devis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.slice(0, 5).map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{quote.quoteNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {quote.customer.firstName} {quote.customer.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(quote.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      quote.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(quote.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs Clés</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Panier Moyen:</span>
              <span className="font-bold text-blue-600">{formatCurrency(orderStats.averageOrderValue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux de Conversion:</span>
              <span className="font-bold text-green-600">{orderStats.conversionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nouveaux Clients:</span>
              <span className="font-bold text-purple-600">{dashboardStats.newCustomers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Produits Vendus:</span>
              <span className="font-bold text-orange-600">{dashboardStats.productsSold}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs vs Réalisé</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Chiffre d'Affaires</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatCurrency(dashboardStats.totalRevenue)} / {formatCurrency(10000000)}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Commandes</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {orderStats.totalOrders} / 100 commandes
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Nouveaux Clients</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {dashboardStats.newCustomers} / 60 clients
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes & Recommandations</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Stock faible</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">5 produits en rupture de stock</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Performance excellente</span>
              </div>
              <p className="text-xs text-green-700 mt-1">Objectifs dépassés ce mois</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <Target className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Opportunité</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">3 devis en attente de suivi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Performances</h3>
          <div className="h-64">
            <SiteTrafficChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Activités</h3>
          <div className="h-64">
            <TransactionsChart />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview': return renderOverviewReport();
      case 'sales': return renderSalesReport();
      case 'financial': return renderFinancialReport();
      case 'quotes': return renderQuotesReport();
      case 'performance': return renderPerformanceReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports & Analyses</h1>
          <p className="text-gray-600">Analysez les performances de votre entreprise</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
              <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Générer le rapport
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les clients</option>
                  <option value="schools">Écoles</option>
                  <option value="universities">Universités</option>
                  <option value="individuals">Particuliers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Toutes les régions</option>
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

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <Icon className={`w-5 h-5 mr-2 ${
                  selectedReport === report.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  selectedReport === report.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {report.name}
                </span>
              </div>
              <p className={`text-sm ${
                selectedReport === report.id ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {report.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </h2>
          <div className="text-sm text-gray-600">
            Période: {periods.find(p => p.id === selectedPeriod)?.name}
          </div>
        </div>
        
        {renderReportContent()}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Rapport personnalisé</h4>
              <p className="text-sm text-gray-600">Créer un rapport sur mesure</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Rapport programmé</h4>
              <p className="text-sm text-gray-600">Programmer l'envoi automatique</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-8 h-8 text-purple-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Configurer les KPIs</h4>
              <p className="text-sm text-gray-600">Personnaliser les indicateurs</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;