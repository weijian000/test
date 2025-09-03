'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Clock, TrendingUp, Zap, Play, Pause, Flame, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface ProductCarouselItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge: string;
  discount?: string;
  rating?: number;
  sold?: string;
  saleEnds?: string;
}

interface ProductSection {
  title: string;
  items: ProductCarouselItem[];
  icon: React.ReactNode;
  badgeColor: string;
  sectionColor: string;
}

interface UnifiedProductCarouselProps {
  sections: ProductSection[];
  autoPlayInterval?: number;
  className?: string;
  onProductClick?: (productId: string) => void;
}

export function UnifiedProductCarousel({ 
  sections,
  autoPlayInterval = 4000,
  className = "",
  onProductClick
}: UnifiedProductCarouselProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [api, setApi] = useState<CarouselApi>();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Create flat array of all items with section info
  const allItems = sections.flatMap((section, sectionIndex) => 
    section.items.map((item, itemIndex) => ({
      ...item,
      sectionTitle: section.title,
      sectionIcon: section.icon,
      sectionColor: section.sectionColor,
      badgeColor: section.badgeColor,
      isFirstInSection: itemIndex === 0,
      sectionIndex
    }))
  );

  // Auto-play functionality
  useEffect(() => {
    if (!api || !isAutoPlaying || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, isAutoPlaying, isHovered, autoPlayInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'NEW':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700';
      case 'HOT':
        return 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700';
      case 'SALE':
        return 'bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'NEW':
        return <Zap className="h-3 w-3 mr-1" />;
      case 'HOT':
        return <TrendingUp className="h-3 w-3 mr-1" />;
      case 'SALE':
        return <Star className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm floating-animation"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">Featured Products</h3>
            <p className="text-gray-400 text-sm">New arrivals, hot items & special offers</p>
          </div>
        </div>
        
        {/* Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Auto</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Play</span>
            </>
          )}
        </motion.button>
      </motion.div>
      
      <Carousel 
        className={`w-full carousel-smooth ${isAutoPlaying ? 'carousel-auto-playing' : ''}`}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {allItems.map((item, index) => (
            <React.Fragment key={`${item.sectionIndex}-${item.id}`}>
              {/* Section Header */}
              {item.isFirstInSection && (
                <CarouselItem className="pl-2 md:pl-4 basis-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full flex items-center"
                  >
                    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-8 text-center section-header-glow category-divider">
                      <motion.div
                        className={`p-4 rounded-2xl ${item.badgeColor} backdrop-blur-sm mb-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.sectionIcon}
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.sectionTitle}</h4>
                      <div className={`w-16 h-1 rounded-full ${item.sectionColor} mb-4`} />
                      <p className="text-gray-400 text-sm max-w-[120px]">
                        {item.sectionTitle === 'New Arrivals' && 'Latest products just arrived'}
                        {item.sectionTitle === 'Hot Items' && 'Best selling products'}
                        {item.sectionTitle === 'Special Offers' && 'Limited time deals'}
                      </p>
                      
                      {/* Section Statistics */}
                      <div className="mt-4 flex flex-col space-y-1">
                        <div className="text-white/70 text-xs">
                          {item.sectionTitle === 'New Arrivals' && '4 New Items'}
                          {item.sectionTitle === 'Hot Items' && 'Top Sellers'}
                          {item.sectionTitle === 'Special Offers' && 'Save up to 18%'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              )}
              
              {/* Product Item */}
              <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  className="h-full"
                >
                  <Card 
                    className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full carousel-glow shimmer-effect overflow-hidden cursor-pointer"
                    onClick={() => onProductClick?.(item.id)}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Section Label */}
                      <div className={`px-3 py-2 ${item.sectionColor}`}>
                        <div className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          <span className="text-xs font-medium text-white/90">{item.sectionTitle}</span>
                        </div>
                      </div>
                      
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden group">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badge with Icon */}
                        <Badge className={`absolute top-3 left-3 ${getBadgeVariant(item.badge)} text-white border-0 shadow-lg flex items-center`}>
                          {getBadgeIcon(item.badge)}
                          {item.badge}
                        </Badge>
                        
                        {/* Discount Badge */}
                        {item.discount && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.05 + 0.3, type: "spring" }}
                          >
                            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 shadow-lg font-bold">
                              -{item.discount}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 flex-grow space-y-3">
                        <h4 className="font-medium text-white line-clamp-2 hover:text-blue-300 transition-colors cursor-pointer">
                          {item.name}
                        </h4>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-400">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                          )}
                        </div>
                        
                        {/* Rating and Sold Count */}
                        {(item.rating || item.sold) && (
                          <div className="flex items-center justify-between text-sm">
                            {item.rating && (
                              <div className="flex items-center space-x-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < Math.floor(item.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-300 ml-1">{item.rating}</span>
                              </div>
                            )}
                            {item.sold && (
                              <span className="text-gray-400 text-xs bg-gray-800/50 px-2 py-1 rounded-full">
                                {item.sold}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Sale Countdown */}
                        {item.saleEnds && (
                          <motion.div 
                            className="flex items-center space-x-1 text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Clock className="h-3 w-3" />
                            <span className="text-xs font-medium">{item.saleEnds}</span>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            </React.Fragment>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg" />
        <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg" />
      </Carousel>
      
      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 text-white/50 text-xs">
            <div className="w-2 h-2 bg-blue-400 rounded-full pulse-indicator" />
            <span>Auto-playing • Hover to pause</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}