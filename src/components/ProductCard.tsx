'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart, Heart, Eye, Scale, Truck, Package, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useComparison } from '../contexts/ComparisonContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onProductClick?: (productId: string) => void;
}

export function ProductCard({ product, viewMode = 'grid', onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const { addToComparison, removeFromComparison, isInComparison, comparisonItems, maxItems } = useComparison();
  const [isHovered, setIsHovered] = useState(false);
  const [showAllCompatibility, setShowAllCompatibility] = useState(false);

  const isWishlisted = user ? isInWishlist(product.id) : false;
  const isComparing = isInComparison(product.id);
  const canAddToComparison = comparisonItems.length < maxItems;

  const handleAddToCart = () => {
    if (product.stock === 'out-of-stock') {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProductClick) {
      onProductClick(product.id);
    } else {
      toast.info('Quick view feature coming soon!');
    }
  };

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  const handleComparison = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isComparing) {
      removeFromComparison(product.id);
      toast.success('Removed from comparison');
    } else {
      if (canAddToComparison) {
        addToComparison(product);
        toast.success('Added to comparison');
      } else {
        toast.error(`You can only compare up to ${maxItems} products`);
      }
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart();
  };

  const getStockBadge = () => {
    switch (product.stock) {
      case 'in-stock':
        return <Badge className="bg-green-600">In Stock ({product.stockQuantity})</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-600">Low Stock ({product.stockQuantity})</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <motion.div
      whileHover={{ y: viewMode === 'grid' ? -4 : -2 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`overflow-hidden group cursor-pointer h-full ${
          viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
        }`}
        onClick={handleProductClick}
      >
        <div className={`relative ${
          viewMode === 'list' 
            ? 'w-48 h-32 flex-shrink-0' 
            : 'w-full'
        }`}>
          <div className={`overflow-hidden ${
            viewMode === 'list' ? 'h-full' : 'aspect-square'
          }`}>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-2"
          >
            <Button size="sm" variant="secondary" onClick={handleQuickView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" onClick={handleWishlist}>
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={handleComparison}
              disabled={!canAddToComparison && !isComparing}
              className={isComparing ? 'bg-blue-600 text-white' : ''}
            >
              <Scale className="h-4 w-4" />
            </Button>
          </motion.div>
          
          {/* Badges */}
          <div className={`absolute top-2 left-2 space-y-1 ${
            viewMode === 'list' ? 'scale-75' : ''
          }`}>
            {getStockBadge()}
            {discountPercentage > 0 && (
              <Badge className="bg-red-600">-{discountPercentage}%</Badge>
            )}
          </div>
          
          <div className={`absolute top-2 right-2 ${
            viewMode === 'list' ? 'scale-75' : ''
          }`}>
            <Badge className="bg-blue-600">{product.brand}</Badge>
          </div>
        </div>

        <CardContent className={`flex-1 ${
          viewMode === 'list' ? 'p-4 flex flex-col justify-between' : 'p-4'
        }`}>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">#{product.productNumber}</p>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!) ? 'fill-current' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Package className="h-3 w-3" />
                <span>Weight: {product.weight}kg</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="h-3 w-3" />
                <span>Ships: {product.shippingDate}</span>
              </div>
            </div>
            
            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {!showAllCompatibility 
                  ? product.compatibility.slice(0, 2).map((brand, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {brand}
                      </Badge>
                    ))
                  : product.compatibility.map((brand, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {brand}
                      </Badge>
                    ))
                }
                {product.compatibility.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs p-0 h-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllCompatibility(!showAllCompatibility);
                    }}
                  >
                    {showAllCompatibility 
                      ? 'Show less' 
                      : `+${product.compatibility.length - 2} more`
                    }
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
            
            <Button
              onClick={handleAddToCartClick}
              disabled={product.stock === 'out-of-stock'}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}