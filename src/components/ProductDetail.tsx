'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Package,
  Scale,
  Share2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Mail,
  Facebook,
  Twitter
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useComparison } from '../contexts/ComparisonContext';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../data/products';
import { toast } from 'sonner@2.0.3';
import { Product } from '../types';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onShowReviews: (productId: string) => void;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Michael Thompson',
    rating: 5,
    date: '2024-01-15',
    comment: 'Excellent quality brake pads. Perfect fit for my P6 and really improved the stopping power. Installation was straightforward with the included instructions.',
    verified: true,
    helpful: 12,
    images: []
  },
  {
    id: '2',
    customerName: 'Sarah Mitchell',
    rating: 4,
    date: '2024-01-10',
    comment: 'Good product overall. Shipping was fast and packaging was secure. Only minor issue was that one of the clips was slightly bent, but it didn\'t affect functionality.',
    verified: true,
    helpful: 8
  },
  {
    id: '3',
    customerName: 'David Roberts',
    rating: 5,
    date: '2024-01-05',
    comment: 'These are genuine parts and work perfectly. Much better than the generic ones I had before. Highly recommended for any P6 owner.',
    verified: true,
    helpful: 15
  },
  {
    id: '4',
    customerName: 'Emma Wilson',
    rating: 4,
    date: '2023-12-28',
    comment: 'Quality parts at a reasonable price. Customer service was helpful when I had questions about compatibility.',
    verified: false,
    helpful: 6
  }
];

export function ProductDetail({ productId, onBack, onShowReviews }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();
  const { user, addToWishlist, isInWishlist } = useAuth();

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={onBack}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 'out-of-stock') {
      toast.error('This item is out of stock');
      return;
    }
    
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error('Please login to add items to your wishlist');
      return;
    }
    
    if (isInWishlist(product.id)) {
      toast.info(`${product.name} is already in your wishlist`);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success('Link copied to clipboard!');
        setShareDialogOpen(false);
      })
      .catch(() => toast.error('Failed to copy link'));
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this ${product.name}`);
    const body = encodeURIComponent(`I found this great product: ${product.name}\n\nPrice: $${product.price}\n\nCheck it out: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShareDialogOpen(false);
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${product.name} from Rover P6 Parts!`);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareDialogOpen(false);
    }
  };

  const handleAddToComparison = () => {
    addToComparison(product);
    toast.success(`${product.name} added to comparison!`);
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

  const productImages = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Button>
          <div className="text-sm text-gray-500">
            {product.category} / {product.brand} / {product.name}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden border">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-blue-600">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">Product #: {product.productNumber}</p>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!) ? 'fill-current' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => onShowReviews(product.id)}
                  >
                    Read Reviews
                  </Button>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-4">
              {getStockBadge()}
              <span className="text-sm text-gray-600">
                {product.shippingDate}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock === 'out-of-stock' || quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button 
                  className="flex-1" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 'out-of-stock'}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                
                {user && (
                  <Button variant="outline" onClick={handleAddToWishlist}>
                    <Heart className="h-5 w-5 mr-2" />
                    Save
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleAddToComparison}
                  disabled={isInComparison(product.id)}
                >
                  <Scale className="h-5 w-5 mr-2" />
                  {isInComparison(product.id) ? 'In Comparison' : 'Compare'}
                </Button>
                
                <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share this product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={handleEmailShare}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Share via Email
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1" 
                          variant="outline"
                          onClick={() => handleSocialShare('facebook')}
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                        
                        <Button 
                          className="flex-1" 
                          variant="outline"
                          onClick={() => handleSocialShare('twitter')}
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Key Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-medium">Warranty</p>
                <p className="text-xs text-gray-500">2 Year Coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30 Day Policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  
                  {product.features && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Features & Benefits:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Basic Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium">{product.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Product Number:</span>
                          <span className="font-medium">{product.productNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium">{product.weight}kg</span>
                        </div>
                      </div>
                    </div>
                    
                    {product.specifications && (
                      <div>
                        <h4 className="font-semibold mb-3">Technical Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Vehicle Compatibility</h4>
                  {product.compatibility ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {product.compatibility.map((brand, index) => (
                        <Badge key={index} variant="outline" className="justify-center py-2">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Compatible with all Rover P6 models (1963-1977)</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Customer Reviews</h4>
                    <Button onClick={() => onShowReviews(product.id)}>
                      View All Reviews
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {mockReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.customerName}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'fill-current' : ''
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.rating}/5</span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                            <MessageSquare className="h-4 w-4" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}