import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlogArticle {
  id: number;
  title: string;
  category: 'education' | 'technology' | 'safety' | 'news';
  author: string;
  publishDate: string;
  readTime: number;
  excerpt: string;
  content: string;
  image: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  archivedArticles: number;
  featuredArticles: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}

interface BlogContextType {
  articles: BlogArticle[];
  stats: BlogStats;
  addArticle: (article: Omit<BlogArticle, 'id' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>) => void;
  updateArticle: (id: number, updates: Partial<BlogArticle>) => void;
  deleteArticle: (id: number) => void;
  duplicateArticle: (id: number) => void;
  getArticleById: (id: number) => BlogArticle | undefined;
  getArticlesByCategory: (category: string) => BlogArticle[];
  getPublishedArticles: () => BlogArticle[];
  getFeaturedArticles: () => BlogArticle[];
  searchArticles: (query: string) => BlogArticle[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<BlogArticle[]>([
    {
      id: 1,
      title: 'Les Nouvelles Tendances en Équipement de Laboratoire pour 2024',
      category: 'technology',
      author: 'Dr. Amadou Traoré',
      publishDate: '2024-01-15',
      readTime: 5,
      excerpt: 'Découvrez les innovations technologiques qui révolutionnent les laboratoires scolaires cette année.',
      content: `Les laboratoires scolaires évoluent rapidement avec l'intégration de nouvelles technologies. Cette année 2024 marque un tournant décisif avec l'arrivée d'équipements plus intelligents, plus connectés et plus accessibles.

## Les Microscopes Numériques Nouvelle Génération

Les microscopes numériques révolutionnent l'observation en classe. Avec des capteurs haute résolution et une connectivité Wi-Fi intégrée, ils permettent aux étudiants de partager leurs observations en temps réel.

### Avantages principaux :
- Qualité d'image exceptionnelle
- Partage instantané des observations
- Enregistrement vidéo des expériences
- Interface intuitive pour les étudiants

## L'Intelligence Artificielle au Service de l'Éducation

L'IA s'invite dans les laboratoires avec des systèmes d'analyse automatique des résultats d'expériences. Ces outils aident les enseignants à identifier rapidement les erreurs et à personnaliser l'apprentissage.

## Équipements Éco-responsables

La tendance 2024 privilégie les équipements durables et éco-responsables. Les fabricants proposent désormais des alternatives plus vertes sans compromettre la qualité pédagogique.

Ces innovations transforment l'enseignement scientifique et préparent les étudiants aux défis technologiques de demain.`,
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      status: 'published',
      tags: ['innovation', 'technologie', 'microscopes', 'IA'],
      views: 1250,
      likes: 89,
      comments: 23,
      seoTitle: 'Tendances Équipement Laboratoire 2024 - Sciences Labs',
      seoDescription: 'Découvrez les dernières innovations en équipement de laboratoire pour l\'éducation scientifique en 2024.',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      title: 'Guide Pratique : Organiser un Laboratoire de Chimie Sécurisé',
      category: 'safety',
      author: 'Mme Fatoumata Sidibé',
      publishDate: '2024-01-10',
      readTime: 8,
      excerpt: 'Les règles essentielles pour créer un environnement de travail sûr dans votre laboratoire de chimie.',
      content: `La sécurité en laboratoire de chimie est primordiale pour protéger les étudiants et le personnel enseignant. Ce guide vous accompagne dans la mise en place d'un environnement sécurisé.

## Équipements de Protection Individuelle (EPI)

### Obligatoires pour tous :
- Blouses de laboratoire en coton
- Lunettes de sécurité anti-choc
- Gants adaptés aux manipulations
- Chaussures fermées antidérapantes

## Aménagement du Laboratoire

L'organisation spatiale du laboratoire joue un rôle crucial dans la prévention des accidents.

### Zones essentielles :
- Zone de stockage sécurisée pour les produits chimiques
- Poste de lavage oculaire d'urgence
- Douche de sécurité accessible
- Extincteur adapté aux feux chimiques
- Ventilation efficace

## Procédures d'Urgence

Chaque laboratoire doit disposer de procédures claires en cas d'accident :

1. **Évacuation** : Plan affiché et exercices réguliers
2. **Premiers secours** : Trousse adaptée aux risques chimiques
3. **Contacts d'urgence** : Numéros visibles et à jour
4. **Fiches de sécurité** : Accessibles pour tous les produits

## Formation du Personnel

La formation continue du personnel enseignant est essentielle pour maintenir un niveau de sécurité optimal.

En suivant ces recommandations, vous créerez un environnement d'apprentissage sûr et propice à l'expérimentation scientifique.`,
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      status: 'published',
      tags: ['sécurité', 'laboratoire', 'chimie', 'EPI'],
      views: 890,
      likes: 67,
      comments: 15,
      seoTitle: 'Sécurité Laboratoire Chimie - Guide Complet Sciences Labs',
      seoDescription: 'Guide complet pour organiser un laboratoire de chimie sécurisé dans votre établissement scolaire.',
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-10T16:45:00Z'
    },
    {
      id: 3,
      title: 'L\'Impact de l\'Expérimentation Pratique sur l\'Apprentissage des Sciences',
      category: 'education',
      author: 'Prof. Ibrahim Koné',
      publishDate: '2024-01-05',
      readTime: 6,
      excerpt: 'Comment les expériences pratiques améliorent-elles la compréhension des concepts scientifiques ?',
      content: `L'expérimentation pratique constitue le cœur de l'enseignement scientifique moderne. Les recherches démontrent son impact positif sur l'apprentissage et la motivation des étudiants.

## Bénéfices Pédagogiques

### Amélioration de la compréhension :
- Visualisation concrète des concepts abstraits
- Mémorisation renforcée par l'expérience sensorielle
- Développement de l'esprit critique
- Apprentissage par l'erreur et la correction

## Développement des Compétences

L'expérimentation développe des compétences transversales essentielles :

### Compétences techniques :
- Manipulation d'instruments scientifiques
- Respect des protocoles expérimentaux
- Observation méthodique
- Analyse de résultats

### Compétences sociales :
- Travail en équipe
- Communication scientifique
- Résolution collaborative de problèmes

## Méthodologie Efficace

Pour maximiser l'impact pédagogique :

1. **Préparation** : Objectifs clairs et matériel adapté
2. **Encadrement** : Guidance sans dirigisme excessif
3. **Réflexion** : Analyse des résultats et des méthodes
4. **Application** : Transfert vers d'autres contextes

## Défis et Solutions

### Contraintes courantes :
- Budget limité pour l'équipement
- Temps de préparation important
- Gestion de la sécurité
- Classes nombreuses

### Solutions pratiques :
- Mutualisation des équipements
- Expériences simples mais efficaces
- Formation continue des enseignants
- Partenariats avec des institutions

L'investissement dans l'expérimentation pratique transforme l'enseignement scientifique et prépare les étudiants à devenir les scientifiques de demain.`,
      image: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      status: 'published',
      tags: ['éducation', 'pédagogie', 'expérimentation', 'apprentissage'],
      views: 654,
      likes: 45,
      comments: 12,
      seoTitle: 'Impact Expérimentation Pratique Sciences - Sciences Labs',
      seoDescription: 'Découvrez comment l\'expérimentation pratique améliore l\'apprentissage des sciences.',
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-05T12:20:00Z'
    },
    {
      id: 4,
      title: 'Sciences Labs Partenaire de l\'Université de Bamako',
      category: 'news',
      author: 'Équipe Sciences Labs',
      publishDate: '2024-01-02',
      readTime: 3,
      excerpt: 'Nouveau partenariat stratégique pour équiper les laboratoires de recherche de l\'université.',
      content: `Sciences Labs est fier d'annoncer son nouveau partenariat avec l'Université de Bamako pour l'équipement de ses laboratoires de recherche.

## Un Partenariat Stratégique

Cette collaboration vise à moderniser les infrastructures de recherche de l'université et à soutenir l'excellence académique au Mali.

### Objectifs du partenariat :
- Équipement de 5 nouveaux laboratoires
- Formation du personnel technique
- Support technique continu
- Développement de programmes de recherche

## Équipements Fournis

Le projet inclut la fourniture d'équipements de pointe :

- Microscopes électroniques haute résolution
- Spectromètres avancés
- Équipements de chromatographie
- Systèmes de sécurité modernes

## Impact sur l'Éducation

Ce partenariat bénéficiera directement à :
- 500 étudiants en sciences
- 50 chercheurs et enseignants
- Programmes de master et doctorat
- Projets de recherche internationaux

## Perspectives d'Avenir

Cette collaboration ouvre la voie à d'autres partenariats avec les universités de la région et renforce notre engagement pour l'éducation scientifique en Afrique de l'Ouest.`,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      status: 'published',
      tags: ['partenariat', 'université', 'recherche', 'Mali'],
      views: 432,
      likes: 28,
      comments: 8,
      seoTitle: 'Partenariat Sciences Labs Université Bamako',
      seoDescription: 'Sciences Labs s\'associe à l\'Université de Bamako pour moderniser ses laboratoires de recherche.',
      createdAt: '2023-12-28T14:00:00Z',
      updatedAt: '2024-01-02T10:15:00Z'
    },
    {
      id: 5,
      title: 'Comment Choisir le Bon Microscope pour Votre École',
      category: 'education',
      author: 'M. Seydou Keita',
      publishDate: '2023-12-20',
      readTime: 10,
      excerpt: 'Guide complet pour sélectionner l\'équipement de microscopie adapté à vos besoins pédagogiques.',
      content: `Le choix d'un microscope pour votre établissement scolaire nécessite une réflexion approfondie sur vos besoins pédagogiques et votre budget.

## Types de Microscopes

### Microscope optique classique :
- Idéal pour l'initiation
- Budget accessible
- Maintenance simple
- Observations de base

### Microscope numérique :
- Partage d'images facilité
- Enregistrement des observations
- Interface moderne
- Coût plus élevé

### Microscope binoculaire :
- Confort d'observation
- Réduction de la fatigue oculaire
- Qualité d'image supérieure
- Investissement à long terme

## Critères de Sélection

### Niveau d'enseignement :
- **Primaire** : Microscope simple 40x-400x
- **Collège** : Microscope 40x-1000x avec éclairage LED
- **Lycée** : Microscope binoculaire avec objectifs de qualité
- **Supérieur** : Microscope professionnel avec accessoires

### Budget et maintenance :
- Coût d'acquisition
- Frais de maintenance annuels
- Disponibilité des pièces de rechange
- Formation du personnel

## Accessoires Indispensables

- Lames et lamelles de qualité
- Colorants et réactifs
- Éclairage adapté
- Système de nettoyage

## Conseils d'Achat

1. **Testez avant d'acheter** : Demandez une démonstration
2. **Vérifiez la garantie** : Minimum 2 ans recommandé
3. **Formation incluse** : Assurez-vous d'avoir une formation
4. **Support technique** : Vérifiez la disponibilité du SAV

Un bon microscope, bien choisi et bien entretenu, servira votre établissement pendant de nombreuses années et enrichira l'expérience d'apprentissage de vos étudiants.`,
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      status: 'draft',
      tags: ['microscope', 'guide', 'achat', 'éducation'],
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: 'Guide Achat Microscope École - Sciences Labs',
      seoDescription: 'Guide complet pour choisir le microscope idéal pour votre établissement scolaire.',
      createdAt: '2023-12-15T11:00:00Z',
      updatedAt: '2023-12-20T15:30:00Z'
    }
  ]);

  const stats: BlogStats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    archivedArticles: articles.filter(a => a.status === 'archived').length,
    featuredArticles: articles.filter(a => a.featured).length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
    totalComments: articles.reduce((sum, a) => sum + a.comments, 0)
  };

