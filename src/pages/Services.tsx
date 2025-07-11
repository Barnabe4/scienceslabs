import React from 'react';
import { Truck, HeadphonesIcon, Award, Users, BookOpen, Wrench, Shield, Globe } from 'lucide-react';

const Services = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bien plus qu'un simple fournisseur, Sciences Labs vous accompagne dans tous vos projets éducatifs
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Services Complémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Notre Processus</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', description: 'Analyse de vos besoins spécifiques' },
              { step: '02', title: 'Devis', description: 'Proposition personnalisée et détaillée' },
              { step: '03', title: 'Livraison', description: 'Transport sécurisé et installation' },
              { step: '04', title: 'Formation', description: 'Formation et support continu' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un service personnalisé ?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Contactez notre équipe d'experts pour discuter de vos besoins spécifiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Demander un devis
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;