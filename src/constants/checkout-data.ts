import { DeliveryOption, PaymentMethod } from '../types';

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'uk-standard',
    name: 'UK Standard Shipping',
    description: 'Standard delivery within UK mainland',
    price: 9.99,
    estimatedDays: '3-5 business days'
  },
  {
    id: 'uk-express',
    name: 'UK Express Shipping',
    description: 'Next day delivery within UK mainland',
    price: 19.99,
    estimatedDays: '1 business day'
  },
  {
    id: 'euro-shipping',
    name: 'European Shipping',
    description: 'Delivery to European countries',
    price: 24.99,
    estimatedDays: '5-7 business days'
  },
  {
    id: 'international',
    name: 'International Shipping',
    description: 'Worldwide delivery service',
    price: 39.99,
    estimatedDays: '7-14 business days'
  },
  {
    id: 'customer-pickup',
    name: 'Customer Pickup',
    description: 'Collect from our warehouse',
    price: 0,
    estimatedDays: 'Same day'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: '💳'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'ewallet',
    icon: '🟦'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    type: 'ewallet',
    icon: '🍎'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    type: 'ewallet',
    icon: '🔵'
  }
];