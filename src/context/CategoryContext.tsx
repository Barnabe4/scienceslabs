import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories: SubCategory[];
  productCount: number;
  isExpanded?: boolean;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'productCount' | 'subCategories'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addSubCategory: (categoryId: string, subCategory: Omit<SubCategory, 'id' | 'productCount'>) => void;
  updateSubCategory: (categoryId: string, subCategoryId: string, updates: Partial<SubCategory>) => void;
  deleteSubCategory: (categoryId: string, subCategoryId: string) => void;
  getCategoryById: (id: string) => Category | undefined;
  getSubCategoryById: (categoryId: string, subCategoryId: string) => SubCategory | undefined;
  toggleCategoryExpansion: (categoryId: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 'chemistry', 
      name: 'Équipement de Chimie',
      description: 'Matériel de laboratoire pour expériences chimiques',
      icon: '🧪',
      productCount: 45,
      subCategories: [
        { id: 'glassware', name: 'Verreries', description: 'Verreries diverses pour laboratoire', productCount: 12 },
        { id: 'beakers', name: 'Béchers', description: 'Béchers de différentes tailles', productCount: 8 },
        { id: 'volumetric-flasks', name: 'Fioles jaugées', description: 'Fioles jaugées de précision', productCount: 6 },
        { id: 'erlenmeyers', name: 'Erlenmeyers', description: 'Erlenmeyers de différentes tailles', productCount: 5 },
        { id: 'test-tubes', name: 'Tubes à essai', description: 'Tubes à essai en verre', productCount: 4 },
        { id: 'burettes', name: 'Burettes et Pipettes', description: 'Instruments de mesure volumétrique', productCount: 7 },
        { id: 'balances', name: 'Balances de précision', description: 'Balances électroniques de précision', productCount: 3 }
      ],
      isExpanded: true
    },
    { 
      id: 'reagents', 
      name: 'Réactifs',
      description: 'Produits chimiques pour expériences',
      icon: '⚗️',
      productCount: 32,
      subCategories: [
        { id: 'fehling', name: 'Liqueur de Fehling', description: 'Pour tests de sucres réducteurs', productCount: 2 },
        { id: 'schiff', name: 'Réactif de Schiff', description: 'Pour détection des aldéhydes', productCount: 1 },
        { id: 'acids', name: 'Acides', description: 'Acides pour laboratoire', productCount: 8 },
        { id: 'bases', name: 'Bases', description: 'Bases pour laboratoire', productCount: 6 },
        { id: 'salts', name: 'Sels', description: 'Sels minéraux divers', productCount: 10 },
        { id: 'indicators', name: 'Indicateurs colorés', description: 'Indicateurs de pH', productCount: 5 }
      ]
    },
    { 
      id: 'physics', 
      name: 'Équipement de Physique',
      description: 'Matériel pour expériences de physique',
      icon: '⚡',
      productCount: 28,
      subCategories: [
        { id: 'oscilloscopes', name: 'Oscilloscopes', description: 'Pour visualisation de signaux électriques', productCount: 3 },
        { id: 'generators', name: 'Générateurs', description: 'Générateurs de fonctions et de signaux', productCount: 4 },
        { id: 'mechanics', name: 'Mécanique', description: 'Équipements pour expériences de mécanique', productCount: 8 },
        { id: 'electricity', name: 'Électricité', description: 'Matériel pour circuits électriques', productCount: 7 },
        { id: 'optics', name: 'Optique', description: 'Équipements pour expériences d\'optique', productCount: 6 }
      ]
    },
    { 
      id: 'biology', 
      name: 'Équipement de SVT',
      description: 'Matériel pour biologie et sciences naturelles',
      icon: '🔬',
      productCount: 35,
      subCategories: [
        { id: 'microscopes', name: 'Microscopes', description: 'Microscopes optiques et numériques', productCount: 8 },
        { id: 'petri-dishes', name: 'Boîtes de Pétri', description: 'Pour cultures microbiologiques', productCount: 4 },
        { id: 'models', name: 'Modèles anatomiques', description: 'Modèles du corps humain et animal', productCount: 12 },
        { id: 'specimens', name: 'Échantillons', description: 'Spécimens conservés pour observation', productCount: 6 },
        { id: 'dissection', name: 'Matériel de dissection', description: 'Instruments pour dissection', productCount: 5 }
      ]
    },
    { 
      id: 'safety', 
      name: 'Équipement de Sécurité',
      description: 'Matériel de protection et sécurité',
      icon: '🛡️',
      productCount: 22,
      subCategories: [
        { id: 'lab-coats', name: 'Blouses de laboratoire', description: 'Protection vestimentaire', productCount: 5 },
        { id: 'gloves', name: 'Gants de protection', description: 'Protection des mains', productCount: 4 },
        { id: 'safety-glasses', name: 'Lunettes de sécurité', description: 'Protection des yeux', productCount: 3 },
        { id: 'ppe', name: 'EPI complets', description: 'Équipements de protection individuelle', productCount: 2 },
        { id: 'showers', name: 'Douches de sécurité', description: 'Pour décontamination d\'urgence', productCount: 1 },
        { id: 'extinguishers', name: 'Extincteurs', description: 'Lutte contre incendie', productCount: 3 },
        { id: 'storage', name: 'Armoires de sécurité', description: 'Stockage sécurisé de produits dangereux', productCount: 4 }
      ]
    },
    { 
      id: 'furniture', 
      name: 'Mobilier de laboratoire',
      description: 'Mobilier et aménagement de laboratoire',
      icon: '🪑',
      productCount: 18,
      subCategories: [
        { id: 'benches', name: 'Paillasses', description: 'Paillasses de laboratoire', productCount: 4 },
        { id: 'stools', name: 'Tabourets', description: 'Tabourets de laboratoire', productCount: 3 },
        { id: 'cabinets', name: 'Armoires', description: 'Armoires de rangement', productCount: 5 },
        { id: 'fume-hoods', name: 'Hottes aspirantes', description: 'Hottes de laboratoire', productCount: 2 },
        { id: 'tables', name: 'Tables de laboratoire', description: 'Tables de travail', productCount: 2 },
        { id: 'chairs', name: 'Chaises ergonomiques', description: 'Chaises de bureau', productCount: 1 },
        { id: 'storage-units', name: 'Unités de rangement', description: 'Rangement modulaire', productCount: 1 }
      ]
    },
    { 
      id: 'training', 
      name: 'Formations & Accompagnement',
      description: 'Services de formation et accompagnement',
      icon: '🎓',
      productCount: 8,
      subCategories: [
        { id: 'safety-training', name: 'Formation sécurité', description: 'Formation aux règles de sécurité', productCount: 2 },
        { id: 'equipment-training', name: 'Formation équipements', description: 'Formation à l\'utilisation des équipements', productCount: 3 },
        { id: 'maintenance', name: 'Formation maintenance', description: 'Formation à la maintenance', productCount: 1 },
        { id: 'consulting', name: 'Conseil pédagogique', description: 'Accompagnement pédagogique', productCount: 1 },
        { id: 'installation', name: 'Installation et mise en service', description: 'Service d\'installation', productCount: 1 }
      ]
    },
    { 
      id: 'miscellaneous', 
      name: 'Divers',
      description: 'Autres équipements et accessoires',
      icon: '📦',
      productCount: 12,
      subCategories: [
        { id: 'consumables', name: 'Consommables', description: 'Produits consommables', productCount: 5 },
        { id: 'spare-parts', name: 'Pièces de rechange', description: 'Pièces détachées', productCount: 3 },
        { id: 'cleaning', name: 'Produits de nettoyage', description: 'Produits d\'entretien', productCount: 2 },
        { id: 'documentation', name: 'Documentation technique', description: 'Manuels et guides', productCount: 1 },
        { id: 'software', name: 'Logiciels spécialisés', description: 'Logiciels pour laboratoire', productCount: 1 }
      ]
    }
  ]);

  const addCategory = (categoryData: Omit<Category, 'id' | 'productCount' | 'subCategories'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      productCount: 0,
      subCategories: [],
      isExpanded: true
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addSubCategory = (categoryId: string, subCategoryData: Omit<SubCategory, 'id' | 'productCount'>) => {
    const newSubCategory: SubCategory = {
      ...subCategoryData,
      id: subCategoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      productCount: 0
    };

    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] }
        : cat
    ));
  };

  const updateSubCategory = (categoryId: string, subCategoryId: string, updates: Partial<SubCategory>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            subCategories: cat.subCategories.map(subCat => 
              subCat.id === subCategoryId ? { ...subCat, ...updates } : subCat
            )
          }
        : cat
    ));
  };

  const deleteSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subCategories: cat.subCategories.filter(subCat => subCat.id !== subCategoryId) }
        : cat
    ));
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const getSubCategoryById = (categoryId: string, subCategoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.subCategories.find(subCat => subCat.id === subCategoryId);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
    ));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubCategory,
        updateSubCategory,
        deleteSubCategory,
        getCategoryById,
        getSubCategoryById,
        toggleCategoryExpansion,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};