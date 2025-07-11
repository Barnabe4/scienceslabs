import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  isActive: boolean;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  registeredAt: string;
}

interface ManagementContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getProductById: (id: number) => Product | undefined;
  getOrderById: (id: string) => Order | undefined;
  getCustomerById: (id: number) => Customer | undefined;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Bécher en Verre Borosilicate 50ml',
      category: 'chemistry',
      price: 8500,
      stock: 25,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Bécher gradué en verre borosilicate résistant',
      isActive: true
    },
    {
      id: 2,
      name: 'Microscope Binoculaire',
      category: 'biology',
      price: 280000,
      stock: 8,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Microscope professionnel pour observations biologiques',
      isActive: true
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CMD-001',
      customerName: 'Lycée Technique Bamako',
      customerEmail: 'contact@lyceetechnique.ml',
      items: [
        { productId: 1, productName: 'Bécher 50ml', quantity: 10, price: 8500 }
      ],
      total: 85000,
      status: 'processing',
      createdAt: '2024-01-15'
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Lycée Technique Bamako',
      email: 'contact@lyceetechnique.ml',
      phone: '+223 XX XX XX XX',
      address: 'Bamako, Mali',
      totalOrders: 5,
      totalSpent: 450000,
      registeredAt: '2023-09-15'
    }
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const getCustomerById = (id: number) => {
    return customers.find(customer => customer.id === id);
  };

  return (
    <ManagementContext.Provider
      value={{
        products,
        orders,
        customers,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        getProductById,
        getOrderById,
        getCustomerById,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const context = useContext(ManagementContext);
  if (context === undefined) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
};