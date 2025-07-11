import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FinancialEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface ProductSales {
  categoryId: string;
  categoryName: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalOrders: number;
  newCustomers: number;
  productsSold: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface DashboardContextType {
  stats: DashboardStats;
  financialEntries: FinancialEntry[];
  productSales: ProductSales[];
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  addFinancialEntry: (entry: Omit<FinancialEntry, 'id'>) => void;
  updateFinancialEntry: (id: string, updates: Partial<FinancialEntry>) => void;
  deleteFinancialEntry: (id: string) => void;
  getStatsForPeriod: (period: string) => DashboardStats;
  getSalesDataForPeriod: (period: string) => ProductSales[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  
  const [financialEntries, setFinancialEntries] = useState<FinancialEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      category: 'revenue',
      description: 'Vente équipements chimie',
      amount: 450000,
      type: 'income'
    },
    {
      id: '2',
      date: '2024-01-14',
      category: 'revenue',
      description: 'Vente microscopes',
      amount: 280000,
      type: 'income'
    },
    {
      id: '3',
      date: '2024-01-13',
      category: 'electricity',
      description: 'Facture électricité janvier',
      amount: 85000,
      type: 'expense'
    },
    {
      id: '4',
      date: '2024-01-12',
      category: 'store-rent',
      description: 'Loyer magasin janvier',
      amount: 150000,
      type: 'expense'
    },
    {
      id: '5',
      date: '2024-01-11',
      category: 'secretary-salary',
      description: 'Salaire secrétaires janvier',
      amount: 200000,
      type: 'expense'
    },
    {
      id: '6',
      date: '2024-01-10',
      category: 'director-salary',
      description: 'Salaire directeur janvier',
      amount: 300000,
      type: 'expense'
    }
  ]);

  const [productSales] = useState<ProductSales[]>([
    { categoryId: 'chemistry', categoryName: 'Équipement de Chimie', sales: 156, revenue: 2450000, growth: 12 },
    { categoryId: 'reagents', categoryName: 'Réactifs', sales: 89, revenue: 890000, growth: 8 },
    { categoryId: 'physics', categoryName: 'Équipement de Physique', sales: 45, revenue: 1350000, growth: 15 },
    { categoryId: 'biology', categoryName: 'Équipement de SVT', sales: 67, revenue: 1120000, growth: 10 },
    { categoryId: 'safety', categoryName: 'Équipement de Sécurité', sales: 234, revenue: 780000, growth: 18 },
    { categoryId: 'furniture', categoryName: 'Mobilier de Laboratoire', sales: 23, revenue: 920000, growth: 5 },
    { categoryId: 'training', categoryName: 'Formations', sales: 12, revenue: 480000, growth: 25 },
    { categoryId: 'miscellaneous', categoryName: 'Divers', sales: 78, revenue: 340000, growth: -2 }
  ]);

  const stats: DashboardStats = {
    totalRevenue: productSales.reduce((sum, cat) => sum + cat.revenue, 0),
    totalExpenses: financialEntries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0),
    netProfit: 0,
    totalOrders: productSales.reduce((sum, cat) => sum + cat.sales, 0),
    newCustomers: 45,
    productsSold: 1247,
    averageOrderValue: 85000,
    conversionRate: 3.2
  };

  stats.netProfit = stats.totalRevenue - stats.totalExpenses;

  const addFinancialEntry = (entry: Omit<FinancialEntry, 'id'>) => {
    const newEntry: FinancialEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setFinancialEntries(prev => [...prev, newEntry]);
  };

  const updateFinancialEntry = (id: string, updates: Partial<FinancialEntry>) => {
    setFinancialEntries(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
    );
  };

  const deleteFinancialEntry = (id: string) => {
    setFinancialEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getStatsForPeriod = (period: string): DashboardStats => {
    // Simulation de données pour différentes périodes
    const multiplier = period === 'today' ? 0.1 : period === 'yesterday' ? 0.08 : 1;
    return {
      totalRevenue: Math.round(stats.totalRevenue * multiplier),
      totalExpenses: Math.round(stats.totalExpenses * multiplier),
      netProfit: Math.round(stats.netProfit * multiplier),
      totalOrders: Math.round(stats.totalOrders * multiplier),
      newCustomers: Math.round(stats.newCustomers * multiplier),
      productsSold: Math.round(stats.productsSold * multiplier),
      averageOrderValue: stats.averageOrderValue,
      conversionRate: stats.conversionRate
    };
  };

  const getSalesDataForPeriod = (period: string): ProductSales[] => {
    const multiplier = period === 'today' ? 0.1 : period === 'yesterday' ? 0.08 : 1;
    return productSales.map(cat => ({
      ...cat,
      sales: Math.round(cat.sales * multiplier),
      revenue: Math.round(cat.revenue * multiplier)
    }));
  };

  return (
    <DashboardContext.Provider
      value={{
        stats,
        financialEntries,
        productSales,
        selectedPeriod,
        setSelectedPeriod,
        addFinancialEntry,
        updateFinancialEntry,
        deleteFinancialEntry,
        getStatsForPeriod,
        getSalesDataForPeriod,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};