import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beaker, Microscope, Shield, Truck, Award, Users } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import QuoteRequestModal from '../components/QuoteRequestModal';

const Home = () => {
  const { categories } = useCategories();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  
  const features = [
    {
      icon: Beaker,
      title: 'Équipements de Qualité',
      description: 'Matériel scientifique certifié et de haute qualité pour vos laboratoires'
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Livraison dans toute l\'Afrique de l\'Ouest sous 7-14 jours'
    },
    {
      icon: Shield,
      title: 'Garantie Totale',
      description: 'Garantie complète sur tous nos produits avec service après-vente'
    },
    {
      icon: Users,
      title: 'Formation Incluse',
      description: 'Formation gratuite à l\'utilisation du matériel pour vos équipes'
    }
  ];

  // Afficher toutes les catégories dynamiquement sur la page d'accueil
  const displayCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: getImageForCategory(cat.id),
    description: cat.description,
    productCount: cat.productCount
  }));

  function getImageForCategory(categoryId: string) {
    const imageMap: Record<string, string> = {
      'chemistry': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      'physics': 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
      'biology': 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      'safety': 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      'furniture': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      'reagents': 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400',
      'training': 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400',
      'miscellaneous': 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400',
      'informatique': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    // Image par défaut pour les nouvelles catégories
    return imageMap[categoryId] || 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Équipez vos laboratoires avec
                <span className="text-orange-400"> Sciences Labs</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Fournisseur leader d'équipements scientifiques éducatifs en Afrique de l'Ouest. 
                Qualité professionnelle, prix compétitifs, service exceptionnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/boutique"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                >
                  Découvrir nos produits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
                >
                  Demander un devis
                </Link>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
                >
                  Devis rapide
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Laboratoire moderne"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-bold text-lg">500+</p>
                    <p className="text-sm text-gray-600">Établissements équipés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal de demande de devis */}
        <QuoteRequestModal 
          isOpen={showQuoteModal} 
          onClose={() => setShowQuoteModal(false)} 
        />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Sciences Labs ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous nous engageons à fournir les meilleurs équipements scientifiques avec un service exceptionnel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Catégories d'Équipements
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour équiper vos laboratoires
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayCategories.map((category, index) => (
              <Link
                key={index}
                to={`/boutique?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                  <p className="text-xs text-gray-300 mt-1">{category.productCount} produits</p>
                </div>
              </Link>
            ))}
          </div>
          
          {displayCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune catégorie disponible</p>
              <p className="text-gray-400 text-sm mt-2">Ajoutez des catégories depuis l'interface d'administration</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à équiper votre laboratoire ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour un devis personnalisé et découvrez comment nous pouvons 
            vous aider à créer un environnement d'apprentissage exceptionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Demander un devis gratuit
            </Link>
            <Link
              to="/boutique"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center"
            >
              Voir nos produits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;