  const addArticle = (articleData: Omit<BlogArticle, 'id' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>) => {
    const newArticle: BlogArticle = {
      ...articleData,
      id: Math.max(...articles.map(a => a.id), 0) + 1,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setArticles(prev => [...prev, newArticle]);
  };

  const updateArticle = (id: number, updates: Partial<BlogArticle>) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, ...updates, updatedAt: new Date().toISOString() }
        : article
    ));
  };

  const deleteArticle = (id: number) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const duplicateArticle = (id: number) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      const duplicated: BlogArticle = {
        ...article,
        id: Math.max(...articles.map(a => a.id)) + 1,
        title: `${article.title} (Copie)`,
        status: 'draft',
        featured: false,
        views: 0,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setArticles(prev => [...prev, duplicated]);
    }
  };

  const getArticleById = (id: number) => {
    return articles.find(article => article.id === id);
  };

  const getArticlesByCategory = (category: string) => {
    return category === 'all' 
      ? articles 
      : articles.filter(article => article.category === category);
  };

  const getPublishedArticles = () => {
    return articles.filter(article => article.status === 'published');
  };

  const getFeaturedArticles = () => {
    return articles.filter(article => article.featured && article.status === 'published');
  };

  const searchArticles = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.author.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <BlogContext.Provider
      value={{
        articles,
        stats,
        addArticle,
        updateArticle,
        deleteArticle,
        duplicateArticle,
        getArticleById,
        getArticlesByCategory,
        getPublishedArticles,
        getFeaturedArticles,
        searchArticles,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};