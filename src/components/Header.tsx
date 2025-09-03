'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, LogOut, Settings, Package, Heart, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { CartSheet } from './CartSheet';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigateToProfile?: () => void;
  onNavigateToComparison?: () => void;
  onNavigateToCheckout?: () => void;
  onNavigateToWishlist?: () => void;
}

export function Header({ onSearch, searchQuery, onNavigateToProfile, onNavigateToComparison, onNavigateToCheckout, onNavigateToWishlist }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();

  const cartItemsCount = getCartItemsCount();

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogout = () => {
    logout();
    console.log('User logged out successfully');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">Rover P6 Parts</h1>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                {onNavigateToComparison && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNavigateToComparison}
                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Compare
                  </Button>
                )}
              </div>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search car parts..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearch(e.target.value);
                    // Scroll to products section when searching
                    if (e.target.value.trim()) {
                      setTimeout(() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist - Only show if user is logged in */}
              {user && onNavigateToWishlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateToWishlist}
                  title="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              )}
              
              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-md transition-all duration-200 px-3 py-2"
                    >
                      <User className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">{user.firstName}</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-gray-500">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onNavigateToProfile}>
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onNavigateToProfile}>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onNavigateToWishlist}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="flex"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {onNavigateToComparison && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2"
                    onClick={() => {
                      onNavigateToComparison();
                      setIsMenuOpen(false);
                    }}
                  >
                    Compare Products
                  </Button>
                )}
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2"
                      onClick={() => {
                        onNavigateToProfile?.();
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Profile
                    </Button>
                    {onNavigateToWishlist && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-3 py-2"
                        onClick={() => {
                          onNavigateToWishlist();
                          setIsMenuOpen(false);
                        }}
                      >
                        <Heart className="h-5 w-5 mr-2" />
                        Wishlist
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2"
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={onNavigateToCheckout} />
    </>
  );
}