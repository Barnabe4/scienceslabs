import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyInfo {
  name: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  website: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  config: Record<string, any>;
}

interface SocialMedia {
  platform: string;
  url: string;
  enabled: boolean;
}

interface BannerSettings {
  message: string;
  image: string;
  enabled: boolean;
}

interface Settings {
  // Paramètres généraux
  companyInfo: CompanyInfo;
  taxRate: number;
  currency: string;
  freeShippingThreshold: number;
  
  // Méthodes de paiement
  paymentMethods: PaymentMethod[];
  
  // Branding
  logo: string;
  banner: BannerSettings;
  
  // Réseaux sociaux
  socialMedia: SocialMedia[];
  
  // Légal
  termsOfService: string;
  privacyPolicy: string;
  salesConditions: string;
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  
  // Autres
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void;
  updateSocialMedia: (platform: string, url: string, enabled: boolean) => void;
  updateLegalDocument: (type: 'termsOfService' | 'privacyPolicy' | 'salesConditions', content: string) => void;
  uploadLogo: (file: File) => Promise<string>;
  uploadBannerImage: (file: File) => Promise<string>;
  resetToDefaults: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    companyInfo: {
      name: 'Sciences Labs',
      subtitle: 'Équipements Scientifiques',
      phone: '+228 90191924',
      email: 'contact@scienceslabs.com',
      address: 'Zone industrielle',
      city: 'Bamako',
      country: 'Mali',
      postalCode: 'BP 1234',
      website: 'www.scienceslabs.com',
      description: 'Votre partenaire de confiance pour l\'équipement de laboratoires scolaires et universitaires en Afrique de l\'Ouest. Qualité, innovation et service depuis plus de 10 ans.',
      yearsOfExperience: 10,
      coverageArea: 'Afrique de l\'Ouest',
      values: ['Qualité', 'Innovation', 'Service'],
      mainSector: 'Équipements scientifiques éducatifs',
      targetCustomers: 'Laboratoires scolaires et universitaires'
    },
    taxRate: 18,
    currency: 'FCFA',
    freeShippingThreshold: 100000,
    
    paymentMethods: [
      {
        id: 'mobile_money',
        name: 'Mobile Money',
        enabled: true,
        description: 'Orange Money, MTN Money, Moov Money',
        config: { providers: ['orange', 'mtn', 'moov'] }
      },
      {
        id: 'bank_transfer',
        name: 'Virement Bancaire',
        enabled: true,
        description: 'Virement bancaire direct',
        config: { bankAccount: 'ML123456789' }
      },
      {
        id: 'cash',
        name: 'Paiement à la livraison',
        enabled: true,
        description: 'Paiement en espèces à la réception',
        config: {}
      },
      {
        id: 'credit_card',
        name: 'Carte Bancaire',
        enabled: false,
        description: 'Visa, Mastercard',
        config: { processor: 'stripe' }
      }
    ],
    
    logo: '/logo-sciences-labs.png',
    banner: {
      message: 'Équipez vos laboratoires avec Sciences Labs',
      image: '/banner-sciences-labs.jpg',
      enabled: true
    },
    
    socialMedia: [
      { platform: 'Facebook', url: 'https://facebook.com/scienceslabs', enabled: true },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/scienceslabs', enabled: true },
      { platform: 'Twitter', url: 'https://twitter.com/scienceslabs', enabled: false },
      { platform: 'Instagram', url: '', enabled: false },
      { platform: 'YouTube', url: '', enabled: false }
    ],
    
