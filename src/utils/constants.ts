export const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Toutes catégories',
    subCategories: []
  },
  { 
    id: 'chemistry', 
    name: 'Équipement de Chimie',
    subCategories: [
      { id: 'glassware', name: 'Verreries' },
      { id: 'beakers', name: 'Béchers' },
      { id: 'volumetric-flasks', name: 'Fioles jaugées' },
      { id: 'erlenmeyers', name: 'Erlenmeyers' },
      { id: 'test-tubes', name: 'Tubes à essai' },
      { id: 'burettes', name: 'Burettes et Pipettes' },
      { id: 'balances', name: 'Balances de précision' },
      { id: 'heating', name: 'Matériel de chauffage' }
    ]
  },
  { 
    id: 'reagents', 
    name: 'Réactifs',
    subCategories: [
      { id: 'fehling', name: 'Liqueur de Fehling' },
      { id: 'schiff', name: 'Réactif de Schiff' },
      { id: 'acids', name: 'Acides' },
      { id: 'bases', name: 'Bases' },
      { id: 'salts', name: 'Sels' },
      { id: 'indicators', name: 'Indicateurs colorés' },
      { id: 'organic', name: 'Réactifs organiques' },
      { id: 'inorganic', name: 'Réactifs inorganiques' }
    ]
  },
  { 
    id: 'physics', 
    name: 'Équipement de Physique',
    subCategories: [
      { id: 'oscilloscopes', name: 'Oscilloscopes' },
      { id: 'generators', name: 'Générateurs' },
      { id: 'mechanics', name: 'Mécanique' },
      { id: 'electricity', name: 'Électricité' },
      { id: 'optics', name: 'Optique' },
      { id: 'thermodynamics', name: 'Thermodynamique' },
      { id: 'magnetism', name: 'Magnétisme' },
      { id: 'waves', name: 'Ondes et vibrations' }
    ]
  },
  { 
    id: 'biology', 
    name: 'Équipement de SVT',
    subCategories: [
      { id: 'microscopes', name: 'Microscopes' },
      { id: 'petri-dishes', name: 'Boîtes de Pétri' },
      { id: 'models', name: 'Modèles anatomiques' },
      { id: 'specimens', name: 'Échantillons' },
      { id: 'dissection', name: 'Matériel de dissection' },
      { id: 'culture', name: 'Matériel de culture' },
      { id: 'observation', name: 'Matériel d\'observation' }
    ]
  },
  { 
    id: 'safety', 
    name: 'Équipement de Sécurité',
    subCategories: [
      { id: 'lab-coats', name: 'Blouses de laboratoire' },
      { id: 'gloves', name: 'Gants de protection' },
      { id: 'safety-glasses', name: 'Lunettes de sécurité' },
      { id: 'ppe', name: 'EPI complets' },
      { id: 'showers', name: 'Douches de sécurité' },
      { id: 'extinguishers', name: 'Extincteurs' },
      { id: 'storage', name: 'Armoires de sécurité' },
      { id: 'ventilation', name: 'Systèmes de ventilation' }
    ]
  },
  { 
    id: 'furniture', 
    name: 'Mobilier de Laboratoire',
    subCategories: [
      { id: 'benches', name: 'Paillasses' },
      { id: 'stools', name: 'Tabourets' },
      { id: 'cabinets', name: 'Armoires' },
      { id: 'fume-hoods', name: 'Hottes aspirantes' },
      { id: 'tables', name: 'Tables de laboratoire' },
      { id: 'chairs', name: 'Chaises ergonomiques' },
      { id: 'storage-units', name: 'Unités de rangement' }
    ]
  },
  { 
    id: 'training', 
    name: 'Formations & Accompagnement',
    subCategories: [
      { id: 'safety-training', name: 'Formation sécurité' },
      { id: 'equipment-training', name: 'Formation équipements' },
      { id: 'maintenance', name: 'Formation maintenance' },
      { id: 'consulting', name: 'Conseil pédagogique' },
      { id: 'installation', name: 'Installation et mise en service' }
    ]
  },
  { 
    id: 'miscellaneous', 
    name: 'Divers',
    subCategories: [
      { id: 'consumables', name: 'Consommables' },
      { id: 'spare-parts', name: 'Pièces de rechange' },
      { id: 'cleaning', name: 'Produits de nettoyage' },
      { id: 'documentation', name: 'Documentation technique' },
      { id: 'software', name: 'Logiciels spécialisés' }
    ]
  }
];

