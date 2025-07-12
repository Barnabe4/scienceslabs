import React, { useState } from 'react';
import { FileText, Download, Printer, Calendar, BarChart3, PieChart, TrendingUp, DollarSign, ArrowRight, ChevronDown, FileSpreadsheet, File as FilePdf, Mail } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { 
  SalesChart, 
  ProfitChart, 
  TransactionsChart 
} from '../components/DashboardCharts';

const FinancialReports = () => {
  const { stats, financialEntries } = useDashboard();
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [showReportOptions, setShowReportOptions] = useState(false);

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

  const reports = [
    { id: 'revenue', name: 'Rapport de revenus', icon: TrendingUp },
    { id: 'expense', name: 'Rapport de dépenses', icon: ShoppingBag },
    { id: 'profit', name: 'Rapport de bénéfices', icon: DollarSign },
    { id: 'tax', name: 'Rapport de TVA', icon: FileText },
    { id: 'product', name: 'Ventes par produit', icon: Package },
    { id: 'category', name: 'Ventes par catégorie', icon: PieChart },
    { id: 'customer', name: 'Rapport clients', icon: Users },
    { id: 'payment', name: 'Méthodes de paiement', icon: CreditCard }
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleGenerateReport = () => {
    alert(`Génération du rapport ${selectedReport} pour la période ${selectedPeriod}`);
  };

  const handleExportCSV = () => {
    alert('Export CSV en cours...');
  };

  const handleExportPDF = () => {
    alert('Export PDF en cours...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = () => {
    alert('Envoi du rapport par email...');
  };

  // Composant pour les cartes de rapport
  const ReportCard = ({ title, icon: Icon, description, onClick }: { 
    title: string; 
    icon: React.ComponentType<any>; 
    description: string;
    onClick: () => void;
  }) => (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
        Générer
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports Financiers</h1>
          <p className="text-gray-600">Générez et analysez vos rapports financiers</p>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Générateur de Rapports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de rapport
            </label>
            <div className="relative">
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {reports.map(report => (
                  <option key={report.id} value={report.id}>{report.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Période
            </label>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
              <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Générer le rapport
            </button>
          </div>
        </div>

        {selectedPeriod === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {showReportOptions && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Options du rapport</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="detailed">Détaillé</option>
                  <option value="summary">Résumé</option>
                  <option value="chart">Graphiques uniquement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grouper par
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="day">Jour</option>
                  <option value="week">Semaine</option>
                  <option value="month">Mois</option>
                  <option value="category">Catégorie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inclure les taxes
                </label>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="include-taxes"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="include-taxes" className="ml-2 text-sm text-gray-700">
                    Inclure les détails de TVA
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowReportOptions(!showReportOptions)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            {showReportOptions ? 'Masquer les options avancées' : 'Afficher les options avancées'}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showReportOptions ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Exporter en CSV"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1" />
              CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Exporter en PDF"
            >
              <FilePdf className="w-4 h-4 mr-1" />
              PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Imprimer"
            >
              <Printer className="w-4 h-4 mr-1" />
              Imprimer
            </button>
            <button
              onClick={handleEmailReport}
              className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Envoyer par email"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Aperçu du Rapport</h2>
          <div className="text-sm text-gray-600">
            Période: {periods.find(p => p.id === selectedPeriod)?.name}
          </div>
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Revenus</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Dépenses</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalExpenses)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Bénéfice Net</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.netProfit)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Marge</div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((stats.netProfit / stats.totalRevenue) * 100)}%
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Répartition des Revenus</h3>
              <div className="h-64">
                <SalesChart />
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Marge Bénéficiaire</h3>
              <div className="h-64">
                <ProfitChart />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financialEntries.slice(0, 5).map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={entry.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          entry.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
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
      </div>

      {/* Available Reports */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Rapports Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportCard
            title="Rapport de Revenus"
            icon={TrendingUp}
            description="Analyse détaillée des revenus par période et source"
            onClick={() => {
              setSelectedReport('revenue');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Rapport de Dépenses"
            icon={ShoppingBag}
            description="Suivi des dépenses par catégorie et période"
            onClick={() => {
              setSelectedReport('expense');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Rapport de Bénéfices"
            icon={DollarSign}
            description="Analyse de la rentabilité et des marges"
            onClick={() => {
              setSelectedReport('profit');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Rapport de TVA"
            icon={FileText}
            description="Calcul des taxes collectées pour déclaration"
            onClick={() => {
              setSelectedReport('tax');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Ventes par Produit"
            icon={Package}
            description="Analyse des ventes par produit et performance"
            onClick={() => {
              setSelectedReport('product');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Ventes par Catégorie"
            icon={PieChart}
            description="Répartition des ventes par catégorie de produits"
            onClick={() => {
              setSelectedReport('category');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Rapport Clients"
            icon={Users}
            description="Analyse des clients et de leur valeur"
            onClick={() => {
              setSelectedReport('customer');
              handleGenerateReport();
            }}
          />
          <ReportCard
            title="Méthodes de Paiement"
            icon={CreditCard}
            description="Analyse des moyens de paiement utilisés"
            onClick={() => {
              setSelectedReport('payment');
              handleGenerateReport();
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Import these components at the top of the file
import { ShoppingBag, Package, Users, CreditCard } from 'lucide-react';

export default FinancialReports;