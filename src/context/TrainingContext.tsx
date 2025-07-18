import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Training {
  id: number;
  title: string;
  category: string;
  duration: string;
  participants: string;
  price: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  description: string;
  longDescription?: string;
  topics: string[];
  nextDate: string;
  location: string;
  certified: boolean;
  image: string;
  instructor: string;
  prerequisites?: string[];
  materials?: string[];
  status: 'active' | 'inactive' | 'draft' | 'archived';
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

interface TrainingStats {
  totalTrainings: number;
  activeTrainings: number;
  totalParticipants: number;
  totalRevenue: number;
  averageRating: number;
  upcomingTrainings: number;
}

interface TrainingContextType {
  trainings: Training[];
  stats: TrainingStats;
  addTraining: (training: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'currentParticipants' | 'rating' | 'reviews'>) => void;
  updateTraining: (id: number, updates: Partial<Training>) => void;
  deleteTraining: (id: number) => void;
  duplicateTraining: (id: number) => void;
  getTrainingById: (id: number) => Training | undefined;
  getTrainingsByCategory: (category: string) => Training[];
  getActiveTrainings: () => Training[];
  searchTrainings: (query: string) => Training[];
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: 1,
      title: 'Formation Sécurité en Laboratoire de Chimie',
      category: 'safety',
      duration: '2 jours',
      participants: '15 max',
      price: 85000,
      level: 'Débutant',
      description: 'Formation complète sur les règles de sécurité essentielles en laboratoire de chimie',
      longDescription: 'Cette formation approfondie couvre tous les aspects de la sécurité en laboratoire de chimie, des équipements de protection individuelle aux procédures d\'urgence. Les participants apprendront à identifier les risques, à manipuler les produits chimiques en toute sécurité et à mettre en place des protocoles de sécurité efficaces.',
      topics: ['EPI et leur utilisation', 'Manipulation des produits chimiques', 'Gestion des déchets', 'Procédures d\'urgence'],
      nextDate: '2024-02-15',
      location: 'Bamako',
      certified: true,
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Dr. Amadou Traoré',
      prerequisites: ['Notions de base en chimie', 'Expérience en laboratoire souhaitée'],
      materials: ['Manuel de sécurité', 'EPI fournis', 'Certificat de formation'],
      status: 'active',
      maxParticipants: 15,
      currentParticipants: 8,
      rating: 4.8,
      reviews: 24,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
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
      longDescription: 'Formation technique approfondie sur l\'utilisation des microscopes optiques et numériques. Couvre les réglages avancés, les techniques de préparation d\'échantillons, et l\'utilisation des logiciels d\'analyse d\'images.',
      topics: ['Réglages optiques avancés', 'Préparation d\'échantillons', 'Techniques de coloration', 'Photomicrographie'],
      nextDate: '2024-02-22',
      location: 'Ouagadougou',
      certified: true,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Prof. Marie Sidibé',
      prerequisites: ['Connaissances de base en biologie', 'Utilisation basique du microscope'],
      materials: ['Microscope dédié par participant', 'Échantillons variés', 'Logiciel d\'analyse'],
      status: 'active',
      maxParticipants: 12,
      currentParticipants: 5,
      rating: 4.9,
      reviews: 18,
      createdAt: '2024-01-05T14:00:00Z',
      updatedAt: '2024-01-18T09:45:00Z'
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
      longDescription: 'Formation pratique intensive sur les expériences de physique modernes. Couvre la mécanique, l\'électricité, l\'optique et la thermodynamique avec des approches pédagogiques innovantes.',
      topics: ['Mécanique appliquée', 'Électricité et magnétisme', 'Optique moderne', 'Thermodynamique'],
      nextDate: '2024-03-05',
      location: 'Abidjan',
      certified: true,
      image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Dr. Ibrahim Koné',
      prerequisites: ['Licence en physique', 'Expérience d\'enseignement'],
      materials: ['Kit d\'expériences', 'Manuel pratique', 'Accès laboratoire'],
      status: 'active',
      maxParticipants: 20,
      currentParticipants: 12,
      rating: 4.7,
      reviews: 12,
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-15T16:20:00Z'
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
      longDescription: 'Formation d\'introduction à la chimie analytique adaptée aux enseignants du secondaire. Couvre les techniques de base d\'analyse qualitative et quantitative.',
      topics: ['Titrages acide-base', 'Spectrophotométrie', 'Chromatographie simple', 'Analyse qualitative'],
      nextDate: '2024-03-12',
      location: 'Bamako',
      certified: true,
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Dr. Fatoumata Diallo',
      prerequisites: ['Notions de chimie générale'],
      materials: ['Réactifs fournis', 'Matériel d\'analyse', 'Guide pratique'],
      status: 'active',
      maxParticipants: 15,
      currentParticipants: 3,
      rating: 4.6,
      reviews: 8,
      createdAt: '2024-01-20T11:00:00Z',
      updatedAt: '2024-01-20T11:00:00Z'
    }
  ]);

  const stats: TrainingStats = {
    totalTrainings: trainings.length,
    activeTrainings: trainings.filter(t => t.status === 'active').length,
    totalParticipants: trainings.reduce((sum, t) => sum + t.currentParticipants, 0),
    totalRevenue: trainings.reduce((sum, t) => sum + (t.price * t.currentParticipants), 0),
    averageRating: trainings.reduce((sum, t) => sum + t.rating, 0) / trainings.length,
    upcomingTrainings: trainings.filter(t => new Date(t.nextDate) > new Date()).length
  };

  const addTraining = (trainingData: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'currentParticipants' | 'rating' | 'reviews'>) => {
    const newTraining: Training = {
      ...trainingData,
      id: Math.max(...trainings.map(t => t.id), 0) + 1,
      currentParticipants: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTrainings(prev => [...prev, newTraining]);
  };

  const updateTraining = (id: number, updates: Partial<Training>) => {
    setTrainings(prev => prev.map(training => 
      training.id === id 
        ? { ...training, ...updates, updatedAt: new Date().toISOString() }
        : training
    ));
  };

  const deleteTraining = (id: number) => {
    setTrainings(prev => prev.filter(training => training.id !== id));
  };

  const duplicateTraining = (id: number) => {
    const training = trainings.find(t => t.id === id);
    if (training) {
      const duplicated: Training = {
        ...training,
        id: Math.max(...trainings.map(t => t.id)) + 1,
        title: `${training.title} (Copie)`,
        status: 'draft',
        currentParticipants: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTrainings(prev => [...prev, duplicated]);
    }
  };

  const getTrainingById = (id: number) => {
    return trainings.find(training => training.id === id);
  };

  const getTrainingsByCategory = (category: string) => {
    return category === 'all' 
      ? trainings 
      : trainings.filter(training => training.category === category);
  };

  const getActiveTrainings = () => {
    return trainings.filter(training => training.status === 'active');
  };

  const searchTrainings = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return trainings.filter(training => 
      training.title.toLowerCase().includes(lowercaseQuery) ||
      training.description.toLowerCase().includes(lowercaseQuery) ||
      training.instructor.toLowerCase().includes(lowercaseQuery) ||
      training.topics.some(topic => topic.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <TrainingContext.Provider
      value={{
        trainings,
        stats,
        addTraining,
        updateTraining,
        deleteTraining,
        duplicateTraining,
        getTrainingById,
        getTrainingsByCategory,
        getActiveTrainings,
        searchTrainings,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};