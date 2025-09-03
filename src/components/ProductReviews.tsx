'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Filter,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { products } from '../data/products';
import { Input } from './ui/input';

interface ProductReviewsProps {
  productId: string;
  onBack: () => void;
}

interface Review {
  id: string;
  customerName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  images?: string[];
  title?: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Michael Thompson',
    rating: 5,
    date: '2024-01-15',
    title: 'Excellent quality brake pads',
    comment: 'These brake pads exceeded my expectations. Perfect fit for my 1972 Rover P6 and the stopping power has improved dramatically. Installation was straightforward with the clear instructions provided. The build quality feels premium and I\'m confident they\'ll last for years.',
    verified: true,
    helpful: 23,
    unhelpful: 1,
    images: []
  },
  {
    id: '2',
    customerName: 'Sarah Mitchell',
    rating: 4,
    date: '2024-01-10',
    title: 'Good product with fast shipping',
    comment: 'Overall very satisfied with this purchase. The parts arrived quickly and were packaged securely. Quality seems good, though one of the clips was slightly bent upon arrival. It didn\'t affect the installation or functionality, but worth noting. Customer service was responsive when I reached out.',
    verified: true,
    helpful: 15,
    unhelpful: 3
  },
  {
    id: '3',
    customerName: 'David Roberts',
    rating: 5,
    date: '2024-01-05',
    title: 'Genuine parts that work perfectly',
    comment: 'As a restoration enthusiast, finding genuine Rover P6 parts can be challenging. These are authentic components that fit perfectly and perform as expected. Much better quality than the generic alternatives I\'ve tried in the past. Highly recommended for any serious P6 owner.',
    verified: true,
    helpful: 31,
    unhelpful: 0
  },
  {
    id: '4',
    customerName: 'Emma Wilson',
    rating: 4,
    date: '2023-12-28',
    title: 'Great value for money',
    comment: 'Quality parts at a reasonable price point. I was initially skeptical about ordering online, but the product description was accurate and the parts arrived in perfect condition. The customer service team was helpful when I had questions about compatibility with my specific model year.',
    verified: false,
    helpful: 12,
    unhelpful: 2
  },
  {
    id: '5',
    customerName: 'James Anderson',
    rating: 3,
    date: '2023-12-20',
    title: 'Decent parts but packaging could be better',
    comment: 'The parts themselves are good quality and fit as expected. However, the packaging was minimal and one item had some minor scratches from shipping. Functionality is not affected, but for the price, I expected better packaging protection.',
    verified: true,
    helpful: 8,
    unhelpful: 5
  },
  {
    id: '6',
    customerName: 'Lisa Chen',
    rating: 5,
    date: '2023-12-15',
    title: 'Perfect replacement parts',
    comment: 'These parts were exactly what I needed for my P6 restoration project. The fit and finish are excellent, and they match the original specifications perfectly. Installation was smooth and they\'ve been performing flawlessly for several months now.',
    verified: true,
    helpful: 19,
    unhelpful: 1
  },
  {
    id: '7',
    customerName: 'Robert Taylor',
    rating: 4,
    date: '2023-12-08',
    title: 'Good quality, reasonable price',
    comment: 'Solid construction and good materials. Took about a week to arrive but that was within the estimated timeframe. Installation instructions could be more detailed, but if you have basic mechanical knowledge, it\'s straightforward enough.',
    verified: true,
    helpful: 14,
    unhelpful: 3
  },
  {
    id: '8',
    customerName: 'Amanda Foster',
    rating: 5,
    date: '2023-11-30',
    title: 'Exceptional customer service',
    comment: 'Not only are the parts top quality, but the customer service is outstanding. I had a question about installation and received a detailed response within hours. The parts fit perfectly and have improved the performance of my vehicle significantly.',
    verified: true,
    helpful: 22,
    unhelpful: 0
  }
];

export function ProductReviews({ productId, onBack }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState('most-helpful');
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter and sort reviews
  const filteredReviews = mockReviews
    .filter(review => {
      const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
      const matchesSearch = searchQuery === '' || 
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRating && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest-rating':
          return b.rating - a.rating;
        case 'lowest-rating':
          return a.rating - b.rating;
        case 'most-helpful':
        default:
          return (b.helpful - b.unhelpful) - (a.helpful - a.unhelpful);
      }
    });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(r => r.rating === rating).length,
    percentage: (mockReviews.filter(r => r.rating === rating).length / mockReviews.length) * 100
  }));

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Product
          </Button>
        </div>

        {/* Product Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                  <p className="text-gray-600 mb-4">Product #: {product.productNumber}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(averageRating) ? 'fill-current' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{averageRating.toFixed(1)} out of 5</span>
                    </div>
                    <span className="text-gray-500">({mockReviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <Progress value={percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
                    <div className="flex justify-center text-yellow-400 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(averageRating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">Based on {mockReviews.length} reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-helpful">Most Helpful</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest-rating">Highest Rating</SelectItem>
                      <SelectItem value="lowest-rating">Lowest Rating</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.customerName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.customerName}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
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
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {review.title && (
                        <h4 className="font-semibold text-lg mb-3">{review.title}</h4>
                      )}

                      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                      {review.images && review.images.length > 0 && (
                        <div className="flex space-x-2 mb-4">
                          {review.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="w-16 h-16 rounded-md overflow-hidden">
                              <ImageWithFallback
                                src={image}
                                alt={`Review image ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span className="text-sm">({review.unhelpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        </div>
                        
                        <span className="text-xs text-gray-400">
                          {review.helpful + review.unhelpful} people found this helpful
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <MessageSquare className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}