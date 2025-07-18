import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social' | 'display' | 'print';
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';
  objective: 'awareness' | 'leads' | 'sales' | 'retention' | 'engagement';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  targetAudience: {
    segments: string[];
    demographics: {
      ageRange: string;
      location: string[];
      interests: string[];
    };
    size: number;
  };
  content: {
    subject?: string;
    message: string;
    images: string[];
    ctaText: string;
    ctaUrl: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    ctr: number;
    conversionRate: number;
    roas: number;
  };
  channels: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  category: 'newsletter' | 'promotion' | 'welcome' | 'abandoned_cart' | 'follow_up';
  subject: string;
  content: string;
  isHtml: boolean;
  variables: string[];
  thumbnail: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: {
    customerType: string[];
    location: string[];
    purchaseHistory: {
      minAmount: number;
      maxAmount: number;
      timeframe: string;
    };
    engagement: string;
    lastActivity: string;
  };
  size: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MarketingStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalBudget: number;
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  averageCTR: number;
  averageConversionRate: number;
  totalROAS: number;
}

interface MarketingContextType {
  campaigns: Campaign[];
  templates: EmailTemplate[];
  segments: Segment[];
  stats: MarketingStats;
  
  // Campaign management
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  duplicateCampaign: (id: string) => void;
  launchCampaign: (id: string) => void;
  pauseCampaign: (id: string) => void;
  stopCampaign: (id: string) => void;
  
  // Template management
  addTemplate: (template: Omit<EmailTemplate, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  
  // Segment management
  addSegment: (segment: Omit<Segment, 'id' | 'size' | 'createdAt' | 'updatedAt'>) => void;
  updateSegment: (id: string, updates: Partial<Segment>) => void;
  deleteSegment: (id: string) => void;
  calculateSegmentSize: (criteria: Segment['criteria']) => number;
  
  // Analytics
  getCampaignsByStatus: (status: string) => Campaign[];
  getCampaignsByType: (type: string) => Campaign[];
  getTopPerformingCampaigns: (limit: number) => Campaign[];
  searchCampaigns: (query: string) => Campaign[];
}

const MarketingContext = createContext<MarketingContextType | undefined>(undefined);

export const MarketingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Promotion Rentrée Scolaire 2024',
      type: 'email',
      status: 'running',
      objective: 'sales',
      budget: 500000,
      spent: 125000,
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-02-15T23:59:59Z',
      targetAudience: {
        segments: ['schools', 'universities'],
        demographics: {
          ageRange: '25-55',
          location: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire'],
          interests: ['éducation', 'sciences', 'laboratoire']
        },
        size: 1250
      },
      content: {
        subject: '🎓 Équipez vos laboratoires pour la rentrée - Offre spéciale',
        message: 'Profitez de notre offre spéciale rentrée scolaire avec 15% de réduction sur tous nos équipements de laboratoire.',
        images: ['https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600'],
        ctaText: 'Découvrir l\'offre',
        ctaUrl: 'https://scienceslabs.com/promotion-rentree'
      },
      metrics: {
        impressions: 8500,
        clicks: 425,
        conversions: 34,
        revenue: 2850000,
        ctr: 5.0,
        conversionRate: 8.0,
        roas: 22.8
      },
      channels: ['email', 'social'],
      createdBy: 'Marie Traoré',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      name: 'Newsletter Mensuelle Janvier',
      type: 'email',
      status: 'completed',
      objective: 'engagement',
      budget: 50000,
      spent: 45000,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-31T23:59:59Z',
      targetAudience: {
        segments: ['all_customers'],
        demographics: {
          ageRange: '18-65',
          location: ['Afrique de l\'Ouest'],
          interests: ['sciences', 'éducation', 'innovation']
        },
        size: 2800
      },
      content: {
        subject: '📰 Newsletter Sciences Labs - Janvier 2024',
        message: 'Découvrez nos dernières actualités, nouveaux produits et conseils d\'experts.',
        images: ['https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=600'],
        ctaText: 'Lire la newsletter',
        ctaUrl: 'https://scienceslabs.com/newsletter/janvier-2024'
      },
      metrics: {
        impressions: 2800,
        clicks: 560,
        conversions: 28,
        revenue: 450000,
        ctr: 20.0,
        conversionRate: 5.0,
        roas: 10.0
      },
      channels: ['email'],
      createdBy: 'Directeur Marketing',
      createdAt: '2023-12-28T14:00:00Z',
      updatedAt: '2024-01-31T23:59:59Z'
    },
    {
      id: '3',
      name: 'Campagne Formation Sécurité',
      type: 'email',
      status: 'scheduled',
      objective: 'leads',
      budget: 200000,
      spent: 0,
      startDate: '2024-02-01T00:00:00Z',
      endDate: '2024-02-29T23:59:59Z',
      targetAudience: {
        segments: ['safety_interested'],
        demographics: {
          ageRange: '30-60',
          location: ['Mali', 'Burkina Faso'],
          interests: ['sécurité', 'formation', 'laboratoire']
        },
        size: 850
      },
      content: {
        subject: '🛡️ Formation Sécurité Laboratoire - Inscriptions ouvertes',
        message: 'Formez vos équipes aux bonnes pratiques de sécurité en laboratoire avec nos experts.',
        images: ['https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600'],
        ctaText: 'S\'inscrire à la formation',
        ctaUrl: 'https://scienceslabs.com/formations/securite'
      },
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        ctr: 0,
        conversionRate: 0,
        roas: 0
      },
      channels: ['email', 'sms'],
      createdBy: 'Responsable Formation',
      createdAt: '2024-01-25T09:00:00Z',
      updatedAt: '2024-01-25T09:00:00Z'
    }
  ]);

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Newsletter Mensuelle',
      category: 'newsletter',
      subject: '📰 Newsletter Sciences Labs - {{month}} {{year}}',
      content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Newsletter Sciences Labs</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Sciences Labs</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Newsletter {{month}} {{year}}</p>
        </div>
        
        <div style="padding: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">{{title}}</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 25px;">{{content}}</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{cta_url}}" style="background-color: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">{{cta_text}}</a>
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Sciences Labs - Équipements Scientifiques Éducatifs</p>
            <p>Bamako, Mali | +223 XX XX XX XX | contact@scienceslabs.com</p>
        </div>
    </div>
