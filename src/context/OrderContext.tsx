import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sku: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company?: string;
}

interface ShippingInfo {
  method: 'standard' | 'express' | 'pickup';
  cost: number;
  estimatedDelivery: string;
  trackingNumber?: string;
  carrier?: string;
}

interface PaymentInfo {
  method: 'mobile_money' | 'bank_transfer' | 'cash' | 'credit_card';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
  amount: number;
  currency: 'FCFA';
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  payment: PaymentInfo;
  shipping: ShippingInfo;
  notes: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  tags: string[];
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface OrderContextType {
  orders: Order[];
  stats: OrderStats;
  selectedOrder: Order | null;
  filters: {
    status: string;
    priority: string;
    dateRange: string;
    customer: string;
    paymentStatus: string;
  };
  setFilters: (filters: any) => void;
  setSelectedOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderPriority: (orderId: string, priority: Order['priority']) => void;
  addOrderNote: (orderId: string, note: string, isInternal: boolean) => void;
  updateShippingInfo: (orderId: string, shipping: Partial<ShippingInfo>) => void;
  updatePaymentStatus: (orderId: string, status: PaymentInfo['status']) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => void;
  deleteOrder: (orderId: string) => void;
  getOrdersByStatus: (status: string) => Order[];
  getOrdersByPriority: (priority: string) => Order[];
  searchOrders: (query: string) => Order[];
  exportOrders: (format: 'csv' | 'pdf') => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: 'all',
    customer: '',
    paymentStatus: 'all'
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'CMD-2024-001',
      customer: {
        id: 1,
        name: 'Lycée Technique de Bamako',
        email: 'contact@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        address: 'Avenue Modibo Keita',
        city: 'Bamako',
        country: 'Mali',
        postalCode: 'BP 1234',
        company: 'Lycée Technique de Bamako'
      },
      items: [
        {
          id: 1,
          productId: 1,
          productName: 'Bécher en Verre Borosilicate 50ml',
          productImage: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 25,
          unitPrice: 8500,
          totalPrice: 212500,
          sku: 'BCH-050-SL'
        },
        {
          id: 2,
          productId: 5,
          productName: 'Microscope Binoculaire 1000x',
          productImage: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 2,
          unitPrice: 280000,
          totalPrice: 560000,
          sku: 'MIC-BIN-1000'
        }
      ],
      status: 'processing',
      priority: 'high',
      subtotal: 772500,
      taxAmount: 139050,
      shippingCost: 25000,
      discountAmount: 0,
      totalAmount: 936550,
      payment: {
        method: 'bank_transfer',
        status: 'paid',
        transactionId: 'TXN-2024-001',
        amount: 936550,
        currency: 'FCFA'
      },
      shipping: {
        method: 'standard',
        cost: 25000,
        estimatedDelivery: '2024-02-15',
        trackingNumber: 'SL-TRACK-001',
        carrier: 'Sciences Labs Livraison'
      },
      notes: 'Commande urgente pour le laboratoire de chimie',
      internalNotes: 'Client prioritaire - livraison express recommandée',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      estimatedDelivery: '2024-02-15',
      tags: ['urgent', 'education', 'chimie']
    },
    {
      id: '2',
      orderNumber: 'CMD-2024-002',
      customer: {
        id: 2,
        name: 'Université de Ouagadougou',
        email: 'labo@univ-ouaga.bf',
        phone: '+226 25 30 70 64',
        address: 'Avenue Charles de Gaulle',
        city: 'Ouagadougou',
        country: 'Burkina Faso',
        postalCode: 'BP 7021',
        company: 'Université de Ouagadougou'
      },
      items: [
        {
          id: 3,
          productId: 7,
          productName: 'Armoire de Sécurité',
          productImage: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 1,
          unitPrice: 320000,
          totalPrice: 320000,
          sku: 'ARM-SEC-001'
        }
      ],
      status: 'pending',
      priority: 'medium',
      subtotal: 320000,
      taxAmount: 57600,
      shippingCost: 45000,
      discountAmount: 16000,
      totalAmount: 406600,
      payment: {
        method: 'mobile_money',
        status: 'pending',
        amount: 406600,
        currency: 'FCFA'
      },
      shipping: {
        method: 'express',
        cost: 45000,
        estimatedDelivery: '2024-02-10'
      },
      notes: 'Installation requise sur site',
      internalNotes: 'Prévoir équipe technique pour installation',
      createdAt: '2024-01-18T09:15:00Z',
      updatedAt: '2024-01-18T09:15:00Z',
      estimatedDelivery: '2024-02-10',
      tags: ['installation', 'securite']
    },
    {
      id: '3',
      orderNumber: 'CMD-2024-003',
      customer: {
        id: 3,
        name: 'Institut Polytechnique Abidjan',
        email: 'commandes@ipa.ci',
        phone: '+225 21 35 42 18',
        address: 'Boulevard Lagunaire',
        city: 'Abidjan',
        country: 'Côte d\'Ivoire',
        postalCode: 'BP 1093',
        company: 'Institut Polytechnique Abidjan'
      },
      items: [
        {
          id: 4,
          productId: 6,
          productName: 'Oscilloscope Numérique 2 Voies',
          productImage: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 3,
          unitPrice: 195000,
          totalPrice: 585000,
          sku: 'OSC-2V-100'
        }
      ],
      status: 'shipped',
      priority: 'medium',
      subtotal: 585000,
      taxAmount: 105300,
      shippingCost: 35000,
      discountAmount: 29250,
      totalAmount: 696050,
      payment: {
        method: 'credit_card',
        status: 'paid',
        transactionId: 'TXN-2024-003',
        amount: 696050,
        currency: 'FCFA'
      },
      shipping: {
        method: 'express',
        cost: 35000,
        estimatedDelivery: '2024-01-25',
        trackingNumber: 'SL-TRACK-003',
        carrier: 'DHL Express'
      },
      notes: 'Formation utilisateur incluse',
      internalNotes: 'Programmer session formation après livraison',
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-20T11:30:00Z',
      estimatedDelivery: '2024-01-25',
      tags: ['formation', 'physique', 'express']
    }
  ]);

  const stats: OrderStats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    processingOrders: orders.filter(o => o.status === 'processing').length,
    shippedOrders: orders.filter(o => o.status === 'shipped').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length : 0,
    conversionRate: 3.2
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const updateOrderPriority = (orderId: string, priority: Order['priority']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, priority, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const addOrderNote = (orderId: string, note: string, isInternal: boolean) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            [isInternal ? 'internalNotes' : 'notes']: note,
            updatedAt: new Date().toISOString() 
          }
        : order
    ));
  };

  const updateShippingInfo = (orderId: string, shipping: Partial<ShippingInfo>) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            shipping: { ...order.shipping, ...shipping },
            updatedAt: new Date().toISOString() 
          }
        : order
    ));
  };

  const updatePaymentStatus = (orderId: string, status: PaymentInfo['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            payment: { ...order.payment, status },
            updatedAt: new Date().toISOString() 
          }
        : order
    ));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `CMD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const getOrdersByStatus = (status: string) => {
    return status === 'all' ? orders : orders.filter(order => order.status === status);
  };

  const getOrdersByPriority = (priority: string) => {
    return priority === 'all' ? orders : orders.filter(order => order.priority === priority);
  };

  const searchOrders = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return orders.filter(order => 
      order.orderNumber.toLowerCase().includes(lowercaseQuery) ||
      order.customer.name.toLowerCase().includes(lowercaseQuery) ||
      order.customer.email.toLowerCase().includes(lowercaseQuery) ||
      order.items.some(item => item.productName.toLowerCase().includes(lowercaseQuery))
    );
  };

  const exportOrders = (format: 'csv' | 'pdf') => {
    // Implementation for export functionality
    console.log(`Exporting orders in ${format} format`);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        stats,
        selectedOrder,
        filters,
        setFilters,
        setSelectedOrder,
        updateOrderStatus,
        updateOrderPriority,
        addOrderNote,
        updateShippingInfo,
        updatePaymentStatus,
        createOrder,
        deleteOrder,
        getOrdersByStatus,
        getOrdersByPriority,
        searchOrders,
        exportOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};