'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Plus, Minus, X, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export function CartSheet({ isOpen, onClose, onCheckout }: CartSheetProps) {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
      onClose();
    } else {
      // Fallback for when onCheckout is not provided
      alert('Redirecting to checkout...');
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
          <SheetDescription>
            Review your selected car parts and proceed to checkout when ready.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">🛒</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some car parts to get started!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">${item.product.price}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.product.brand}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6 pb-4 px-2 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total:</span>
                    <span className="text-2xl font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 px-2">
                  <Button onClick={handleCheckout} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                  
                  <Button variant="outline" onClick={onClose} className="w-full">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}