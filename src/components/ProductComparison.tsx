'use client';

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, X, Star, Package, Truck, Scale } from 'lucide-react';
import { useComparison } from '../contexts/ComparisonContext';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductComparisonProps {
  onBack: () => void;
}

export function ProductComparison({ onBack }: ProductComparisonProps) {
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    if (product.stock === 'out-of-stock') {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

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

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">⚖️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products to compare</h3>
            <p className="text-gray-500 mb-4">Add products to comparison from the product grid</p>
            <Button onClick={onBack}>Browse Products</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Compare Products ({comparisonItems.length})</h1>
            <Button variant="outline" onClick={clearComparison}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Product Images and Basic Info */}
            <div className="grid grid-cols-1 gap-6 mb-8" style={{ gridTemplateColumns: `repeat(${comparisonItems.length}, 300px)` }}>
              {comparisonItems.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 z-10 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <CardContent className="p-6">
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">#{product.productNumber}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        {getStockBadge(product.stock, product.stockQuantity)}
                      </div>
                      
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
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 'out-of-stock'}
                      >
                        {product.stock === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-semibold mb-3">Basic Information</h4>
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonItems.length}, 300px)` }}>
                      <div className="font-medium">Brand</div>
                      {comparisonItems.map((product) => (
                        <div key={`brand-${product.id}`}>
                          <Badge className="bg-blue-600">{product.brand}</Badge>
                        </div>
                      ))}
                      
                      <div className="font-medium">Category</div>
                      {comparisonItems.map((product) => (
                        <div key={`category-${product.id}`}>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                      ))}
                      
                      <div className="font-medium">Price</div>
                      {comparisonItems.map((product) => (
                        <div key={`price-${product.id}`} className="font-bold text-lg">
                          ${product.price}
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Physical Properties */}
                  <div>
                    <h4 className="font-semibold mb-3">Physical Properties</h4>
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonItems.length}, 300px)` }}>
                      <div className="font-medium flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Weight
                      </div>
                      {comparisonItems.map((product) => (
                        <div key={`weight-${product.id}`}>{product.weight}kg</div>
                      ))}
                      
                      <div className="font-medium flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Shipping
                      </div>
                      {comparisonItems.map((product) => (
                        <div key={`shipping-${product.id}`}>{product.shippingDate}</div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Compatibility */}
                  <div>
                    <h4 className="font-semibold mb-3">Compatibility</h4>
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonItems.length}, 300px)` }}>
                      <div className="font-medium">Compatible With</div>
                      {comparisonItems.map((product) => (
                        <div key={`compatibility-${product.id}`} className="space-y-1">
                          {product.compatibility?.map((brand, index) => (
                            <Badge key={index} variant="outline" className="mr-1 mb-1">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonItems.length}, 300px)` }}>
                      <div className="font-medium">Key Features</div>
                      {comparisonItems.map((product) => (
                        <div key={`features-${product.id}`} className="space-y-1">
                          {product.features?.map((feature, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {feature}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  {comparisonItems.some(product => Object.keys(product.specifications || {}).length > 0) && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-3">Specifications</h4>
                        <div className="space-y-4">
                          {/* Get all unique spec keys */}
                          {Array.from(new Set(
                            comparisonItems.flatMap(product => Object.keys(product.specifications || {}))
                          )).map((specKey) => (
                            <div key={specKey} className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonItems.length}, 300px)` }}>
                              <div className="font-medium">{specKey}</div>
                              {comparisonItems.map((product) => (
                                <div key={`${specKey}-${product.id}`}>
                                  {product.specifications?.[specKey] || '-'}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}