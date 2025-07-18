import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, HeadphonesIcon, Award, Users, BookOpen, Wrench, Shield, Globe, Target, Eye, Heart } from 'lucide-react';
import { useAbout } from '../context/AboutContext';
import QuoteRequestModal from '../components/QuoteRequestModal';

const Services = () => {
  const { companyInfo, getSectionsByType } = useAbout();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const missionVisionValues = [
    ...getSectionsByType('mission'),
    ...getSectionsByType('vision'),
    ...getSectionsByType('values')
  ];

  const mainServices = getSectionsByType('service');
  const additionalServices = getSectionsByType('additional_service');
  const processSteps = getSectionsByType('process');

  const getIconComponent = (iconText: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      '🚚': Truck,
      '🎧': HeadphonesIcon,
      '🏆': Award,
      '👥': Users,
      '📚': BookOpen,
      '🔧': Wrench,
      '🛡️': Shield,
      '🌍': Globe
    };
    return iconMap[iconText] || Users;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos de {companyInfo.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {companyInfo.description}
          </p>
        </div>

        {/* Mission, Vision, Valeurs */}
        {missionVisionValues.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission, Vision & Valeurs</h2>
              <p className="text-xl text-gray-600">Les fondements de notre engagement</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {missionVisionValues.map((item, index) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{item.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-3">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Nos Services */}
        {mainServices.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
              <p className="text-xl text-gray-600">Un accompagnement complet pour vos projets éducatifs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => {
                const IconComponent = getIconComponent(service.icon || '👥');
                return (
                  <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-700">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Services Complémentaires */}
        {additionalServices.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Complémentaires</h2>
              <p className="text-xl text-gray-600">Des services additionnels pour répondre à tous vos besoins</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => {
                const IconComponent = getIconComponent(service.icon || '🔧');
                return (
                  <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
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
        )}

        {/* Notre Processus */}
        {processSteps.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Processus</h2>
                <p className="text-xl text-gray-600">Comment nous vous accompagnons de A à Z</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <div key={step.id} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="text-4xl mb-2">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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