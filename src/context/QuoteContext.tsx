import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    establishment: string;
    city: string;
  };
  items: QuoteItem[];
  subtotal: number;
  tva: number;
  shipping: number;
  totalAmount: number;
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  validUntil: string;
  message?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  respondedAt?: string;
}

interface QuoteStats {
  totalQuotes: number;
  pendingQuotes: number;
  sentQuotes: number;
  acceptedQuotes: number;
  rejectedQuotes: number;
  expiredQuotes: number;
  totalValue: number;
  conversionRate: number;
}

interface QuoteContextType {
  quotes: Quote[];
  stats: QuoteStats;
  selectedQuote: Quote | null;
  filters: {
    status: string;
    priority: string;
    dateRange: string;
    customer: string;
  };
  setFilters: (filters: any) => void;
  setSelectedQuote: (quote: Quote | null) => void;
  updateQuoteStatus: (quoteId: string, status: Quote['status']) => void;
  updateQuotePriority: (quoteId: string, priority: Quote['priority']) => void;
  addQuoteNote: (quoteId: string, note: string) => void;
  createQuote: (quoteData: Omit<Quote, 'id' | 'quoteNumber' | 'createdAt' | 'updatedAt'>) => void;
  deleteQuote: (quoteId: string) => void;
  getQuotesByStatus: (status: string) => Quote[];
  searchQuotes: (query: string) => Quote[];
  exportQuotes: (format: 'csv' | 'pdf') => void;
  sendQuoteByEmail: (quoteId: string) => void;
  duplicateQuote: (quoteId: string) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: 'all',
    customer: ''
  });

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      quoteNumber: 'DEV-20240120-001',
      customer: {
        firstName: 'Amadou',
        lastName: 'Traoré',
        email: 'a.traore@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        establishment: 'Lycée Technique de Bamako',
        city: 'Bamako'
      },
      items: [
        {
          id: 1,
          productName: 'Bécher en Verre Borosilicate 50ml',
          quantity: 25,
          unitPrice: 8500,
          totalPrice: 212500
        },
        {
          id: 2,
          productName: 'Microscope Binoculaire 1000x',
          quantity: 2,
          unitPrice: 280000,
          totalPrice: 560000
        }
      ],
      subtotal: 772500,
      tva: 139050,
      shipping: 0,
      totalAmount: 911550,
      status: 'pending',
      priority: 'high',
      validUntil: '2024-02-20T00:00:00Z',
      message: 'Commande urgente pour le laboratoire de chimie',
      internalNotes: 'Client prioritaire - répondre rapidement',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      quoteNumber: 'DEV-20240118-002',
      customer: {
        firstName: 'Marie',
        lastName: 'Ouédraogo',
        email: 'm.ouedraogo@univ-ouaga.bf',
        phone: '+226 25 30 70 64',
        establishment: 'Université de Ouagadougou',
        city: 'Ouagadougou'
      },
      items: [
        {
          id: 3,
          productName: 'Armoire de Sécurité',
          quantity: 1,
          unitPrice: 320000,
          totalPrice: 320000
        }
      ],
      subtotal: 320000,
      tva: 57600,
      shipping: 45000,
      totalAmount: 422600,
      status: 'sent',
      priority: 'medium',
      validUntil: '2024-02-18T00:00:00Z',
      message: 'Installation requise sur site',
      internalNotes: 'Prévoir équipe technique pour installation',
      createdAt: '2024-01-18T14:45:00Z',
      updatedAt: '2024-01-19T09:20:00Z',
      sentAt: '2024-01-19T09:20:00Z'
    },
    {
      id: '3',
      quoteNumber: 'DEV-20240115-003',
      customer: {
        firstName: 'Jean',
        lastName: 'Kouassi',
        email: 'j.kouassi@ipa.ci',
        phone: '+225 21 35 42 18',
        establishment: 'Institut Polytechnique Abidjan',
        city: 'Abidjan'
      },
      items: [
        {
          id: 4,
          productName: 'Oscilloscope Numérique 2 Voies',
          quantity: 3,
          unitPrice: 195000,
          totalPrice: 585000
        }
      ],
      subtotal: 585000,
      tva: 105300,
      shipping: 35000,
      totalAmount: 725300,
      status: 'accepted',
      priority: 'medium',
      validUntil: '2024-02-15T00:00:00Z',
      message: 'Formation utilisateur incluse',
      internalNotes: 'Devis accepté - créer la commande',
      createdAt: '2024-01-15T09:15:00Z',
      updatedAt: '2024-01-20T16:30:00Z',
      sentAt: '2024-01-16T10:00:00Z',
      respondedAt: '2024-01-20T16:30:00Z'
    }
  ]);

  const stats: QuoteStats = {
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    sentQuotes: quotes.filter(q => q.status === 'sent').length,
    acceptedQuotes: quotes.filter(q => q.status === 'accepted').length,
    rejectedQuotes: quotes.filter(q => q.status === 'rejected').length,
    expiredQuotes: quotes.filter(q => q.status === 'expired').length,
    totalValue: quotes.reduce((sum, quote) => sum + quote.totalAmount, 0),
    conversionRate: quotes.length > 0 ? (quotes.filter(q => q.status === 'accepted').length / quotes.length) * 100 : 0
  };

  const updateQuoteStatus = (quoteId: string, status: Quote['status']) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { 
            ...quote, 
            status, 
            updatedAt: new Date().toISOString(),
            ...(status === 'sent' && !quote.sentAt ? { sentAt: new Date().toISOString() } : {}),
            ...(status === 'accepted' || status === 'rejected' ? { respondedAt: new Date().toISOString() } : {})
          }
        : quote
    ));
  };

  const updateQuotePriority = (quoteId: string, priority: Quote['priority']) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, priority, updatedAt: new Date().toISOString() }
        : quote
    ));
  };

  const addQuoteNote = (quoteId: string, note: string) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { 
            ...quote, 
            internalNotes: note,
            updatedAt: new Date().toISOString() 
          }
        : quote
    ));
  };

  const createQuote = (quoteData: Omit<Quote, 'id' | 'quoteNumber' | 'createdAt' | 'updatedAt'>) => {
    const newQuote: Quote = {
      ...quoteData,
      id: Date.now().toString(),
      quoteNumber: `DEV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(quotes.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setQuotes(prev => [...prev, newQuote]);
  };

  const deleteQuote = (quoteId: string) => {
    setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
  };

  const getQuotesByStatus = (status: string) => {
    return status === 'all' ? quotes : quotes.filter(quote => quote.status === status);
  };

  const searchQuotes = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return quotes.filter(quote => 
      quote.quoteNumber.toLowerCase().includes(lowercaseQuery) ||
      quote.customer.firstName.toLowerCase().includes(lowercaseQuery) ||
      quote.customer.lastName.toLowerCase().includes(lowercaseQuery) ||
      quote.customer.email.toLowerCase().includes(lowercaseQuery) ||
      quote.customer.establishment.toLowerCase().includes(lowercaseQuery)
    );
  };

  const exportQuotes = (format: 'csv' | 'pdf') => {
    console.log(`Exporting quotes in ${format} format`);
  };

  const sendQuoteByEmail = (quoteId: string) => {
    updateQuoteStatus(quoteId, 'sent');
    console.log(`Sending quote ${quoteId} by email`);
  };

  const duplicateQuote = (quoteId: string) => {
    const originalQuote = quotes.find(q => q.id === quoteId);
    if (originalQuote) {
      const duplicatedQuote: Quote = {
        ...originalQuote,
        id: Date.now().toString(),
        quoteNumber: `DEV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(quotes.length + 1).padStart(3, '0')}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sentAt: undefined,
        respondedAt: undefined,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 jours
      };
      setQuotes(prev => [...prev, duplicatedQuote]);
    }
  };

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        stats,
        selectedQuote,
        filters,
        setFilters,
        setSelectedQuote,
        updateQuoteStatus,
        updateQuotePriority,
        addQuoteNote,
        createQuote,
        deleteQuote,
        getQuotesByStatus,
        searchQuotes,
        exportQuotes,
        sendQuoteByEmail,
        duplicateQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};