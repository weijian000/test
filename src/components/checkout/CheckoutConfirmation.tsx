'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { CheckCircle, Package, CreditCard, MapPin, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CheckoutConfirmationProps {
  checkoutData: any;
  onComplete: () => void;
  onBack: () => void;
}

export function CheckoutConfirmation({ checkoutData, onComplete, onBack }: CheckoutConfirmationProps) {
  const { items, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartSubtotal = getCartTotal();
  const deliveryPrice = checkoutData.deliveryOption?.price || 0;
  const totalPrice = cartSubtotal + deliveryPrice;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderPlaced(true);
    toast.success('Order placed successfully!');
    
    // Call completion handler after a short delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                📧 A confirmation email will be sent to your email address with order details and tracking information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover rounded"
                  />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {item.quantity}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-gray-500">#{item.product.productNumber}</p>
                  <p className="text-sm text-gray-500">${item.product.price} each</p>
                </div>
                <div className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span>
                {deliveryPrice === 0 ? 'Free' : `$${deliveryPrice.toFixed(2)}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Delivery Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Address */}
            <div>
              <h4 className="font-medium mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{checkoutData.deliveryAddress?.firstName} {checkoutData.deliveryAddress?.lastName}</p>
                <p>{checkoutData.deliveryAddress?.street}</p>
                <p>{checkoutData.deliveryAddress?.city} {checkoutData.deliveryAddress?.postal}</p>
                <p>{checkoutData.deliveryAddress?.country}</p>
                <p>{checkoutData.deliveryAddress?.phone}</p>
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Delivery Method</span>
              </h4>
              <div className="space-y-2">
                <p className="font-medium">{checkoutData.deliveryOption?.name}</p>
                <p className="text-sm text-gray-600">{checkoutData.deliveryOption?.description}</p>
                <Badge variant="outline" className="text-xs">
                  {checkoutData.deliveryOption?.estimatedDays}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{checkoutData.paymentMethod?.icon}</span>
            <div>
              <p className="font-medium">{checkoutData.paymentMethod?.name}</p>
              <p className="text-sm text-gray-600">
                {checkoutData.paymentMethod?.type === 'card' 
                  ? 'Your card will be charged after order confirmation'
                  : 'You will be redirected to complete payment'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-gray-500 space-y-2">
            <p>
              By placing this order, you agree to our Terms and Conditions and Privacy Policy. 
              You confirm that all information provided is accurate and complete.
            </p>
            <p>
              Your order will be processed within 1-2 business days. You will receive 
              email confirmations and tracking information once your order ships.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment
        </Button>
        <Button 
          onClick={handlePlaceOrder} 
          disabled={isProcessing}
          className="flex-1"
        >
          {isProcessing ? 'Processing Order...' : `Place Order - $${totalPrice.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
}