export const PRICE_RANGES = [
  { id: 'all', name: 'Tous les prix' },
  { id: '0-50000', name: '0 - 50,000 FCFA' },
  { id: '50000-100000', name: '50,000 - 100,000 FCFA' },
  { id: '100000-200000', name: '100,000 - 200,000 FCFA' },
  { id: '200000-500000', name: '200,000 - 500,000 FCFA' },
  { id: '500000+', name: '500,000+ FCFA' }
];

export const USER_ROLES = {
  admin: {
    label: 'Administrateur',
    permissions: ['all'],
    color: 'bg-red-100 text-red-800',
    description: 'Accès complet à toutes les fonctionnalités'
  },
  director: {
    label: 'Directeur',
    permissions: ['dashboard', 'financial', 'users', 'products', 'orders'],
    color: 'bg-purple-100 text-purple-800',
    description: 'Gestion complète sauf administration système'
  },
  secretary: {
    label: 'Secrétaire',
    permissions: ['dashboard', 'orders', 'customers', 'stock'],
    color: 'bg-blue-100 text-blue-800',
    description: 'Gestion des commandes et du stock'
  },
  partner: {
    label: 'Partenaire',
    permissions: ['dashboard', 'products', 'financial-view'],
    color: 'bg-green-100 text-green-800',
    description: 'Consultation des produits et finances'
  },
  customer: {
    label: 'Client',
    permissions: ['shop', 'orders-view'],
    color: 'bg-gray-100 text-gray-800',
    description: 'Achat et suivi de commandes'
  }
};

export const FINANCIAL_CATEGORIES = [
  { id: 'revenue', name: 'Revenus', type: 'income', color: 'text-green-600' },
  { id: 'electricity', name: 'Électricité', type: 'expense', color: 'text-red-600' },
  { id: 'store-rent', name: 'Frais du magasin', type: 'expense', color: 'text-red-600' },
  { id: 'secretary-salary', name: 'Salaire secrétaires', type: 'expense', color: 'text-red-600' },
  { id: 'director-salary', name: 'Salaire directeur', type: 'expense', color: 'text-red-600' },
  { id: 'maintenance', name: 'Frais de maintenance', type: 'expense', color: 'text-red-600' },
  { id: 'transport', name: 'Transport et livraison', type: 'expense', color: 'text-red-600' },
  { id: 'marketing', name: 'Marketing et publicité', type: 'expense', color: 'text-red-600' },
  { id: 'insurance', name: 'Assurances', type: 'expense', color: 'text-red-600' },
  { id: 'taxes', name: 'Taxes et impôts', type: 'expense', color: 'text-red-600' },
  { id: 'supplies', name: 'Fournitures bureau', type: 'expense', color: 'text-red-600' },
  { id: 'training', name: 'Formation du personnel', type: 'expense', color: 'text-red-600' }
];

export const DASHBOARD_PERIODS = [
  { id: 'today', name: 'Aujourd\'hui' },
  { id: 'yesterday', name: 'Hier' },
  { id: 'last-7-days', name: '7 derniers jours' },
  { id: 'this-month', name: 'Ce mois' },
  { id: 'last-month', name: 'Mois dernier' },
  { id: 'this-year', name: 'Cette année' },
  { id: 'last-year', name: 'Année dernière' },
  { id: 'custom', name: 'Période personnalisée' }
];

