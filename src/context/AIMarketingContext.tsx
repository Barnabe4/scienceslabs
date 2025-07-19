import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AICampaign {
  id: string;
  name: string;
  type: 'facebook' | 'google' | 'instagram' | 'linkedin' | 'email' | 'sms';
  status: 'draft' | 'learning' | 'active' | 'paused' | 'completed';
  aiMode: 'auto' | 'assisted' | 'manual';
  budget: number;
  spent: number;
  objective: 'awareness' | 'traffic' | 'leads' | 'conversions' | 'sales';
  audience: {
    size: number;
    demographics: string;
    interests: string[];
    lookalike: boolean;
  };
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    conversionRate: number;
    cpa: number;
    roas: number;
    leads: number;
  };
  aiInsights: {
    optimization: string;
    recommendations: string[];
    predictedPerformance: number;
    confidence: number;
  };
  createdAt: string;
  lastOptimized: string;
}

interface AILead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  campaign: string;
  aiScore: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  tags: string[];
  interests: string[];
  behavior: {
    pageViews: number;
    timeOnSite: number;
    downloads: number;
    emailOpens: number;
    emailClicks: number;
  };
  aiInsights: {
    buyingIntent: number;
    bestContactTime: string;
    preferredChannel: string;
    nextAction: string;
    conversionProbability: number;
  };
  estimatedValue: number;
  lastActivity: string;
  createdAt: string;
}

interface AIAutomation {
  id: string;
  name: string;
  type: 'lead_nurturing' | 'retargeting' | 'lookalike' | 'conversion_optimization';
  platform: 'facebook' | 'google' | 'instagram' | 'linkedin' | 'email';
  status: 'active' | 'paused' | 'learning' | 'draft';
  triggers: string[];
  actions: string[];
  performance: {
    triggered: number;
    completed: number;
    conversionRate: number;
    revenue: number;
  };
  aiConfig: {
    learningMode: boolean;
    optimizationGoal: string;
    audienceExpansion: boolean;
    budgetOptimization: boolean;
  };
}

interface AIMarketingStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalBudget: number;
  totalSpent: number;
  totalLeads: number;
  qualifiedLeads: number;
  avgConversionRate: number;
  avgROAS: number;
  aiOptimizations: number;
  automationsActive: number;
}

interface AIMarketingContextType {
  campaigns: AICampaign[];
  leads: AILead[];
  automations: AIAutomation[];
  stats: AIMarketingStats;
  
  // Campaign management
  addCampaign: (campaign: Omit<AICampaign, 'id' | 'createdAt' | 'lastOptimized'>) => void;
  updateCampaign: (id: string, updates: Partial<AICampaign>) => void;
  deleteCampaign: (id: string) => void;
  optimizeCampaignWithAI: (id: string) => void;
  
  // Lead management
  addLead: (lead: Omit<AILead, 'id' | 'aiScore' | 'aiInsights' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<AILead>) => void;
  scoreLeadWithAI: (id: string) => void;
  
  // Automation management
  addAutomation: (automation: Omit<AIAutomation, 'id'>) => void;
  updateAutomation: (id: string, updates: Partial<AIAutomation>) => void;
  deleteAutomation: (id: string) => void;
  
  // AI functions
  generateAIRecommendations: () => string[];
  predictCampaignPerformance: (campaignId: string) => number;
  optimizeAudience: (campaignId: string) => void;
  autoScalebudget: (campaignId: string) => void;
}

const AIMarketingContext = createContext<AIMarketingContextType | undefined>(undefined);

