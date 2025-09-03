'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Newsletter } from './components/Newsletter';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { TermsAndConditions } from './components/TermsAndConditions';
import { CustomerRights } from './components/CustomerRights';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CheckoutPage } from './components/CheckoutPage';
import { ProductComparison } from './components/ProductComparison';
import { UserProfile } from './components/UserProfile';
import { Wishlist } from './components/profile/Wishlist';
import { ProductDetail } from './components/ProductDetail';
import { ProductReviews } from './components/ProductReviews';
import { AboutUs } from './components/AboutUs';
import { SizeGuide } from './components/SizeGuide';
import { HelpCenter } from './components/HelpCenter';
import { ProductSupport } from './components/ProductSupport';
import { CallSupport } from './components/CallSupport';
import { LiveChat } from './components/LiveChat';

import { CallSupportQuick } from './components/CallSupportQuick';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { products } from './data/products';
import { useComparison } from './contexts/ComparisonContext';
import { useAuth } from './contexts/AuthContext';
import { Scale, ArrowLeft } from 'lucide-react';

type PageView = 'home' | 'terms' | 'customer-rights' | 'privacy' | 'checkout' | 'comparison' | 'profile' | 'wishlist' | 'track-order' | 'return-policy' | 'installation-guide' | 'warranty-info' | 'unsubscribe' | 'product-detail' | 'product-reviews' | 'about-us' | 'size-guide' | 'help-center' | 'product-support' | 'call-support';

