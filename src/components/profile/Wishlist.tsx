'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heart, ShoppingCart, X, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/products';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function Wishlist() {
  const { getWishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();
  
  const wishlistIds = getWishlist();
  const wishlistProducts = products.filter(product => wishlistIds.includes(product.id));

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (product: any) => {
    if (product.stock === 'out-of-stock') {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleMoveToCart = (product: any) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id, product.name);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl text-gray-300 mb-4">💝</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-4">Save items you love to view them later</p>
      </div>
    );
  }

  const getStockBadge = (stock: string, quantity: number) => {
    switch (stock) {
      case 'in-stock':
        return <Badge className="bg-green-600">In Stock ({quantity})</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-600">Low Stock ({quantity})</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Wishlist ({wishlistProducts.length})</h3>
        <div className="text-sm text-gray-500">
          {wishlistProducts.filter(p => p.stock !== 'out-of-stock').length} available
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-48 h-48 md:h-auto relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                          <p className="text-sm text-gray-500">#{product.productNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${product.price}</p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      <div className="space-y-3">
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating!) ? 'fill-current' : ''
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {product.rating} ({product.reviewCount} reviews)
                            </span>
                          </div>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center space-x-3">
                          {getStockBadge(product.stock, product.stockQuantity)}
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge className="bg-blue-600">{product.brand}</Badge>
                        </div>

                        {/* Compatibility */}
                        {product.compatibility && product.compatibility.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-sm text-gray-600 mr-2">Compatible with:</span>
                            {product.compatibility.slice(0, 3).map((brand, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {brand}
                              </Badge>
                            ))}
                            {product.compatibility.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.compatibility.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 mt-6">
                      <Button
                        onClick={() => handleMoveToCart(product)}
                        disabled={product.stock === 'out-of-stock'}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock === 'out-of-stock' ? 'Out of Stock' : 'Move to Cart'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 'out-of-stock'}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wishlist Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium">Wishlist Actions</span>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  const availableProducts = wishlistProducts.filter(p => p.stock !== 'out-of-stock');
                  availableProducts.forEach(product => addToCart(product));
                  toast.success(`${availableProducts.length} items added to cart`);
                }}
                disabled={wishlistProducts.filter(p => p.stock !== 'out-of-stock').length === 0}
              >
                Add All Available to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}