export const AIMarketingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<AICampaign[]>([
    {
      id: '1',
      name: 'Campagne IA - Équipements Chimie',
      type: 'facebook',
      status: 'active',
      aiMode: 'auto',
      budget: 500000,
      spent: 125000,
      objective: 'leads',
      audience: {
        size: 15000,
        demographics: 'Enseignants 25-55 ans, Mali/Burkina',
        interests: ['éducation', 'sciences', 'laboratoire'],
        lookalike: true
      },
      performance: {
        impressions: 45000,
        clicks: 1350,
        ctr: 3.0,
        conversions: 89,
        conversionRate: 6.6,
        cpa: 1404,
        roas: 4.2,
        leads: 89
      },
      aiInsights: {
        optimization: 'Performance excellente - Budget recommandé +20%',
        recommendations: [
          'Augmenter le budget de 20% pour maximiser les conversions',
          'Tester de nouvelles créatives vidéo',
          'Élargir l\'audience aux pays voisins'
        ],
        predictedPerformance: 85,
        confidence: 92
      },
      createdAt: '2024-01-15T10:00:00Z',
      lastOptimized: '2024-01-20T14:30:00Z'
    }
  ]);

  const [leads, setLeads] = useState<AILead[]>([
    {
      id: '1',
      name: 'Dr. Amadou Traoré',
      email: 'a.traore@lyceetechnique.ml',
      phone: '+223 20 22 33 44',
      company: 'Lycée Technique de Bamako',
      source: 'Facebook Ads',
      campaign: 'Campagne IA - Équipements Chimie',
      aiScore: 92,
      status: 'qualified',
      tags: ['lycée', 'chimie', 'priorité'],
      interests: ['équipements chimie', 'formation', 'sécurité'],
      behavior: {
        pageViews: 15,
        timeOnSite: 1250,
        downloads: 3,
        emailOpens: 8,
        emailClicks: 5
      },
      aiInsights: {
        buyingIntent: 85,
        bestContactTime: '14h-16h',
        preferredChannel: 'email',
        nextAction: 'Envoyer devis personnalisé',
        conversionProbability: 78
      },
      estimatedValue: 450000,
      lastActivity: '2024-01-20T15:30:00Z',
      createdAt: '2024-01-18T09:00:00Z'
    }
  ]);

  const [automations, setAutomations] = useState<AIAutomation[]>([
    {
      id: '1',
      name: 'Séquence de Nurturing IA - Prospects Chimie',
      type: 'lead_nurturing',
      platform: 'email',
      status: 'active',
      triggers: ['Téléchargement catalogue', 'Visite page produit', 'Abandon panier'],
      actions: ['Email personnalisé', 'Retargeting Facebook', 'SMS de relance'],
      performance: {
        triggered: 245,
        completed: 189,
        conversionRate: 12.8,
        revenue: 1850000
      },
      aiConfig: {
        learningMode: true,
        optimizationGoal: 'conversions',
        audienceExpansion: true,
        budgetOptimization: true
      }
    }
  ]);

  const stats: AIMarketingStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(l => l.status === 'qualified').length,
    avgConversionRate: campaigns.reduce((sum, c) => sum + c.performance.conversionRate, 0) / campaigns.length,
    avgROAS: campaigns.reduce((sum, c) => sum + c.performance.roas, 0) / campaigns.length,
    aiOptimizations: 15,
    automationsActive: automations.filter(a => a.status === 'active').length
  };

  // Campaign management
  const addCampaign = (campaignData: Omit<AICampaign, 'id' | 'createdAt' | 'lastOptimized'>) => {
    const newCampaign: AICampaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastOptimized: new Date().toISOString()
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<AICampaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { ...campaign, ...updates, lastOptimized: new Date().toISOString() }
        : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const optimizeCampaignWithAI = (id: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { 
            ...campaign, 
            lastOptimized: new Date().toISOString(),
            aiInsights: {
              ...campaign.aiInsights,
              optimization: 'Optimisation IA appliquée avec succès',
              confidence: Math.min(100, campaign.aiInsights.confidence + 5)
            }
          }
        : campaign
    ));
  };

  // Lead management
  const addLead = (leadData: Omit<AILead, 'id' | 'aiScore' | 'aiInsights' | 'createdAt'>) => {
    const aiScore = Math.floor(Math.random() * 40) + 60; // Score entre 60-100
    const newLead: AILead = {
      ...leadData,
      id: Date.now().toString(),
      aiScore,
      aiInsights: {
        buyingIntent: Math.floor(Math.random() * 50) + 50,
        bestContactTime: '14h-16h',
        preferredChannel: 'email',
        nextAction: 'Envoyer email de bienvenue',
        conversionProbability: Math.floor(Math.random() * 40) + 40
      },
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (id: string, updates: Partial<AILead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const scoreLeadWithAI = (id: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id 
        ? { 
            ...lead, 
            aiScore: Math.min(100, lead.aiScore + Math.floor(Math.random() * 10)),
            lastActivity: new Date().toISOString()
          }
        : lead
    ));
  };

  // Automation management
  const addAutomation = (automationData: Omit<AIAutomation, 'id'>) => {
    const newAutomation: AIAutomation = {
      ...automationData,
      id: Date.now().toString()
    };
    setAutomations(prev => [...prev, newAutomation]);
  };

  const updateAutomation = (id: string, updates: Partial<AIAutomation>) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id ? { ...automation, ...updates } : automation
    ));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  // AI functions
  const generateAIRecommendations = (): string[] => {
    return [
      'Augmenter le budget des campagnes performantes de 15-25%',
      'Créer une audience lookalike basée sur vos meilleurs clients',
      'Tester des créatives vidéo pour améliorer l\'engagement',
      'Lancer une campagne de retargeting pour les visiteurs récents',
      'Optimiser les heures de diffusion selon l\'activité de votre audience',
      'Créer des séquences d\'emails automatisées pour les leads'
    ];
  };

  const predictCampaignPerformance = (campaignId: string): number => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return 0;
    
    // Simulation de prédiction basée sur les performances actuelles
    const basePerformance = campaign.performance.conversionRate;
    const aiBoost = campaign.aiMode === 'auto' ? 1.2 : 1.0;
    return Math.round(basePerformance * aiBoost * 100) / 100;
  };

  const optimizeAudience = (campaignId: string) => {
    updateCampaign(campaignId, {
      audience: {
        ...campaigns.find(c => c.id === campaignId)?.audience!,
        size: Math.round(campaigns.find(c => c.id === campaignId)?.audience.size! * 1.15)
      }
    });
  };

  const autoScalebudget = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    const newBudget = Math.round(campaign.budget * 1.2);
    updateCampaign(campaignId, { budget: newBudget });
  };

  return (
    <AIMarketingContext.Provider
      value={{
        campaigns,
        leads,
        automations,
        stats,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        optimizeCampaignWithAI,
        addLead,
        updateLead,
        scoreLeadWithAI,
        addAutomation,
        updateAutomation,
        deleteAutomation,
        generateAIRecommendations,
        predictCampaignPerformance,
        optimizeAudience,
        autoScalebudget,
      }}
    >
      {children}
    </AIMarketingContext.Provider>
  );
};

export const useAIMarketing = () => {
  const context = useContext(AIMarketingContext);
  if (context === undefined) {
    throw new Error('useAIMarketing must be used within an AIMarketingProvider');
  }
  return context;
};