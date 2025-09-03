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
import { Star, Clock, TrendingUp, ShoppingCart, Zap, Heart, Play, Pause } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
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

interface ProductCarouselProps {
  title: string;
  items: ProductCarouselItem[];
  icon: React.ReactNode;
  badgeColor: string;
  className?: string;
  autoPlayInterval?: number;
}

export function ProductCarousel({ 
  title, 
  items, 
  icon, 
  badgeColor, 
  className = "",
  autoPlayInterval = 4000 
}: ProductCarouselProps) {
  const { addItem } = useCart();
  const [api, setApi] = useState<CarouselApi>();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

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

  const handleAddToCart = (item: ProductCarouselItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace('$', '').replace(',', '')),
      image: item.image,
      quantity: 1
    };
    
    addItem(cartItem);
    toast.success(`${item.name} added to cart!`);
  };

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
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className={`p-3 rounded-xl ${badgeColor} backdrop-blur-sm floating-animation`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">Premium quality parts for your vehicle</p>
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
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                className="h-full"
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full carousel-glow shimmer-effect overflow-hidden">
                  <CardContent className="p-0 h-full flex flex-col">
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
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 shadow-lg font-bold">
                            -{item.discount}
                          </Badge>
                        </motion.div>
                      )}
                      
                      {/* Wishlist Button */}
                      <motion.button
                        className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ right: item.discount ? '60px' : '12px' }}
                      >
                        <Heart className="h-4 w-4 text-white" />
                      </motion.button>
                      
                      {/* Add to Cart Button Overlay */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={false}
                        whileHover={{ scale: 1 }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                            onClick={(e) => handleAddToCart(item, e)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      </motion.div>
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