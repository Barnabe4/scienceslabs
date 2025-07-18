import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AboutSection {
  id: string;
  type: 'mission' | 'vision' | 'values' | 'service' | 'additional_service' | 'process';
  title: string;
  description: string;
  icon?: string;
  details?: string[];
  features?: string[];
  order: number;
  isActive: boolean;
}

interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  foundedYear: number;
  employeeCount: string;
  coverageArea: string;
  headquarters: string;
}

interface AboutContextType {
  companyInfo: CompanyInfo;
  sections: AboutSection[];
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  addSection: (section: Omit<AboutSection, 'id' | 'order'>) => void;
  updateSection: (id: string, updates: Partial<AboutSection>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (sections: AboutSection[]) => void;
  getSectionsByType: (type: string) => AboutSection[];
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const AboutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Sciences Labs',
    tagline: 'Équipements Scientifiques Éducatifs',
    description: 'Votre partenaire de confiance pour l\'équipement de laboratoires scolaires et universitaires en Afrique de l\'Ouest. Qualité, innovation et service depuis plus de 10 ans.',
    foundedYear: 2014,
    employeeCount: '25-50',
    coverageArea: 'Afrique de l\'Ouest',
    headquarters: 'Bamako, Mali'
  });

  const [sections, setSections] = useState<AboutSection[]>([
    {
      id: '1',
      type: 'mission',
      title: 'Notre Mission',
      description: 'Démocratiser l\'accès aux équipements scientifiques de qualité pour tous les établissements éducatifs en Afrique de l\'Ouest',
      icon: '🎯',
      details: [
        'Fournir des équipements scientifiques de haute qualité',
        'Rendre la science accessible à tous les établissements',
        'Accompagner les enseignants dans leurs projets pédagogiques',
        'Contribuer au développement de l\'éducation scientifique'
      ],
      order: 1,
      isActive: true
    },
    {
      id: '2',
      type: 'vision',
      title: 'Notre Vision',
      description: 'Devenir le partenaire de référence pour l\'équipement de laboratoires scolaires et universitaires en Afrique de l\'Ouest d\'ici 2030',
      icon: '👁️',
      details: [
        'Leader régional en équipements scientifiques éducatifs',
        'Réseau de distribution dans toute l\'Afrique de l\'Ouest',
        'Innovation constante dans nos solutions',
        'Excellence reconnue par nos clients'
      ],
      order: 2,
      isActive: true
    },
    {
      id: '3',
      type: 'values',
      title: 'Nos Valeurs',
      description: 'Les principes qui guident notre action quotidienne et notre relation avec nos clients',
      icon: '💎',
      details: [
        'Qualité : Excellence dans tous nos produits et services',
        'Innovation : Solutions modernes et adaptées',
        'Service : Accompagnement personnalisé de nos clients',
        'Engagement : Responsabilité envers l\'éducation africaine'
      ],
      order: 3,
      isActive: true
    },
    {
      id: '4',
      type: 'service',
      title: 'Livraison Rapide',
      description: 'Livraison dans toute l\'Afrique de l\'Ouest sous 7-14 jours ouvrables',
      icon: '🚚',
      features: [
        'Livraison sécurisée et suivie',
        'Emballage professionnel',
        'Assurance transport incluse',
        'Livraison gratuite dès 100 000 FCFA'
      ],
      order: 4,
      isActive: true
    },
    {
      id: '5',
      type: 'service',
      title: 'Support Technique',
      description: 'Assistance technique et pédagogique par nos experts qualifiés',
      icon: '🎧',
      features: [
        'Support technique 24/7',
        'Formation à l\'utilisation',
        'Maintenance préventive',
        'Hotline dédiée'
      ],
      order: 5,
      isActive: true
    },
    {
      id: '6',
      type: 'service',
      title: 'Garantie Qualité',
      description: 'Matériel certifié avec garantie complète sur tous nos produits',
      icon: '🏆',
      features: [
        'Certification internationale',
        'Garantie constructeur',
        'Service après-vente',
        'Échange gratuit en cas de défaut'
      ],
      order: 6,
      isActive: true
    },
    {
      id: '7',
      type: 'service',
      title: 'Formation Incluse',
      description: 'Formation gratuite à l\'utilisation du matériel pour vos équipes',
      icon: '👥',
      features: [
        'Formation sur site',
        'Manuel d\'utilisation en français',
        'Vidéos tutorielles',
        'Certification utilisateur'
      ],
      order: 7,
      isActive: true
    },
    {
      id: '8',
      type: 'additional_service',
      title: 'Conseil Pédagogique',
      description: 'Nos experts vous accompagnent dans la conception de vos programmes pédagogiques',
      icon: '📚',
      order: 8,
      isActive: true
    },
    {
      id: '9',
      type: 'additional_service',
      title: 'Installation et Maintenance',
      description: 'Service d\'installation professionnel et maintenance préventive de vos équipements',
      icon: '🔧',
      order: 9,
      isActive: true
    },
    {
      id: '10',
      type: 'additional_service',
      title: 'Audit de Sécurité',
      description: 'Évaluation complète de la sécurité de vos laboratoires et recommandations',
      icon: '🛡️',
      order: 10,
      isActive: true
    },
    {
      id: '11',
      type: 'additional_service',
      title: 'Réseau International',
      description: 'Accès à un réseau mondial de fournisseurs pour des produits spécialisés',
      icon: '🌍',
      order: 11,
      isActive: true
    },
    {
      id: '12',
      type: 'process',
      title: 'Consultation',
      description: 'Analyse approfondie de vos besoins spécifiques et de votre environnement pédagogique',
      icon: '🔍',
      order: 12,
      isActive: true
    },
    {
      id: '13',
      type: 'process',
      title: 'Devis',
      description: 'Proposition personnalisée et détaillée avec recommandations d\'experts',
      icon: '📋',
      order: 13,
      isActive: true
    },
    {
      id: '14',
      type: 'process',
      title: 'Livraison',
      description: 'Transport sécurisé, installation professionnelle et mise en service',
      icon: '🚚',
      order: 14,
      isActive: true
    },
    {
      id: '15',
      type: 'process',
      title: 'Formation',
      description: 'Formation complète de vos équipes et support technique continu',
      icon: '🎓',
      order: 15,
      isActive: true
    }
  ]);

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  const addSection = (sectionData: Omit<AboutSection, 'id' | 'order'>) => {
    const newSection: AboutSection = {
      ...sectionData,
      id: Date.now().toString(),
      order: sections.length + 1
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id: string, updates: Partial<AboutSection>) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  };

  const reorderSections = (newSections: AboutSection[]) => {
    setSections(newSections);
  };

  const getSectionsByType = (type: string) => {
    return sections.filter(section => section.type === type && section.isActive)
                  .sort((a, b) => a.order - b.order);
  };

  return (
    <AboutContext.Provider
      value={{
        companyInfo,
        sections,
        updateCompanyInfo,
        addSection,
        updateSection,
        deleteSection,
        reorderSections,
        getSectionsByType,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};