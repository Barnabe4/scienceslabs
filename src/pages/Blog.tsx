import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'education', name: 'Éducation' },
    { id: 'technology', name: 'Technologie' },
    { id: 'safety', name: 'Sécurité' },
    { id: 'news', name: 'Actualités' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Les Nouvelles Tendances en Équipement de Laboratoire pour 2024',
      category: 'technology',
      author: 'Dr. Amadou Traoré',
      date: '2024-01-15',
      readTime: '5 min',
      excerpt: 'Découvrez les innovations technologiques qui révolutionnent les laboratoires scolaires cette année.',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      title: 'Guide Pratique : Organiser un Laboratoire de Chimie Sécurisé',
      category: 'safety',
      author: 'Mme Fatoumata Sidibé',
      date: '2024-01-10',
      readTime: '8 min',
      excerpt: 'Les règles essentielles pour créer un environnement de travail sûr dans votre laboratoire de chimie.',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 3,
      title: 'L\'Impact de l\'Expérimentation Pratique sur l\'Apprentissage des Sciences',
      category: 'education',
      author: 'Prof. Ibrahim Koné',
      date: '2024-01-05',
      readTime: '6 min',
      excerpt: 'Comment les expériences pratiques améliorent-elles la compréhension des concepts scientifiques ?',
      image: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 4,
      title: 'Sciences Labs Partenaire de l\'Université de Bamako',
      category: 'news',
      author: 'Équipe Sciences Labs',
      date: '2024-01-02',
      readTime: '3 min',
      excerpt: 'Nouveau partenariat stratégique pour équiper les laboratoires de recherche de l\'université.',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 5,
      title: 'Les Défis de l\'Enseignement Scientifique en Afrique de l\'Ouest',
      category: 'education',
      author: 'Dr. Aminata Diallo',
      date: '2023-12-28',
      readTime: '7 min',
      excerpt: 'Analyse des enjeux et solutions pour améliorer l\'enseignement des sciences dans la région.',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 6,
      title: 'Comment Choisir le Bon Microscope pour Votre École',
      category: 'technology',
      author: 'M. Seydou Keita',
      date: '2023-12-20',
      readTime: '10 min',
      excerpt: 'Guide complet pour sélectionner l\'équipement de microscopie adapté à vos besoins pédagogiques.',
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const featuredArticle = articles.find(article => article.featured);
  const otherArticles = filteredArticles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-100 text-blue-800',
      safety: 'bg-red-100 text-red-800',
      education: 'bg-green-100 text-green-800',
      news: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Actualités</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières tendances et actualités du monde scientifique éducatif
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'all' && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredArticle.category)}`}>
                      Article vedette
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center mr-6">
                      <User className="w-4 h-4 mr-2" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center mr-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredArticle.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                    Lire l'article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map(article => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <User className="w-3 h-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center mr-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.date).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
                  Lire la suite
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white mt-16 mb-12">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl text-blue-100 mb-6">
            Abonnez-vous à notre newsletter pour recevoir les dernières actualités
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;