export const ORDER_STATUSES = {
  pending: { label: 'En attente', color: 'bg-gray-100 text-gray-800' },
  processing: { label: 'En cours', color: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Expédié', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Livré', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' }
};

export const COMPANY_INFO = {
  name: 'Sciences Labs',
  tagline: 'Équipements Scientifiques Éducatifs',
  phone: '+223 XX XX XX XX',
  email: 'contact@scienceslabs.com',
  address: 'Bamako, Mali',
  description: 'Votre partenaire de confiance pour l\'équipement de laboratoires scolaires et universitaires en Afrique de l\'Ouest.'
};

export const SAMPLE_PRODUCTS = [
  // Équipement de Chimie - Verreries
  {
    id: 1,
    name: 'Bécher en Verre Borosilicate 50ml',
    category: 'chemistry',
    subCategory: 'beakers',
    price: 8500,
    originalPrice: 10000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Bécher gradué en verre borosilicate résistant aux chocs thermiques',
    rating: 4.8,
    reviews: 24,
    inStock: true,
    isNew: true,
    brand: 'Sciences Labs',
    sku: 'BCH-050-SL'
  },
  {
    id: 2,
    name: 'Fiole Jaugée 100ml Classe A',
    category: 'chemistry',
    subCategory: 'volumetric-flasks',
    price: 12000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fiole jaugée de précision classe A avec bouchon rodé',
    rating: 4.9,
    reviews: 18,
    inStock: true,
    isNew: false,
    brand: 'Sciences Labs',
    sku: 'FJ-100-A'
  },
  
  // Réactifs
  {
    id: 3,
    name: 'Liqueur de Fehling A et B',
    category: 'reagents',
    subCategory: 'fehling',
    price: 15000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Kit complet liqueur de Fehling A et B pour tests de sucres réducteurs',
    rating: 4.7,
    reviews: 12,
    inStock: true,
    isNew: false,
    brand: 'ChemLab',
    sku: 'FEH-AB-500'
  },
  {
    id: 4,
    name: 'Réactif de Schiff',
    category: 'reagents',
    subCategory: 'schiff',
    price: 18000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Réactif de Schiff pour la détection des aldéhydes',
    rating: 4.6,
    reviews: 8,
    inStock: true,
    isNew: false,
    brand: 'ChemLab',
    sku: 'SCH-250'
  },

  // Équipement de Physique
  {
    id: 5,
    name: 'Oscilloscope Numérique 2 Voies',
    category: 'physics',
    subCategory: 'oscilloscopes',
    price: 195000,
    image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Oscilloscope numérique 2 voies 100MHz pour mesures électriques',
    rating: 4.8,
    reviews: 15,
    inStock: true,
    isNew: true,
    brand: 'TechLab',
    sku: 'OSC-2V-100'
  },
  {
    id: 6,
    name: 'Générateur de Fonctions',
    category: 'physics',
    subCategory: 'generators',
    price: 85000,
    image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Générateur de fonctions 0.1Hz à 2MHz avec formes d\'ondes multiples',
    rating: 4.5,
    reviews: 10,
    inStock: true,
    isNew: false,
    brand: 'TechLab',
    sku: 'GEN-2M'
  },

  // Équipement de SVT
  {
    id: 7,
    name: 'Microscope Binoculaire 1000x',
    category: 'biology',
    subCategory: 'microscopes',
    price: 280000,
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Microscope binoculaire professionnel grossissement 40x à 1000x',
    rating: 4.9,
    reviews: 22,
    inStock: true,
    isNew: false,
    brand: 'BioLab',
    sku: 'MIC-BIN-1000'
  },
  {
    id: 8,
    name: 'Boîtes de Pétri Stériles (Pack 100)',
    category: 'biology',
    subCategory: 'petri-dishes',
    price: 25000,
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Boîtes de Pétri en plastique stériles diamètre 90mm',
    rating: 4.7,
    reviews: 18,
    inStock: true,
    isNew: false,
    brand: 'BioLab',
    sku: 'PET-90-100'
  },

  // Équipement de Sécurité
  {
    id: 9,
    name: 'Blouse de Laboratoire Coton',
    category: 'safety',
    subCategory: 'lab-coats',
    price: 12000,
    image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Blouse de laboratoire 100% coton avec boutons pression',
    rating: 4.6,
    reviews: 35,
    inStock: true,
    isNew: false,
    brand: 'SafeLab',
    sku: 'BLO-COT-M'
  },
  {
    id: 10,
    name: 'Lunettes de Sécurité Anti-Choc',
    category: 'safety',
    subCategory: 'safety-glasses',
    price: 8500,
    image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Lunettes de protection avec verres anti-choc et anti-rayures',
    rating: 4.8,
    reviews: 28,
    inStock: true,
    isNew: false,
    brand: 'SafeLab',
    sku: 'LUN-SEC-AC'
  },

  // Mobilier de Laboratoire
  {
    id: 11,
    name: 'Paillasse de Laboratoire 2m',
    category: 'furniture',
    subCategory: 'benches',
    price: 185000,
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Paillasse résistante aux produits chimiques avec évier intégré',
    rating: 4.7,
    reviews: 12,
    inStock: true,
    isNew: false,
    brand: 'LabFurniture',
    sku: 'PAI-2M-CHIM'
  },
  {
    id: 12,
    name: 'Tabouret de Laboratoire Réglable',
    category: 'furniture',
    subCategory: 'stools',
    price: 45000,
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tabouret ergonomique avec hauteur réglable et repose-pieds',
    rating: 4.5,
    reviews: 20,
    inStock: true,
    isNew: false,
    brand: 'LabFurniture',
    sku: 'TAB-REG-ERG'
  }
];