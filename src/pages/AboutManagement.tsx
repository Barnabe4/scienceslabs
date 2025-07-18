import React, { useState } from 'react';
import { 
  Info, Plus, Edit, Trash2, Save, X, Eye, Upload, 
  Target, Heart, Lightbulb, Users, Settings, ArrowUp, ArrowDown,
  Truck, HeadphonesIcon, Award, BookOpen, Wrench, Shield, Globe
} from 'lucide-react';

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

const AboutManagement = () => {
  const [activeTab, setActiveTab] = useState('sections');
  const [showAddSection, setShowAddSection] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const [newSection, setNewSection] = useState<Partial<AboutSection>>({
    type: 'mission',
    title: '',
    description: '',
    icon: '🎯',
    details: [''],
    features: [''],
    isActive: true
  });

  const sectionTypes = [
    { id: 'mission', name: 'Mission', icon: Target },
    { id: 'vision', name: 'Vision', icon: Eye },
    { id: 'values', name: 'Valeurs', icon: Heart },
    { id: 'service', name: 'Service Principal', icon: Users },
    { id: 'additional_service', name: 'Service Complémentaire', icon: Plus },
    { id: 'process', name: 'Étape de Processus', icon: Settings }
  ];

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string | number) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSection = () => {
    if (!newSection.title || !newSection.description) return;

    const section: AboutSection = {
      id: Date.now().toString(),
      type: newSection.type as AboutSection['type'],
      title: newSection.title,
      description: newSection.description,
      icon: newSection.icon || '🎯',
      details: newSection.details?.filter(d => d.trim()) || [],
      features: newSection.features?.filter(f => f.trim()) || [],
      order: sections.length + 1,
      isActive: true
    };

    setSections(prev => [...prev, section]);
    setNewSection({
      type: 'mission',
      title: '',
      description: '',
      icon: '🎯',
      details: [''],
      features: [''],
      isActive: true
    });
    setShowAddSection(false);
    alert('Section ajoutée avec succès !');
  };

  const handleUpdateSection = (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, ...newSection } : section
    ));
    setEditingSection(null);
    setNewSection({
      type: 'mission',
      title: '',
      description: '',
      icon: '🎯',
      details: [''],
      features: [''],
      isActive: true
    });
    alert('Section mise à jour avec succès !');
  };

  const handleDeleteSection = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      setSections(prev => prev.filter(section => section.id !== id));
      alert('Section supprimée avec succès !');
    }
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newSections = [...prev];
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      
      // Update order
      newSections.forEach((section, idx) => {
        section.order = idx + 1;
      });
      
      return newSections;
    });
  };

  const startEditSection = (section: AboutSection) => {
    setNewSection({
      type: section.type,
      title: section.title,
      description: section.description,
      icon: section.icon,
      details: section.details || [''],
      features: section.features || [''],
      isActive: section.isActive
    });
    setEditingSection(section.id);
  };

  const handleDetailChange = (index: number, value: string) => {
    setNewSection(prev => ({
      ...prev,
      details: prev.details?.map((detail, i) => i === index ? value : detail) || []
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setNewSection(prev => ({
      ...prev,
      features: prev.features?.map((feature, i) => i === index ? value : feature) || []
    }));
  };

  const addDetail = () => {
    setNewSection(prev => ({
      ...prev,
      details: [...(prev.details || []), '']
    }));
  };

  const addFeature = () => {
    setNewSection(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const removeDetail = (index: number) => {
    setNewSection(prev => ({
      ...prev,
      details: prev.details?.filter((_, i) => i !== index) || []
    }));
  };

  const removeFeature = (index: number) => {
    setNewSection(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSaveAll = () => {
    // Simulation de sauvegarde
    alert('Toutes les modifications ont été sauvegardées avec succès !');
  };

  const getSectionsByType = (type: string) => {
    return sections.filter(section => section.type === type).sort((a, b) => a.order - b.order);
  };

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Informations de l'entreprise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slogan/Tagline
            </label>
            <input
              type="text"
              value={companyInfo.tagline}
              onChange={(e) => handleCompanyInfoChange('tagline', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description principale
            </label>
            <textarea
              value={companyInfo.description}
              onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Année de création
            </label>
            <input
              type="number"
              value={companyInfo.foundedYear}
              onChange={(e) => handleCompanyInfoChange('foundedYear', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre d'employés
            </label>
            <select
              value={companyInfo.employeeCount}
              onChange={(e) => handleCompanyInfoChange('employeeCount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1-10">1-10 employés</option>
              <option value="11-25">11-25 employés</option>
              <option value="25-50">25-50 employés</option>
              <option value="50-100">50-100 employés</option>
              <option value="100+">100+ employés</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zone de couverture
            </label>
            <input
              type="text"
              value={companyInfo.coverageArea}
              onChange={(e) => handleCompanyInfoChange('coverageArea', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Siège social
            </label>
            <input
              type="text"
              value={companyInfo.headquarters}
              onChange={(e) => handleCompanyInfoChange('headquarters', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionCard = (section: AboutSection) => (
    <div key={section.id} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{section.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            <p className="text-sm text-gray-600 capitalize">{section.type.replace('_', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleMoveSection(section.id, 'up')}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Monter"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleMoveSection(section.id, 'down')}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Descendre"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => startEditSection(section)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteSection(section.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{section.description}</p>
      
      {section.details && section.details.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Détails :</h4>
          <ul className="space-y-1">
            {section.details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.features && section.features.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Caractéristiques :</h4>
          <ul className="space-y-1">
            {section.features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSections = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Sections de la page À propos</h2>
        <button
          onClick={() => setShowAddSection(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une section
        </button>
      </div>

      {/* Mission, Vision, Valeurs */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Mission, Vision & Valeurs
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {getSectionsByType('mission').map(renderSectionCard)}
          {getSectionsByType('vision').map(renderSectionCard)}
          {getSectionsByType('values').map(renderSectionCard)}
        </div>
      </div>

      {/* Nos Services */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Nos Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getSectionsByType('service').map(renderSectionCard)}
        </div>
      </div>

      {/* Services Complémentaires */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Services Complémentaires
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getSectionsByType('additional_service').map(renderSectionCard)}
        </div>
      </div>

      {/* Notre Processus */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Notre Processus
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getSectionsByType('process').map(renderSectionCard)}
        </div>
      </div>

      {/* Add/Edit Section Modal */}
      {(showAddSection || editingSection) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSection ? 'Modifier la section' : 'Ajouter une section'}
              </h2>
              <button
                onClick={() => {
                  setShowAddSection(false);
                  setEditingSection(null);
                  setNewSection({
                    type: 'mission',
                    title: '',
                    description: '',
                    icon: '🎯',
                    details: [''],
                    features: [''],
                    isActive: true
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de section
                    </label>
                    <select
                      value={newSection.type}
                      onChange={(e) => setNewSection(prev => ({ ...prev, type: e.target.value as AboutSection['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sectionTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icône
                    </label>
                    <input
                      type="text"
                      value={newSection.icon}
                      onChange={(e) => setNewSection(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="🎯"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={newSection.title}
                    onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Titre de la section"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSection.description}
                    onChange={(e) => setNewSection(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description de la section"
                  />
                </div>
                
                {/* Détails (pour Mission, Vision, Valeurs) */}
                {(newSection.type === 'mission' || newSection.type === 'vision' || newSection.type === 'values') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Détails
                    </label>
                    <div className="space-y-2">
                      {newSection.details?.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) => handleDetailChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Détail..."
                          />
                          <button
                            onClick={() => removeDetail(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addDetail}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter un détail
                      </button>
                    </div>
                  </div>
                )}

                {/* Caractéristiques (pour Services) */}
                {newSection.type === 'service' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caractéristiques
                    </label>
                    <div className="space-y-2">
                      {newSection.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Caractéristique..."
                          />
                          <button
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addFeature}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter une caractéristique
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => {
                  setShowAddSection(false);
                  setEditingSection(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => editingSection ? handleUpdateSection(editingSection) : handleAddSection()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingSection ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Aperçu de la page À propos</h2>
        
        {/* Company Info Preview */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{companyInfo.name}</h1>
          <p className="text-lg text-blue-600 mb-4">{companyInfo.tagline}</p>
          <p className="text-gray-700 mb-4">{companyInfo.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Fondée en :</span>
              <p>{companyInfo.foundedYear}</p>
            </div>
            <div>
              <span className="font-medium">Employés :</span>
              <p>{companyInfo.employeeCount}</p>
            </div>
            <div>
              <span className="font-medium">Zone :</span>
              <p>{companyInfo.coverageArea}</p>
            </div>
            <div>
              <span className="font-medium">Siège :</span>
              <p>{companyInfo.headquarters}</p>
            </div>
          </div>
        </div>
        
        {/* Mission, Vision, Valeurs Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mission, Vision & Valeurs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getSectionsByType('mission').concat(getSectionsByType('vision')).concat(getSectionsByType('values')).map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{section.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                {section.details && section.details.length > 0 && (
                  <ul className="space-y-2">
                    {section.details.map((detail, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Nos Services Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getSectionsByType('service').map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{section.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
                {section.features && section.features.length > 0 && (
                  <ul className="space-y-2">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services Complémentaires Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Complémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getSectionsByType('additional_service').map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-3xl mb-4">{section.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm">{section.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notre Processus Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Processus</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {getSectionsByType('process').map((section, index) => (
              <div key={section.id} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="text-4xl mb-2">{section.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de la page À propos</h1>
          <p className="text-gray-600">Gérez le contenu de votre page À propos</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Masquer aperçu' : 'Aperçu'}
          </button>
          <button
            onClick={handleSaveAll}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder tout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Informations entreprise
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'sections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sections de contenu
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Aperçu
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'company' && renderCompanyInfo()}
          {activeTab === 'sections' && renderSections()}
          {activeTab === 'preview' && renderPreview()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sections actives</p>
              <p className="text-2xl font-bold text-green-600">
                {sections.filter(s => s.isActive).length}
              </p>
            </div>
            <Info className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Services principaux</p>
              <p className="text-2xl font-bold text-blue-600">{getSectionsByType('service').length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Services complémentaires</p>
              <p className="text-2xl font-bold text-purple-600">{getSectionsByType('additional_service').length}</p>
            </div>
            <Plus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Étapes processus</p>
              <p className="text-2xl font-bold text-orange-600">{getSectionsByType('process').length}</p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManagement;