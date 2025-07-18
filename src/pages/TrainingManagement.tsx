import React, { useState } from 'react';
import { 
  BookOpen, Plus, Edit, Trash2, Eye, Calendar, Users, MapPin, 
  Clock, Award, Search, Filter, ChevronDown, Save, X, 
  DollarSign, Star, CheckCircle, AlertTriangle, Settings,
  ArrowUp, ArrowDown, Copy, Send, Download
} from 'lucide-react';

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

const TrainingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [editingTraining, setEditingTraining] = useState<number | null>(null);
  const [selectedTrainings, setSelectedTrainings] = useState<number[]>([]);

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
      status: 'draft',
      maxParticipants: 15,
      currentParticipants: 0,
      rating: 0,
      reviews: 0,
      createdAt: '2024-01-20T11:00:00Z',
      updatedAt: '2024-01-20T11:00:00Z'
    }
  ]);

  const [newTraining, setNewTraining] = useState<Partial<Training>>({
    title: '',
    category: 'safety',
    duration: '',
    participants: '',
    price: 0,
    level: 'Débutant',
    description: '',
    longDescription: '',
    topics: [''],
    nextDate: '',
    location: '',
    certified: true,
    image: '',
    instructor: '',
    prerequisites: [''],
    materials: [''],
    status: 'draft',
    maxParticipants: 15,
    currentParticipants: 0,
    rating: 0,
    reviews: 0
  });

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'safety', name: 'Sécurité' },
    { id: 'chemistry', name: 'Chimie' },
    { id: 'physics', name: 'Physique' },
    { id: 'biology', name: 'Sciences de la Vie et de la Terre' },
    { id: 'equipment', name: 'Utilisation d\'équipements' },
    { id: 'pedagogy', name: 'Pédagogie' }
  ];

  const statuses = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'active', name: 'Actif' },
    { id: 'inactive', name: 'Inactif' },
    { id: 'draft', name: 'Brouillon' },
    { id: 'archived', name: 'Archivé' }
  ];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || training.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || training.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleTrainingSelect = (trainingId: number) => {
    setSelectedTrainings(prev => 
      prev.includes(trainingId) 
        ? prev.filter(id => id !== trainingId)
        : [...prev, trainingId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTrainings(
      selectedTrainings.length === filteredTrainings.length 
        ? [] 
        : filteredTrainings.map(training => training.id)
    );
  };

  const handleStatusChange = (trainingId: number, newStatus: Training['status']) => {
    setTrainings(prev => prev.map(training => 
      training.id === trainingId ? { ...training, status: newStatus, updatedAt: new Date().toISOString() } : training
    ));
  };

  const handleDeleteTraining = (trainingId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setTrainings(prev => prev.filter(training => training.id !== trainingId));
    }
  };

  const handleDuplicateTraining = (trainingId: number) => {
    const training = trainings.find(t => t.id === trainingId);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-blue-100 text-blue-800';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewTraining(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setNewTraining(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewTraining(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTopicChange = (index: number, value: string) => {
    setNewTraining(prev => ({
      ...prev,
      topics: prev.topics?.map((topic, i) => i === index ? value : topic) || []
    }));
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    setNewTraining(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.map((prereq, i) => i === index ? value : prereq) || []
    }));
  };

  const handleMaterialChange = (index: number, value: string) => {
    setNewTraining(prev => ({
      ...prev,
      materials: prev.materials?.map((material, i) => i === index ? value : material) || []
    }));
  };

  const addTopic = () => {
    setNewTraining(prev => ({
      ...prev,
      topics: [...(prev.topics || []), '']
    }));
  };

  const addPrerequisite = () => {
    setNewTraining(prev => ({
      ...prev,
      prerequisites: [...(prev.prerequisites || []), '']
    }));
  };

  const addMaterial = () => {
    setNewTraining(prev => ({
      ...prev,
      materials: [...(prev.materials || []), '']
    }));
  };

  const removeTopic = (index: number) => {
    setNewTraining(prev => ({
      ...prev,
      topics: prev.topics?.filter((_, i) => i !== index) || []
    }));
  };

  const removePrerequisite = (index: number) => {
    setNewTraining(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter((_, i) => i !== index) || []
    }));
  };

  const removeMaterial = (index: number) => {
    setNewTraining(prev => ({
      ...prev,
      materials: prev.materials?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddTraining = () => {
    if (!newTraining.title || !newTraining.description) return;

    const training: Training = {
      id: Math.max(...trainings.map(t => t.id), 0) + 1,
      title: newTraining.title!,
      category: newTraining.category!,
      duration: newTraining.duration!,
      participants: newTraining.participants!,
      price: newTraining.price!,
      level: newTraining.level!,
      description: newTraining.description!,
      longDescription: newTraining.longDescription,
      topics: newTraining.topics?.filter(t => t.trim()) || [],
      nextDate: newTraining.nextDate!,
      location: newTraining.location!,
      certified: newTraining.certified!,
      image: newTraining.image || 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: newTraining.instructor!,
      prerequisites: newTraining.prerequisites?.filter(p => p.trim()) || [],
      materials: newTraining.materials?.filter(m => m.trim()) || [],
      status: newTraining.status!,
      maxParticipants: newTraining.maxParticipants!,
      currentParticipants: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTrainings(prev => [...prev, training]);
    setNewTraining({
      title: '',
      category: 'safety',
      duration: '',
      participants: '',
      price: 0,
      level: 'Débutant',
      description: '',
      longDescription: '',
      topics: [''],
      nextDate: '',
      location: '',
      certified: true,
      image: '',
      instructor: '',
      prerequisites: [''],
      materials: [''],
      status: 'draft',
      maxParticipants: 15,
      currentParticipants: 0,
      rating: 0,
      reviews: 0
    });
    setShowAddTraining(false);
    alert('Formation créée avec succès !');
  };

  const startEditTraining = (training: Training) => {
    setNewTraining({
      title: training.title,
      category: training.category,
      duration: training.duration,
      participants: training.participants,
      price: training.price,
      level: training.level,
      description: training.description,
      longDescription: training.longDescription,
      topics: training.topics,
      nextDate: training.nextDate,
      location: training.location,
      certified: training.certified,
      image: training.image,
      instructor: training.instructor,
      prerequisites: training.prerequisites,
      materials: training.materials,
      status: training.status,
      maxParticipants: training.maxParticipants,
      currentParticipants: training.currentParticipants,
      rating: training.rating,
      reviews: training.reviews
    });
    setEditingTraining(training.id);
  };

  const handleUpdateTraining = () => {
    if (!editingTraining || !newTraining.title || !newTraining.description) return;

    setTrainings(prev => prev.map(training => 
      training.id === editingTraining 
        ? { 
            ...training, 
            ...newTraining,
            updatedAt: new Date().toISOString()
          } as Training
        : training
    ));
    
    setEditingTraining(null);
    setNewTraining({
      title: '',
      category: 'safety',
      duration: '',
      participants: '',
      price: 0,
      level: 'Débutant',
      description: '',
      longDescription: '',
      topics: [''],
      nextDate: '',
      location: '',
      certified: true,
      image: '',
      instructor: '',
      prerequisites: [''],
      materials: [''],
      status: 'draft',
      maxParticipants: 15,
      currentParticipants: 0,
      rating: 0,
      reviews: 0
    });
    alert('Formation mise à jour avec succès !');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Formations</h1>
          <p className="text-gray-600">Gérez votre catalogue de formations et accompagnements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Export CSV en cours...')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddTraining(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle formation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Formations</p>
              <p className="text-2xl font-bold text-gray-900">{trainings.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Formations Actives</p>
              <p className="text-2xl font-bold text-green-600">
                {trainings.filter(t => t.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Participants Inscrits</p>
              <p className="text-2xl font-bold text-purple-600">
                {trainings.reduce((sum, t) => sum + t.currentParticipants, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenus Formations</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(trainings.reduce((sum, t) => sum + (t.price * t.currentParticipants), 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher formations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedTrainings.length} sélectionné{selectedTrainings.length > 1 ? 's' : ''}
            </span>
            {selectedTrainings.length > 0 && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Actions groupées
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les niveaux</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trainings Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTrainings.length === filteredTrainings.length && filteredTrainings.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée/Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prochaine Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTrainings.includes(training.id)}
                      onChange={() => handleTrainingSelect(training.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                        <img
                          src={training.image}
                          alt={training.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{training.title}</div>
                        <div className="text-sm text-gray-500">{training.instructor}</div>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(training.level)}`}>
                            {training.level}
                          </span>
                          {training.certified && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              Certifiante
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {categories.find(c => c.id === training.category)?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{training.duration}</div>
                    <div className="text-sm font-medium text-blue-600">{formatCurrency(training.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {training.currentParticipants}/{training.maxParticipants}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(training.currentParticipants / training.maxParticipants) * 100}%`}}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(training.nextDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-500">{training.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={training.status}
                      onChange={(e) => handleStatusChange(training.id, e.target.value as Training['status'])}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(training.status)}`}
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="draft">Brouillon</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => alert(`Aperçu de la formation ${training.title}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEditTraining(training)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateTraining(training.id)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTraining(training.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Training Modal */}
      {(showAddTraining || editingTraining) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTraining ? 'Modifier la formation' : 'Ajouter une formation'}
              </h2>
              <button
                onClick={() => {
                  setShowAddTraining(false);
                  setEditingTraining(null);
                  setNewTraining({
                    title: '',
                    category: 'safety',
                    duration: '',
                    participants: '',
                    price: 0,
                    level: 'Débutant',
                    description: '',
                    longDescription: '',
                    topics: [''],
                    nextDate: '',
                    location: '',
                    certified: true,
                    image: '',
                    instructor: '',
                    prerequisites: [''],
                    materials: [''],
                    status: 'draft',
                    maxParticipants: 15,
                    currentParticipants: 0,
                    rating: 0,
                    reviews: 0
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations générales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de la formation *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newTraining.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Formation Sécurité en Laboratoire"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                      <select
                        name="category"
                        value={newTraining.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                      <select
                        name="level"
                        value={newTraining.level}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description courte *
                    </label>
                    <textarea
                      name="description"
                      value={newTraining.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description courte de la formation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description détaillée
                    </label>
                    <textarea
                      name="longDescription"
                      value={newTraining.longDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description détaillée de la formation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de l'image
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={newTraining.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Détails pratiques */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Détails pratiques</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                      <input
                        type="text"
                        name="duration"
                        value={newTraining.duration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 2 jours"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA)</label>
                      <input
                        type="number"
                        name="price"
                        value={newTraining.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="85000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Participants max</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        value={newTraining.maxParticipants}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prochaine date</label>
                      <input
                        type="date"
                        name="nextDate"
                        value={newTraining.nextDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                      <input
                        type="text"
                        name="location"
                        value={newTraining.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bamako"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Formateur</label>
                      <input
                        type="text"
                        name="instructor"
                        value={newTraining.instructor}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Dr. Amadou Traoré"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select
                      name="status"
                      value={newTraining.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="certified"
                      checked={newTraining.certified}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Formation certifiante</span>
                  </div>
                </div>
              </div>

              {/* Programme et contenu */}
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Programme de formation</h3>
                  <div className="space-y-2">
                    {newTraining.topics?.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => handleTopicChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Sujet du programme..."
                        />
                        <button
                          onClick={() => removeTopic(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addTopic}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter un sujet
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Prérequis</h4>
                    <div className="space-y-2">
                      {newTraining.prerequisites?.map((prereq, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={prereq}
                            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Prérequis..."
                          />
                          <button
                            onClick={() => removePrerequisite(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addPrerequisite}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter un prérequis
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Matériel fourni</h4>
                    <div className="space-y-2">
                      {newTraining.materials?.map((material, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={material}
                            onChange={(e) => handleMaterialChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Matériel fourni..."
                          />
                          <button
                            onClick={() => removeMaterial(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addMaterial}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter du matériel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => {
                  setShowAddTraining(false);
                  setEditingTraining(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingTraining ? handleUpdateTraining : handleAddTraining}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingTraining ? 'Mettre à jour' : 'Créer la formation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-8 h-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Programmer une session</h4>
              <p className="text-sm text-gray-600">Planifier de nouvelles dates</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Send className="w-8 h-8 text-green-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Envoyer invitations</h4>
              <p className="text-sm text-gray-600">Inviter des participants</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-8 h-8 text-purple-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Paramètres formations</h4>
              <p className="text-sm text-gray-600">Configurer les options</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingManagement;