import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, HeadphonesIcon, Award, Users, BookOpen, Wrench, Shield, Globe, Target, Eye, Heart } from 'lucide-react';
import QuoteRequestModal from '../components/QuoteRequestModal';

const Services = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const missionVisionValues = [
    {
      icon: '🎯',
      title: 'Notre Mission',
      description: 'Démocratiser l\'accès aux équipements scientifiques de qualité pour tous les établissements éducatifs en Afrique de l\'Ouest',
      details: [
        'Fournir des équipements scientifiques de haute qualité',
        'Rendre la science accessible à tous les établissements',
        'Accompagner les enseignants dans leurs projets pédagogiques',
        'Contribuer au développement de l\'éducation scientifique'
      ]
    },
    {
      icon: '👁️',
      title: 'Notre Vision',
      description: 'Devenir le partenaire de référence pour l\'équipement de laboratoires scolaires et universitaires en Afrique de l\'Ouest d\'ici 2030',
      details: [
        'Leader régional en équipements scientifiques éducatifs',
        'Réseau de distribution dans toute l\'Afrique de l\'Ouest',
        'Innovation constante dans nos solutions',
        'Excellence reconnue par nos clients'
      ]
    },
    {
      icon: '💎',
      title: 'Nos Valeurs',
      description: 'Les principes qui guident notre action quotidienne et notre relation avec nos clients',
      details: [
        'Qualité : Excellence dans tous nos produits et services',
        'Innovation : Solutions modernes et adaptées',
        'Service : Accompagnement personnalisé de nos clients',
        'Engagement : Responsabilité envers l\'éducation africaine'
      ]
    }
  ];

  const mainServices = [
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Livraison dans toute l\'Afrique de l\'Ouest sous 7-14 jours ouvrables',
      features: [
        'Livraison sécurisée et suivie',
        'Emballage professionnel',
        'Assurance transport incluse',
        'Livraison gratuite dès 100 000 FCFA'
      ]
    },
    {
      icon: HeadphonesIcon,
      title: 'Support Technique',
      description: 'Assistance technique et pédagogique par nos experts qualifiés',
      features: [
        'Support technique 24/7',
        'Formation à l\'utilisation',
        'Maintenance préventive',
        'Hotline dédiée'
      ]
    },
    {
      icon: Award,
      title: 'Garantie Qualité',
      description: 'Matériel certifié avec garantie complète sur tous nos produits',
      features: [
        'Certification internationale',
        'Garantie constructeur',
        'Service après-vente',
        'Échange gratuit en cas de défaut'
      ]
    },
    {
      icon: Users,
      title: 'Formation Incluse',
      description: 'Formation gratuite à l\'utilisation du matériel pour vos équipes',
      features: [
        'Formation sur site',
        'Manuel d\'utilisation en français',
        'Vidéos tutorielles',
        'Certification utilisateur'
      ]
    }
  ];

  const additionalServices = [
    {
      icon: BookOpen,
      title: 'Conseil Pédagogique',
      description: 'Nos experts vous accompagnent dans la conception de vos programmes pédagogiques'
    },
    {
      icon: Wrench,
      title: 'Installation et Maintenance',
      description: 'Service d\'installation professionnel et maintenance préventive de vos équipements'
    },
    {
      icon: Shield,
      title: 'Audit de Sécurité',
      description: 'Évaluation complète de la sécurité de vos laboratoires et recommandations'
    },
    {
      icon: Globe,
      title: 'Réseau International',
      description: 'Accès à un réseau mondial de fournisseurs pour des produits spécialisés'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos de Sciences Labs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez qui nous sommes, notre mission et comment nous accompagnons l'éducation scientifique en Afrique de l'Ouest
          </p>
        </div>

        {/* Mission, Vision, Valeurs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission, Vision & Valeurs</h2>
            <p className="text-xl text-gray-600">Les fondements de notre engagement</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nos Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600">Un accompagnement complet pour vos projets éducatifs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services Complémentaires */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Complémentaires</h2>
            <p className="text-xl text-gray-600">Des services additionnels pour répondre à tous vos besoins</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Notre Processus */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Processus</h2>
              <p className="text-xl text-gray-600">Comment nous vous accompagnons de A à Z</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { 
                  step: '01', 
                  title: 'Consultation', 
                  description: 'Analyse approfondie de vos besoins spécifiques et de votre environnement pédagogique',
                  icon: '🔍'
                },
                { 
                  step: '02', 
                  title: 'Devis', 
                  description: 'Proposition personnalisée et détaillée avec recommandations d\'experts',
                  icon: '📋'
                },
                { 
                  step: '03', 
                  title: 'Livraison', 
                  description: 'Transport sécurisé, installation professionnelle et mise en service',
                  icon: '🚚'
                },
                { 
                  step: '04', 
                  title: 'Formation', 
                  description: 'Formation complète de vos équipes et support technique continu',
                  icon: '🎓'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>
                    <div className="text-4xl mb-2">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Contactez notre équipe d'experts pour discuter de vos besoins spécifiques et découvrir comment nous pouvons vous accompagner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Demander un devis
              </Link>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Devis rapide
              </button>
              <Link
                to="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
        
        {/* Modal de demande de devis */}
        <QuoteRequestModal 
          isOpen={showQuoteModal} 
          onClose={() => setShowQuoteModal(false)} 
        />
      </div>
    </div>
  );
};

export default Services;