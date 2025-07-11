import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'secretary' | 'partner' | 'customer';
  avatar?: string;
  permissions: string[];
  department?: string;
  assignedTasks?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'permissions'>) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  assignTask: (userId: number, task: string) => void;
  removeTask: (userId: number, task: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisateurs prédéfinis pour la démonstration
const DEMO_USERS = [
  {
    id: 1,
    name: 'Administrateur Système',
    email: 'admin@scienceslabs.com',
    password: 'admin123',
    role: 'admin' as const,
    permissions: ['all'],
    department: 'Administration'
  },
  {
    id: 2,
    name: 'Directeur Général',
    email: 'directeur@scienceslabs.com',
    password: 'director123',
    role: 'director' as const,
    permissions: ['dashboard', 'financial', 'users', 'products', 'orders', 'reports'],
    department: 'Direction'
  },
  {
    id: 3,
    name: 'Secrétaire Marie',
    email: 'marie@scienceslabs.com',
    password: 'secretary123',
    role: 'secretary' as const,
    permissions: ['dashboard', 'orders', 'customers', 'stock'],
    department: 'Administration',
    assignedTasks: ['Gestion des commandes', 'Suivi du stock']
  },
  {
    id: 4,
    name: 'Partenaire Commercial',
    email: 'partenaire@scienceslabs.com',
    password: 'partner123',
    role: 'partner' as const,
    permissions: ['dashboard', 'products', 'financial-view'],
    department: 'Commercial'
  },
  {
    id: 5,
    name: 'Client Lycée Bamako',
    email: 'lycee@bamako.edu',
    password: 'client123',
    role: 'customer' as const,
    permissions: ['shop', 'orders-view'],
    department: 'Client'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(DEMO_USERS);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: Omit<User, 'id' | 'permissions'>): Promise<boolean> => {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Date.now(),
      permissions: userData.role === 'customer' ? ['shop', 'orders-view'] : ['dashboard']
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  const assignTask = (userId: number, task: string) => {
    if (user?.role === 'admin' || user?.role === 'director') {
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId 
            ? { ...u, assignedTasks: [...(u.assignedTasks || []), task] }
            : u
        )
      );
    }
  };

  const removeTask = (userId: number, task: string) => {
    if (user?.role === 'admin' || user?.role === 'director') {
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId 
            ? { ...u, assignedTasks: (u.assignedTasks || []).filter(t => t !== task) }
            : u
        )
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        hasPermission,
        assignTask,
        removeTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};