</body>
</html>
      `,
      isHtml: true,
      variables: ['month', 'year', 'title', 'content', 'cta_text', 'cta_url'],
      thumbnail: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300',
      isActive: true,
      usageCount: 12,
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Email de Bienvenue',
      category: 'welcome',
      subject: '🎉 Bienvenue chez Sciences Labs, {{customer_name}} !',
      content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bienvenue chez Sciences Labs</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Bienvenue chez Sciences Labs !</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre partenaire pour l'équipement scientifique</p>
        </div>
        
        <div style="padding: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Bonjour {{customer_name}},</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 25px;">
                Merci de nous avoir fait confiance ! Nous sommes ravis de vous accompagner dans vos projets d'équipement de laboratoire.
            </p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Ce que nous vous offrons :</h3>
                <ul style="color: #4b5563; line-height: 1.6;">
                    <li>✅ Équipements certifiés de haute qualité</li>
                    <li>✅ Livraison rapide en Afrique de l'Ouest</li>
                    <li>✅ Formation gratuite à l'utilisation</li>
                    <li>✅ Support technique 24/7</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{catalog_url}}" style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">Découvrir nos produits</a>
                <a href="{{contact_url}}" style="background-color: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Nous contacter</a>
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Sciences Labs - Équipements Scientifiques Éducatifs</p>
            <p>Bamako, Mali | +223 XX XX XX XX | contact@scienceslabs.com</p>
        </div>
    </div>
</body>
</html>
      `,
      isHtml: true,
      variables: ['customer_name', 'catalog_url', 'contact_url'],
      thumbnail: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=300',
      isActive: true,
      usageCount: 45,
      createdAt: '2023-11-15T09:00:00Z',
      updatedAt: '2024-01-10T11:20:00Z'
    },
    {
      id: '3',
      name: 'Promotion Produits',
      category: 'promotion',
      subject: '🔥 {{discount}}% de réduction sur {{product_category}}',
      content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Promotion Sciences Labs</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">{{discount}}% DE RÉDUCTION</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Sur {{product_category}}</p>
        </div>
        
        <div style="padding: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Offre limitée !</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 25px;">{{promotion_message}}</p>
            
            <div style="background-color: #fef3c7; border: 2px dashed #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <h3 style="color: #92400e; margin-top: 0;">Code promo : <strong>{{promo_code}}</strong></h3>
                <p style="color: #92400e; margin-bottom: 0;">Valable jusqu'au {{expiry_date}}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{shop_url}}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">Profiter de l'offre</a>
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Sciences Labs - Équipements Scientifiques Éducatifs</p>
            <p>Bamako, Mali | +223 XX XX XX XX | contact@scienceslabs.com</p>
        </div>
    </div>
</body>
</html>
      `,
      isHtml: true,
      variables: ['discount', 'product_category', 'promotion_message', 'promo_code', 'expiry_date', 'shop_url'],
      thumbnail: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=300',
      isActive: true,
      usageCount: 8,
      createdAt: '2023-12-10T15:00:00Z',
      updatedAt: '2024-01-05T16:45:00Z'
    }
  ]);

  const [segments, setSegments] = useState<Segment[]>([
    {
      id: '1',
      name: 'Établissements Scolaires',
      description: 'Écoles primaires et secondaires en Afrique de l\'Ouest',
      criteria: {
        customerType: ['school'],
        location: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire', 'Niger'],
        purchaseHistory: {
          minAmount: 0,
          maxAmount: 1000000,
          timeframe: 'all'
        },
        engagement: 'active',
        lastActivity: '6_months'
      },
      size: 450,
      isActive: true,
      createdAt: '2023-10-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Universités',
      description: 'Universités et instituts supérieurs',
      criteria: {
        customerType: ['university'],
        location: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire'],
        purchaseHistory: {
          minAmount: 500000,
          maxAmount: 10000000,
          timeframe: '2_years'
        },
        engagement: 'high',
        lastActivity: '3_months'
      },
      size: 85,
      isActive: true,
      createdAt: '2023-10-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '3',
      name: 'Clients VIP',
      description: 'Clients avec un historique d\'achat élevé',
      criteria: {
        customerType: ['school', 'university', 'company'],
        location: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire', 'Niger', 'Sénégal'],
        purchaseHistory: {
          minAmount: 2000000,
          maxAmount: 50000000,
          timeframe: '1_year'
        },
        engagement: 'high',
        lastActivity: '1_month'
      },
      size: 35,
      isActive: true,
      createdAt: '2023-11-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '4',
      name: 'Prospects Sécurité',
      description: 'Prospects intéressés par les équipements de sécurité',
      criteria: {
        customerType: ['school', 'university', 'company'],
        location: ['Mali', 'Burkina Faso'],
        purchaseHistory: {
          minAmount: 0,
          maxAmount: 500000,
          timeframe: 'all'
        },
        engagement: 'medium',
        lastActivity: '12_months'
      },
      size: 280,
      isActive: true,
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    }
  ]);

  const stats: MarketingStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'running').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.metrics.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.metrics.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0),
    averageCTR: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.metrics.ctr, 0) / campaigns.length : 0,
    averageConversionRate: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.metrics.conversionRate, 0) / campaigns.length : 0,
    totalROAS: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.metrics.roas, 0) / campaigns.length : 0
  };

  // Campaign management
  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { ...campaign, ...updates, updatedAt: new Date().toISOString() }
        : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const duplicateCampaign = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const duplicated: Campaign = {
        ...campaign,
        id: Date.now().toString(),
        name: `${campaign.name} (Copie)`,
        status: 'draft',
        spent: 0,
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          ctr: 0,
          conversionRate: 0,
          roas: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCampaigns(prev => [...prev, duplicated]);
    }
  };

  const launchCampaign = (id: string) => {
    updateCampaign(id, { status: 'running' });
  };

  const pauseCampaign = (id: string) => {
    updateCampaign(id, { status: 'paused' });
  };

  const stopCampaign = (id: string) => {
    updateCampaign(id, { status: 'completed' });
  };

  // Template management
  const addTemplate = (templateData: Omit<EmailTemplate, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: EmailTemplate = {
      ...templateData,
      id: Date.now().toString(),
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const updateTemplate = (id: string, updates: Partial<EmailTemplate>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, ...updates, updatedAt: new Date().toISOString() }
        : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const duplicateTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const duplicated: EmailTemplate = {
        ...template,
        id: Date.now().toString(),
        name: `${template.name} (Copie)`,
        usageCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTemplates(prev => [...prev, duplicated]);
    }
  };

  // Segment management
  const addSegment = (segmentData: Omit<Segment, 'id' | 'size' | 'createdAt' | 'updatedAt'>) => {
    const newSegment: Segment = {
      ...segmentData,
      id: Date.now().toString(),
      size: calculateSegmentSize(segmentData.criteria),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSegments(prev => [...prev, newSegment]);
  };

  const updateSegment = (id: string, updates: Partial<Segment>) => {
    setSegments(prev => prev.map(segment => 
      segment.id === id 
        ? { 
            ...segment, 
            ...updates, 
            size: updates.criteria ? calculateSegmentSize(updates.criteria) : segment.size,
            updatedAt: new Date().toISOString() 
          }
        : segment
    ));
  };

  const deleteSegment = (id: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== id));
  };

  const calculateSegmentSize = (criteria: Segment['criteria']): number => {
    // Simulation du calcul de taille de segment
    let baseSize = 1000;
    
    if (criteria.customerType.includes('university')) baseSize *= 0.1;
    if (criteria.customerType.includes('school')) baseSize *= 0.6;
    if (criteria.customerType.includes('company')) baseSize *= 0.3;
    
    if (criteria.purchaseHistory.minAmount > 1000000) baseSize *= 0.2;
    if (criteria.engagement === 'high') baseSize *= 0.3;
    if (criteria.engagement === 'medium') baseSize *= 0.6;
    
    return Math.round(baseSize);
  };

  // Analytics
  const getCampaignsByStatus = (status: string) => {
    return status === 'all' ? campaigns : campaigns.filter(campaign => campaign.status === status);
  };

  const getCampaignsByType = (type: string) => {
    return type === 'all' ? campaigns : campaigns.filter(campaign => campaign.type === type);
  };

  const getTopPerformingCampaigns = (limit: number) => {
    return campaigns
      .filter(c => c.status === 'completed' || c.status === 'running')
      .sort((a, b) => b.metrics.roas - a.metrics.roas)
      .slice(0, limit);
  };

  const searchCampaigns = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return campaigns.filter(campaign => 
      campaign.name.toLowerCase().includes(lowercaseQuery) ||
      campaign.content.subject?.toLowerCase().includes(lowercaseQuery) ||
      campaign.content.message.toLowerCase().includes(lowercaseQuery) ||
      campaign.createdBy.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <MarketingContext.Provider
      value={{
        campaigns,
        templates,
        segments,
        stats,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        duplicateCampaign,
        launchCampaign,
        pauseCampaign,
        stopCampaign,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        duplicateTemplate,
        addSegment,
        updateSegment,
        deleteSegment,
        calculateSegmentSize,
        getCampaignsByStatus,
        getCampaignsByType,
        getTopPerformingCampaigns,
        searchCampaigns,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => {
  const context = useContext(MarketingContext);
  if (context === undefined) {
    throw new Error('useMarketing must be used within a MarketingProvider');
  }
  return context;
};