function ComparisonIndicator() {
  const { comparisonItems, clearComparison } = useComparison();

  if (comparisonItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-primary text-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
        <Scale className="h-5 w-5" />
        <div>
          <p className="font-medium">Compare Products</p>
          <p className="text-sm opacity-90">{comparisonItems.length} items selected</p>
        </div>
        <div className="flex space-x-2">
          <Badge className="bg-white text-primary">{comparisonItems.length}/4</Badge>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  const [isCallSupportOpen, setIsCallSupportOpen] = useState(false);

  const navigateToPage = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToReviews = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-reviews');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Legal pages
  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen">
        <TermsAndConditions onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'customer-rights') {
    return (
      <div className="min-h-screen">
        <CustomerRights onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen">
        <PrivacyPolicy onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  // Checkout page
  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen">
        <CheckoutPage onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  // Product comparison page
  if (currentPage === 'comparison') {
    return (
      <div className="min-h-screen">
        <ProductComparison onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  // User profile page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen">
        <UserProfile onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  // Wishlist page
  if (currentPage === 'wishlist') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-gray-600">Items you've saved for later</p>
            </div>
          </div>
          <Wishlist />
        </div>
        <Toaster />
      </div>
    );
  }

  // Product detail page
  if (currentPage === 'product-detail' && selectedProductId) {
    return (
      <div className="min-h-screen">
        <ProductDetail 
          productId={selectedProductId} 
          onBack={navigateHome}
          onShowReviews={navigateToReviews}
        />
        <Toaster />
      </div>
    );
  }

  // Product reviews page
  if (currentPage === 'product-reviews' && selectedProductId) {
    return (
      <div className="min-h-screen">
        <ProductReviews 
          productId={selectedProductId} 
          onBack={() => navigateToProduct(selectedProductId)}
        />
        <Toaster />
      </div>
    );
  }

  // Support pages
  if (currentPage === 'track-order') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Enter your order number and email to track your shipment.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Order Number</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="e.g., RP6-12345" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" className="w-full p-2 border rounded-md" placeholder="your.email@example.com" />
                </div>
                <Button className="w-full">Track Order</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'return-policy') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Return Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>30-Day Return Guarantee</h3>
              <p>We stand behind the quality of our products. If you're not completely satisfied with your purchase, you may return it within 30 days for a full refund.</p>
              
              <h4>Return Conditions:</h4>
              <ul>
                <li>Items must be in original packaging</li>
                <li>Items must be unused and in resalable condition</li>
                <li>Return authorization number required</li>
                <li>Original receipt or proof of purchase required</li>
              </ul>

              <h4>How to Return:</h4>
              <ol>
                <li>Contact our customer service team</li>
                <li>Receive your return authorization number</li>
                <li>Package the item securely with all original materials</li>
                <li>Ship to our returns address</li>
              </ol>

              <p className="font-semibold">Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</p>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'installation-guide') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Installation Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Professional installation guides for Rover P6 parts and components.</p>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Engine Components</h4>
                  <p className="text-sm text-gray-600">Step-by-step guides for installing engine parts, filters, and performance components.</p>
                  <Button variant="outline" className="mt-2">View Guide</Button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Brake System</h4>
                  <p className="text-sm text-gray-600">Safety-first installation procedures for brake components and accessories.</p>
                  <Button variant="outline" className="mt-2">View Guide</Button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Electrical Components</h4>
                  <p className="text-sm text-gray-600">Wiring diagrams and installation instructions for electrical parts.</p>
                  <Button variant="outline" className="mt-2">View Guide</Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> We recommend professional installation for complex components. If you're unsure about any procedure, consult with a qualified mechanic.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'warranty-info') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Warranty Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Comprehensive Warranty Coverage</h3>
              <p>All Rover P6 Parts products come with manufacturer warranties to ensure your peace of mind.</p>
              
              <h4>Warranty Periods:</h4>
              <ul>
                <li><strong>Engine Components:</strong> 2 years or 24,000 miles</li>
                <li><strong>Brake Parts:</strong> 1 year or 12,000 miles</li>
                <li><strong>Electrical Components:</strong> 1 year</li>
                <li><strong>Body & Exterior:</strong> 3 years</li>
              </ul>

              <h4>What's Covered:</h4>
              <ul>
                <li>Manufacturing defects</li>
                <li>Material failures under normal use</li>
                <li>Premature wear beyond expected lifespan</li>
              </ul>

              <h4>What's Not Covered:</h4>
              <ul>
                <li>Normal wear and tear</li>
                <li>Damage from improper installation</li>
                <li>Damage from accidents or abuse</li>
                <li>Consequential damages</li>
              </ul>

              <h4>How to Claim Warranty:</h4>
              <ol>
                <li>Contact our warranty department</li>
                <li>Provide proof of purchase and installation date</li>
                <li>Describe the issue in detail</li>
                <li>Follow instructions for return or inspection</li>
              </ol>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'unsubscribe') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={navigateHome}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Unsubscribe from Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">We're sorry to see you go! Enter your email address below to unsubscribe from our newsletter.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" className="w-full p-2 border rounded-md" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">What type of emails would you like to stop receiving?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Marketing emails and promotions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Product updates and new arrivals</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">All newsletter emails</span>
                    </label>
                  </div>
                </div>
                
                <Button className="w-full">Unsubscribe</Button>
                
                <p className="text-xs text-gray-500 text-center">
                  You can resubscribe at any time by visiting our website or contacting customer service.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  // New support pages
  if (currentPage === 'about-us') {
    return (
      <div className="min-h-screen">
        <AboutUs onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'size-guide') {
    return (
      <div className="min-h-screen">
        <SizeGuide onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'help-center') {
    return (
      <div className="min-h-screen">
        <HelpCenter onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'product-support') {
    return (
      <div className="min-h-screen">
        <ProductSupport onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  if (currentPage === 'call-support') {
    return (
      <div className="min-h-screen">
        <CallSupport onBack={navigateHome} />
        <Toaster />
      </div>
    );
  }

  // Home page
  return (
    <div className="min-h-screen">
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        onNavigateToProfile={() => navigateToPage('profile')}
        onNavigateToComparison={() => navigateToPage('comparison')}
        onNavigateToCheckout={() => navigateToPage('checkout')}
        onNavigateToWishlist={() => navigateToPage('wishlist')}
      />
      <main>
        <Hero onProductClick={navigateToProduct} />
        <ProductGrid 
          products={products} 
          searchQuery={searchQuery} 
          categoryFilter={categoryFilter}
          onProductClick={navigateToProduct} 
        />
        <Newsletter />
        <ContactForm onNavigateToSupport={(page: string) => {
          switch(page) {
            case 'track-order':
              navigateToPage('track-order');
              break;
            case 'return-policy':
              navigateToPage('return-policy');
              break;
            case 'installation-guide':
              navigateToPage('installation-guide');
              break;
            case 'warranty-info':
              navigateToPage('warranty-info');
              break;
          }
        }} />
      </main>
      <Footer 
        onNavigate={navigateToPage} 
        onCategoryFilter={(category: string) => {
          setCategoryFilter(category);
          navigateToPage('home');
          setTimeout(() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onNavigateToSupport={(page: string) => {
        switch(page) {
          case 'track-order':
            navigateToPage('track-order');
            break;
          case 'return-policy':
            navigateToPage('return-policy');
            break;
          case 'installation-guide':
            navigateToPage('installation-guide');
            break;
          case 'warranty-info':
            navigateToPage('warranty-info');
            break;
          case 'unsubscribe':
            navigateToPage('unsubscribe');
            break;
          case 'about-us':
            navigateToPage('about-us');
            break;
          case 'size-guide':
            navigateToPage('size-guide');
            break;


          case 'call-support':
            setIsCallSupportOpen(true);
            break;
          case 'live-chat':
            setIsLiveChatOpen(true);
            break;
        }
      }} />
      <ComparisonIndicator />
      <LiveChat isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />

      <CallSupportQuick isOpen={isCallSupportOpen} onClose={() => setIsCallSupportOpen(false)} />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ComparisonProvider>
          <AppContent />
        </ComparisonProvider>
      </CartProvider>
    </AuthProvider>
  );
}