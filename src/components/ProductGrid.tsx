'use client';

import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Filter, Grid, List, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { categories, brands } from '../data/products';
import { motion } from 'motion/react';

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  categoryFilter?: string;
  onProductClick?: (productId: string) => void;
}

const ITEMS_PER_PAGE = 20;

export function ProductGrid({ products, searchQuery, categoryFilter, onProductClick }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedStock, setSelectedStock] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.productNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = (selectedCategory === 'All' || product.category === selectedCategory) &&
        (!categoryFilter || product.category.toLowerCase() === categoryFilter.toLowerCase());
      
      // Brand filter
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
      
      // Stock filter
      const matchesStock = selectedStock === 'all' || product.stock === selectedStock;
      
      // Price range filter
      let matchesPrice = true;
      if (priceRange === 'under-100') matchesPrice = product.price < 100;
      else if (priceRange === '100-500') matchesPrice = product.price >= 100 && product.price <= 500;
      else if (priceRange === '500-1000') matchesPrice = product.price > 500 && product.price <= 1000;
      else if (priceRange === 'over-1000') matchesPrice = product.price > 1000;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesStock && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'stock':
          // Sort by stock quantity descending
          return b.stockQuantity - a.stockQuantity;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedStock, sortBy, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectedStock, priceRange, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All Brands');
    setSelectedStock('all');
    setPriceRange('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  const activeFilterCount = [
    selectedCategory !== 'All',
    selectedBrand !== 'All Brands',
    selectedStock !== 'all',
    priceRange !== 'all'
  ].filter(Boolean).length;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => goToPage(Math.min(totalPages, currentPage + 1));

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">Our Products</h2>
          <p className="text-gray-600 text-center">Find the perfect car parts for your vehicle</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount}</Badge>
              )}
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1000</SelectItem>
                <SelectItem value="over-1000">Over $1000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="stock">Stock Quantity</SelectItem>
              </SelectContent>
            </Select>

            {activeFilterCount > 0 && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              {filteredProducts.length !== products.length && ` (filtered from ${products.length})`}
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <motion.div 
              className={`grid gap-6 mb-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={currentPage} // Re-animate when page changes
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard product={product} viewMode={viewMode} onProductClick={onProductClick} />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  {/* Page Info */}
                  <div className="flex items-center space-x-4">
                    <div className="pagination-info">
                      Page <span className="font-medium text-gray-900">{currentPage}</span> of{' '}
                      <span className="font-medium text-gray-900">{totalPages}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ({filteredProducts.length} total items)
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center space-x-2">
                    {/* First Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className="hidden sm:flex pagination-button"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    {/* Previous Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1 pagination-button"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === '...' ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                          ) : (
                            <Button
                              variant={currentPage === page ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => goToPage(page as number)}
                              className={`min-w-[40px] pagination-button ${
                                currentPage === page 
                                  ? 'pagination-button-active' 
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </Button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Next Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-1 pagination-button"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Last Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      className="hidden sm:flex pagination-button"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Page Jump (for large datasets) */}
                {totalPages > 10 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-600">Quick jump to page:</span>
                      <Select
                        value={currentPage.toString()}
                        onValueChange={(value) => goToPage(parseInt(value))}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <SelectItem key={page} value={page.toString()}>
                              {page}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </section>
  );
}