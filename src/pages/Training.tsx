import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, BookOpen, Award, ChevronRight } from 'lucide-react';

const Training = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trainingCategories = [
    { id: 'all', name: 'Toutes les formations' },
    { id: 'chemistry', name: 'Chimie' },
    { id: 'physics', name: 'Physique' },
    { id: 'biology', name: 'Sciences de la Vie et de la Terre' },
    { id: 'safety', name: 'Sécurité en laboratoire' },
    { id: 'equipment', name: 'Utilisation d\'équipements' }
  ];

  const trainings = [
    {
      id: 1,
      title: 'Formation Sécurité en Laboratoire de Chimie',
      category: 'safety',
      duration: '2 jours',
      participants: '15 max',
      price: 85000,
      level: 'Débutant',
      description: 'Formation complète sur les règles de sécurité essentielles en laboratoire de chimie',
      topics: ['EPI et leur utilisation', 'Manipulation des produits chimiques', 'Gestion des déchets', 'Procédures d\'urgence'],
      nextDate: '2024-02-15',
      location: 'Bamako',
      certified: true,
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Utilisation Avancée du Microscope',
      category: 'biology',
      duration: '3 jours',
      participants: '12 max',
      price: 95000,
      level: 'Intermédiaire',
      description: 'Maîtrisez toutes les techniques d\'observation microscopique pour vos cours de SVT',
      topics: ['Réglages optiques avancés', 'Préparation d\'échantillons', 'Techniques de coloration', 'Photomicrographie'],
      nextDate: '2024-02-22',
      location: 'Ouagadougou',
      certified: true,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Expériences de Physique Innovantes',
      category: 'physics',
      duration: '4 jours',
      participants: '20 max',
      price: 120000,
      level: 'Avancé',
      description: 'Découvrez des expériences de physique captivantes pour enrichir vos cours',
      topics: ['Mécanique appliquée', 'Électricité et magnétisme', 'Optique moderne', 'Thermodynamique'],
      nextDate: '2024-03-05',
      location: 'Abidjan',
      certified: true,
      image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Initiation à la Chimie Analytique',
      category: 'chemistry',
      duration: '3 jours',
      participants: '15 max',
      price: 98000,
      level: 'Débutant',
      description: 'Les bases de la chimie analytique pour l\'enseignement secondaire',
      topics: ['Titrages acide-base', 'Spectrophotométrie', 'Chromatographie simple', 'Analyse qualitative'],
      nextDate: '2024-03-12',
      location: 'Bamako',
      certified: true,
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredTrainings = trainings.filter(training => 
    selectedCategory === 'all' || training.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Formations & Accompagnement</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Développez vos compétences avec nos formations spécialisées animées par des experts
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, title: 'Formation Certifiante', description: 'Certificat reconnu officiellement' },
            { icon: Users, title: 'Formateurs Experts', description: 'Professionnels expérimentés' },
            { icon: Award, title: 'Suivi Personnalisé', description: 'Accompagnement post-formation' },
            { icon: MapPin, title: 'Formation Sur Site', description: 'Déplacement dans vos locaux possible' }
          ].map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {trainingCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredTrainings.map(training => (
            <div key={training.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-full h-full object-cover"
                />
                {training.certified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Certifiante
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {training.level}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{training.title}</h3>
                <p className="text-gray-600 mb-4">{training.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{training.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{training.participants}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{new Date(training.nextDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{training.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Programme:</h4>
                  <ul className="space-y-1">
                    {training.topics.slice(0, 3).map((topic, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <ChevronRight className="w-3 h-3 mr-2 text-blue-600" />
                        {topic}
                      </li>
                    ))}
                    {training.topics.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{training.topics.length - 3} autres modules
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {training.price.toLocaleString()} FCFA
                    </span>
                    <p className="text-xs text-gray-500">par participant</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Demande d'inscription
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom complet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+223 XX XX XX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Établissement
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de votre établissement"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formation souhaitée
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Sélectionnez une formation</option>
                {trainings.map(training => (
                  <option key={training.id} value={training.id}>
                    {training.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Questions particulières, besoins spécifiques..."
              />
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Training;