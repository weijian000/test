'use client';

import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroFeaturedProducts } from './hero/HeroFeaturedProducts';
import { heroStats } from '../constants/hero-data';
import { motion } from 'motion/react';

interface HeroProps {
  onShopNow?: () => void;
  onViewCatalog?: () => void;
  onProductClick?: (productId: string) => void;
}

export function Hero({ onShopNow, onViewCatalog, onProductClick }: HeroProps = {}) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1752774581629-464238ee6996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NTU2OTc1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Car engine parts"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Hero Text and Stats */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="mr-2 h-3 w-3" />
                  New Arrivals
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Premium Car Parts for
                <span className="text-blue-400 block">Every Drive</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg lg:text-xl text-gray-300 mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover high-performance car components from trusted brands. 
                Enhance your vehicle's performance, safety, and style with our premium selection.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  onShopNow?.();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {heroStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                >
                  <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Featured Products Carousels */}
          <div className="lg:col-span-3">
            <HeroFeaturedProducts onProductClick={onProductClick} />
          </div>
        </div>
      </div>
    </section>
  );
}