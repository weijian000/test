'use client';

import React from 'react';
import { motion } from 'motion/react';
import { UnifiedProductCarousel } from '../UnifiedProductCarousel';
import { newArrivals, hotItems, promotionalItems } from '../../constants/hero-data';
import { Star, Flame, Tag } from 'lucide-react';

interface HeroFeaturedProductsProps {
  onProductClick?: (productId: string) => void;
}

export function HeroFeaturedProducts({ onProductClick }: HeroFeaturedProductsProps = {}) {
  const productSections = [
    {
      title: 'New Arrivals',
      items: newArrivals,
      icon: <Star className="h-6 w-6 text-white" />,
      badgeColor: 'bg-green-500/20',
      sectionColor: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Hot Items',
      items: hotItems,
      icon: <Flame className="h-6 w-6 text-white" />,
      badgeColor: 'bg-red-500/20',
      sectionColor: 'bg-gradient-to-r from-red-500/20 to-orange-500/20'
    },
    {
      title: 'Special Offers',
      items: promotionalItems,
      icon: <Tag className="h-6 w-6 text-white" />,
      badgeColor: 'bg-orange-500/20',
      sectionColor: 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20'
    }
  ];

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <UnifiedProductCarousel 
        sections={productSections}
        autoPlayInterval={4000}
        onProductClick={onProductClick}
      />
    </motion.div>
  );
}