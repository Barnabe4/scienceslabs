// Mock API service - replace with real API calls in production

import { Product, Order, Customer, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Bécher en Verre Borosilicate 50ml',
    category: 'chemistry',
    subCategory: 'beakers',
    price: 8500,
    originalPrice: 10000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Bécher gradué en verre borosilicate résistant',
    rating: 4.8,
    reviews: 24,
    inStock: true,
    isNew: true,
    brand: 'Sciences Labs',
    sku: 'BCH-050-SL'
  }
];

export const apiService = {
  // Products
  async getProducts(filters?: {
    category?: string;
    subCategory?: string;
    priceRange?: string;
    search?: string;
  }): Promise<Product[]> {
    await delay(500);
    let filteredProducts = [...mockProducts];
    
    if (filters?.category && filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters?.subCategory && filters.subCategory !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.subCategory === filters.subCategory);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredProducts;
  },

  async getProduct(id: number): Promise<Product | null> {
    await delay(300);
    return mockProducts.find(p => p.id === id) || null;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(500);
    const newProduct = {
      ...product,
      id: Math.max(...mockProducts.map(p => p.id), 0) + 1
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockProducts[index] = { ...mockProducts[index], ...updates };
    return mockProducts[index];
  },

  async deleteProduct(id: number): Promise<boolean> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockProducts.splice(index, 1);
    return true;
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    await delay(500);
    return [];
  },

  async getOrder(id: string): Promise<Order | null> {
    await delay(300);
    return null;
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    await delay(500);
    const newOrder: Order = {
      ...order,
      id: `CMD-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    return newOrder;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    await delay(500);
    return null;
  },

  // Customers
  async getCustomers(): Promise<Customer[]> {
    await delay(500);
    return [];
  },

  async getCustomer(id: number): Promise<Customer | null> {
    await delay(300);
    return null;
  },

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    await delay(1000);
    
    // Mock authentication
    if (email === 'admin@scienceslabs.com' && password === 'admin123') {
      return {
        user: {
          id: 1,
          name: 'Administrateur',
          email: 'admin@scienceslabs.com',
          role: 'admin'
        },
        token: 'mock-jwt-token'
      };
    }
    
    return null;
  },

  async register(userData: Omit<User, 'id'>): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    const newUser: User = {
      ...userData,
      id: Date.now()
    };
    
    return {
      user: newUser,
      token: 'mock-jwt-token'
    };
  },

  async logout(): Promise<void> {
    await delay(300);
  },

  // Contact
  async sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
  }): Promise<boolean> {
    await delay(1000);
    console.log('Contact message sent:', data);
    return true;
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<boolean> {
    await delay(500);
    console.log('Newsletter subscription:', email);
    return true;
  }
};