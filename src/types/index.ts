export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  longDescription?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  brand?: string;
  sku?: string;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}

export interface ProductVariant {
  id: number;
  size: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'secretary' | 'partner' | 'customer';
  avatar?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  registeredAt: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Training {
  id: number;
  title: string;
  category: string;
  duration: string;
  participants: string;
  price: number;
  level: string;
  description: string;
  topics: string[];
  nextDate: string;
  location: string;
  certified: boolean;
  image: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured: boolean;
}