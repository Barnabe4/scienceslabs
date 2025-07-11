import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Building, CreditCard, FileText, Image, 
  Globe, Save, Upload, Eye, Edit, Trash2, Plus, Check, X,
  Phone, Mail, MapPin, DollarSign, Percent, Truck, Shield,
  Facebook, Linkedin, Twitter, Instagram, Youtube
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const {
    settings,
    updateSettings,
    updateCompanyInfo,
    updatePaymentMethod,
    updateSocialMedia,
    updateLegalDocument,
    uploadLogo,
    uploadBannerImage,
    resetToDefaults
  } = useSettings();

  const [activeTab, setActiveTab] = useState('general');
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [documentContent, setDocumentContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { id: 'general', name: 'Paramètres généraux', icon: SettingsIcon },
    { id: 'legal', name: 'Légal', icon: FileText },
    { id: 'branding', name: 'Image de marque', icon: Image },
    { id: 'social', name: 'Réseaux sociaux', icon: Globe }
  ];

  const handleFileUpload = async (file: File, type: 'logo' | 'banner') => {
    try {
      if (type === 'logo') {
        await uploadLogo(file);
      } else {
        await uploadBannerImage(file);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleEditDocument = (type: 'termsOfService' | 'privacyPolicy' | 'salesConditions') => {
    setEditingDocument(type);
    setDocumentContent(settings[type]);
  };

  const handleSaveDocument = () => {
    if (editingDocument) {
      updateLegalDocument(editingDocument as any, documentContent);
      setEditingDocument(null);
      setDocumentContent('');
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      {/* Informations de l'entreprise */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Informations de l'entreprise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
            <input
              type="text"
              value={settings.companyInfo.name}
              onChange={(e) => updateCompanyInfo({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
            <input
              type="text"
              value={settings.companyInfo.subtitle}
              onChange={(e) => updateCompanyInfo({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={settings.companyInfo.phone}
              onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.companyInfo.email}
              onChange={(e) => updateCompanyInfo({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <input
              type="text"
              value={settings.companyInfo.address}
              onChange={(e) => updateCompanyInfo({ address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
            <input
              type="text"
              value={settings.companyInfo.city}
              onChange={(e) => updateCompanyInfo({ city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Description de l'entreprise */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Description de l'entreprise
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description principale (affichée sur la page d'accueil)
            </label>
            <textarea
              value={settings.companyInfo.description}
              onChange={(e) => updateCompanyInfo({ description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre partenaire de confiance pour l'équipement de laboratoires scolaires et universitaires en Afrique de l'Ouest. Qualité, innovation et service depuis plus de 10 ans."
            />
            <p className="text-sm text-gray-500 mt-1">
              Cette description apparaît sur la page d'accueil du site web
            </p>
          </div>
          
          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
            <div className="bg-slate-800 text-white p-4 rounded-lg">
              <p className="text-sm leading-relaxed">
                {settings.companyInfo.description || "Votre partenaire de confiance pour l'équipement de laboratoires scolaires et universitaires en Afrique de l'Ouest. Qualité, innovation et service depuis plus de 10 ans."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Paramètres financiers */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Paramètres financiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Taux de TVA (%)</label>
            <div className="relative">
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => updateSettings({ taxRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Percent className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
            <select
              value={settings.currency}
              onChange={(e) => updateSettings({ currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Livraison gratuite dès</label>
            <div className="relative">
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => updateSettings({ freeShippingThreshold: parseInt(e.target.value) })}
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-sm text-gray-500">FCFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Méthodes de paiement */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Méthodes de paiement
        </h3>
        <div className="space-y-4">
          {settings.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={(e) => updatePaymentMethod(method.id, { enabled: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanySettings = () => (
    <div className="space-y-8">
      {/* Description de l'entreprise */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Description de l'entreprise
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description principale</label>
            <textarea
              value={settings.companyInfo.description}
              onChange={(e) => updateCompanyInfo({ description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre partenaire de confiance pour l'équipement de laboratoires scolaires et universitaires..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
              <input
                type="number"
                value={settings.companyInfo.yearsOfExperience}
                onChange={(e) => updateCompanyInfo({ yearsOfExperience: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zone de couverture</label>
              <input
                type="text"
                value={settings.companyInfo.coverageArea}
                onChange={(e) => updateCompanyInfo({ coverageArea: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secteur principal</label>
              <input
                type="text"
                value={settings.companyInfo.mainSector}
                onChange={(e) => updateCompanyInfo({ mainSector: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valeurs de l'entreprise</label>
            <input
              type="text"
              value={settings.companyInfo.values}
              onChange={(e) => updateCompanyInfo({ values: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Qualité, innovation et service"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Clientèle cible</label>
            <input
              type="text"
              value={settings.companyInfo.targetAudience}
              onChange={(e) => updateCompanyInfo({ targetAudience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Aperçu */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Aperçu de la description
        </h3>
        <div className="bg-slate-800 text-white p-6 rounded-lg">
          <p className="text-sm leading-relaxed">
            {settings.companyInfo.description || "Votre partenaire de confiance pour l'équipement de laboratoires scolaires et universitaires en Afrique de l'Ouest. Qualité, innovation et service depuis plus de 10 ans."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderLegalSettings = () => (
    <div className="space-y-6">
      {[
        { key: 'termsOfService', title: 'Conditions d\'utilisation', description: 'Conditions générales d\'utilisation du site' },
        { key: 'salesConditions', title: 'Conditions Générales de Vente (CGV)', description: 'Conditions de vente et de livraison' },
        { key: 'privacyPolicy', title: 'Politique de confidentialité', description: 'Politique de protection des données personnelles' }
      ].map((doc) => (
        <div key={doc.key} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
              <p className="text-sm text-gray-600">{doc.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setDocumentContent(settings[doc.key as keyof typeof settings] as string);
                  setShowPreview(true);
                }}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4 mr-1" />
                Aperçu
              </button>
              <button
                onClick={() => handleEditDocument(doc.key as any)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" />
                Modifier
              </button>
            </div>
          </div>
          
          {editingDocument === doc.key ? (
            <div className="space-y-4">
              <textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                className="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Contenu du document en Markdown..."
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingDocument(null)}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  Annuler
                </button>
                <button
                  onClick={handleSaveDocument}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Enregistrer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Dernière modification : {new Date().toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {(settings[doc.key as keyof typeof settings] as string).length} caractères
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Modal d'aperçu */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Aperçu du document</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{documentContent}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBrandingSettings = () => (
    <div className="space-y-6">
      {/* Logo */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Logo de l'entreprise</h3>
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucun logo</p>
              </div>
            )}
          </div>
          <div>
            <label className="block">
              <span className="sr-only">Choisir un logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'logo');
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG jusqu'à 2MB</p>
          </div>
        </div>
      </div>

      {/* Bannière */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Bannière principale</h3>
        
        {/* Message de la bannière */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message de la bannière</label>
          <input
            type="text"
            value={settings.banner.message}
            onChange={(e) => updateSettings({
              banner: { ...settings.banner, message: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Équipez vos laboratoires avec Sciences Labs"
          />
        </div>

        {/* Image de bannière */}
        <div className="flex items-start space-x-6">
          <div className="w-64 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            {settings.banner.image ? (
              <img src={settings.banner.image} alt="Bannière" className="max-w-full max-h-full object-cover rounded" />
            ) : (
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucune image</p>
              </div>
            )}
          </div>
          <div>
            <label className="block">
              <span className="sr-only">Choisir une image de bannière</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'banner');
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG jusqu'à 5MB</p>
            <p className="text-sm text-gray-500">Taille recommandée : 1920x400px</p>
          </div>
        </div>

        {/* Activation de la bannière */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.banner.enabled}
              onChange={(e) => updateSettings({
                banner: { ...settings.banner, enabled: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Afficher la bannière sur le site</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Globe className="w-5 h-5 mr-2" />
        Réseaux sociaux
      </h3>
      <div className="space-y-4">
        {settings.socialMedia.map((social) => (
          <div key={social.platform} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {getSocialIcon(social.platform)}
              <span className="font-medium text-gray-900 w-20">{social.platform}</span>
            </div>
            <input
              type="url"
              value={social.url}
              onChange={(e) => updateSocialMedia(social.platform, e.target.value, social.enabled)}
              placeholder={`URL ${social.platform}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={social.enabled}
                onChange={(e) => updateSocialMedia(social.platform, social.url, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Actif</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'legal': return renderLegalSettings();
      case 'branding': return renderBrandingSettings();
      case 'social': return renderSocialSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;