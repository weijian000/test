import { Facebook, Twitter, Instagram, Youtube, Shield, Truck, RefreshCw, Headphones } from 'lucide-react';

export const footerFeatures = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $99',
    color: 'text-blue-400'
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Easy returns within 30 days',
    color: 'text-green-400'
  },
  {
    icon: Shield,
    title: 'Warranty Protected',
    description: 'All products come with warranty',
    color: 'text-yellow-400'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert support when you need it',
    color: 'text-purple-400'
  }
];

export const socialIcons = [Facebook, Twitter, Instagram, Youtube];

export const paymentMethods = [
  'Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay'
];

export const quickLinks = [
  { name: 'About Us', href: '#' },
  { name: 'Contact', href: '#contact' },
  { name: 'Shipping Info', href: '#' },
  { name: 'Returns', href: '#' },
  { name: 'Size Guide', href: '#' },
  { name: 'Track Order', href: '#' }
];

export const supportLinks = [
  { name: 'Installation Guides', href: '#' },
  { name: 'Warranty', href: '#' },
  { name: 'Live Chat', href: '#' },
  { name: 'Call Support', href: '#' }
];

export const legalLinks = [
  { name: 'Privacy Policy', href: 'privacy' },
  { name: 'Terms & Conditions', href: 'terms' },
  { name: 'Customer Rights', href: 'customer-rights' },
  { name: 'Cookie Policy', href: '#' }
];