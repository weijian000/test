export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  features: string[];
  compatibility: string[];
  stock: 'in-stock' | 'out-of-stock' | 'low-stock';
  stockQuantity: number;
  weight: number; // in kg
  productNumber: string;
  shippingDate: string; // estimated shipping date
  rating?: number; // 1-5 stars
  reviewCount?: number;
  specifications: {
    [key: string]: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'ewallet';
  icon: string;
}