    termsOfService: `# Conditions d'Utilisation - Sciences Labs

## 1. Acceptation des Conditions

En utilisant notre site web et nos services, vous acceptez d'être lié par ces conditions d'utilisation.

## 2. Description des Services

Sciences Labs fournit des équipements scientifiques éducatifs pour les établissements scolaires et universitaires en Afrique de l'Ouest.

## 3. Commandes et Paiements

- Les commandes sont confirmées après réception du paiement
- Les prix sont exprimés en FCFA, TVA incluse
- Livraison gratuite dès 100,000 FCFA

## 4. Livraison

- Délai de livraison : 7-14 jours ouvrables
- Livraison dans toute l'Afrique de l'Ouest
- Frais de livraison selon la destination

## 5. Garanties

- Garantie constructeur sur tous les produits
- Service après-vente inclus
- Formation à l'utilisation offerte

## 6. Responsabilités

Sciences Labs s'engage à fournir des produits conformes aux normes internationales.

## 7. Modification des Conditions

Ces conditions peuvent être modifiées à tout moment. Les utilisateurs seront informés des changements.

## 8. Contact

Pour toute question : contact@scienceslabs.com`,

    privacyPolicy: `# Politique de Confidentialité - Sciences Labs

## 1. Collecte des Données

Nous collectons les informations suivantes :
- Nom et coordonnées
- Informations de commande
- Données de navigation (cookies)

## 2. Utilisation des Données

Vos données sont utilisées pour :
- Traiter vos commandes
- Améliorer nos services
- Vous informer de nos nouveautés

## 3. Protection des Données

- Chiffrement SSL de toutes les transactions
- Accès restreint aux données personnelles
- Sauvegarde sécurisée

## 4. Partage des Données

Nous ne vendons jamais vos données personnelles à des tiers.

## 5. Vos Droits

Vous avez le droit de :
- Accéder à vos données
- Corriger vos informations
- Supprimer votre compte

## 6. Cookies

Notre site utilise des cookies pour améliorer votre expérience.

## 7. Contact

Pour toute question sur la confidentialité : privacy@scienceslabs.com`,

    salesConditions: `# Conditions Générales de Vente - Sciences Labs

## 1. Champ d'Application

Ces CGV s'appliquent à toutes les ventes de Sciences Labs.

## 2. Produits et Services

- Équipements scientifiques certifiés
- Formation incluse
- Support technique

## 3. Prix et Paiement

- Prix en FCFA, TVA 18% incluse
- Paiement : Mobile Money, virement, espèces
- Facture émise après paiement

## 4. Livraison

- Délai : 7-14 jours ouvrables
- Livraison gratuite dès 100,000 FCFA
- Assurance transport incluse

## 5. Garanties

- Garantie constructeur : 2 ans
- Échange gratuit si défaut
- Service après-vente

## 6. Retours

- Retour possible sous 30 jours
- Produit en état neuf
- Frais de retour à votre charge

## 7. Responsabilité

Sciences Labs garantit la conformité des produits aux normes.

## 8. Litiges

Tout litige sera soumis aux tribunaux de Bamako, Mali.

## 9. Contact

Service client : +228 90191924`,

    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    analyticsEnabled: true
  });

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setSettings(prev => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, ...info }
    }));
  };

  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethod>) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method =>
        method.id === id ? { ...method, ...updates } : method
      )
    }));
  };

  const updateSocialMedia = (platform: string, url: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map(social =>
        social.platform === platform ? { ...social, url, enabled } : social
      )
    }));
  };

  const updateLegalDocument = (type: 'termsOfService' | 'privacyPolicy' | 'salesConditions', content: string) => {
    setSettings(prev => ({
      ...prev,
      [type]: content
    }));
  };

  const uploadLogo = async (file: File): Promise<string> => {
    // Simulation d'upload - en production, utiliser un service de stockage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setSettings(prev => ({ ...prev, logo: dataUrl }));
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadBannerImage = async (file: File): Promise<string> => {
    // Simulation d'upload - en production, utiliser un service de stockage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setSettings(prev => ({
          ...prev,
          banner: { ...prev.banner, image: dataUrl }
        }));
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  const resetToDefaults = () => {
    // Réinitialiser aux valeurs par défaut
    window.location.reload();
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateCompanyInfo,
        updatePaymentMethod,
        updateSocialMedia,
        updateLegalDocument,
        uploadLogo,
        uploadBannerImage,
        resetToDefaults,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};