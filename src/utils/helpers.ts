import { ORDER_STATUSES } from './constants';

export const formatPrice = (price: number): string => {
  return price.toLocaleString('fr-FR') + ' FCFA';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const getOrderStatusStyle = (status: string): string => {
  return ORDER_STATUSES[status as keyof typeof ORDER_STATUSES]?.color || 'bg-gray-100 text-gray-800';
};

export const getOrderStatusLabel = (status: string): string => {
  return ORDER_STATUSES[status as keyof typeof ORDER_STATUSES]?.label || status;
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const isInPriceRange = (price: number, range: string): boolean => {
  if (range === 'all') return true;
  if (range === '0-50000') return price <= 50000;
  if (range === '50000-100000') return price > 50000 && price <= 100000;
  if (range === '100000-200000') return price > 100000 && price <= 200000;
  if (range === '200000+') return price > 200000;
  return true;
};

export const generateSKU = (category: string, name: string): string => {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const nameCode = name.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${categoryCode}-${nameCode}-${randomNum}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s\-\(\)]{8,}$/;
  return phoneRegex.test(phone);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};