'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, ArrowRight, CreditCard, User, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CheckoutAuth } from './checkout/CheckoutAuth';
import { CheckoutAddress } from './checkout/CheckoutAddress';
import { CheckoutDelivery } from './checkout/CheckoutDelivery';
import { CheckoutPayment } from './checkout/CheckoutPayment';
import { CheckoutConfirmation } from './checkout/CheckoutConfirmation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DeliveryOption, PaymentMethod } from '../types';

interface CheckoutPageProps {
  onBack: () => void;
}

type CheckoutStep = 'auth' | 'address' | 'delivery' | 'payment' | 'confirmation';

interface CheckoutData {
  deliveryAddress?: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postal: string;
    country: string;
    phone: string;
  };
  deliveryOption?: DeliveryOption;
  paymentMethod?: PaymentMethod;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, getCartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(user ? 'address' : 'auth');
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({});
  const [isGuest, setIsGuest] = useState(false);

  const steps = [
    { id: 'auth', title: 'Authentication', icon: User },
    { id: 'address', title: 'Delivery Address', icon: User },
    { id: 'delivery', title: 'Delivery Options', icon: Truck },
    { id: 'payment', title: 'Payment', icon: CreditCard },
    { id: 'confirmation', title: 'Confirmation', icon: ArrowRight },
  ];

  const getCurrentStepIndex = () => {
    const visibleSteps = getVisibleSteps();
    return visibleSteps.findIndex(step => step.id === currentStep);
  };

  const getVisibleSteps = () => {
    if (user || isGuest) {
      return steps.filter(step => step.id !== 'auth');
    }
    return steps;
  };

  const handleAuthComplete = (guestCheckout: boolean = false) => {
    setIsGuest(guestCheckout);
    setCurrentStep('address');
  };

  const handleAddressComplete = (addressData: any) => {
    setCheckoutData(prev => ({ ...prev, deliveryAddress: addressData }));
    setCurrentStep('delivery');
  };

  const handleDeliveryComplete = (deliveryOption: DeliveryOption) => {
    setCheckoutData(prev => ({ ...prev, deliveryOption }));
    setCurrentStep('payment');
  };

  const handlePaymentComplete = (paymentMethod: PaymentMethod) => {
    setCheckoutData(prev => ({ ...prev, paymentMethod }));
    setCurrentStep('confirmation');
  };

  const handleOrderComplete = () => {
    if (user && checkoutData.deliveryAddress && checkoutData.deliveryOption) {
      // Add order to user's order history
      addOrder({
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        total: getCartTotal() + (checkoutData.deliveryOption?.price || 0),
        status: 'pending',
        deliveryAddress: checkoutData.deliveryAddress,
        deliveryOption: checkoutData.deliveryOption.name,
        deliveryPrice: checkoutData.deliveryOption.price,
        estimatedDelivery: checkoutData.deliveryOption.estimatedDays,
      });
    }
    
    clearCart();
    // Order completed, could redirect to order success page
  };

  const goBack = () => {
    switch (currentStep) {
      case 'auth':
        onBack();
        break;
      case 'address':
        if (user) {
          onBack();
        } else {
          setCurrentStep('auth');
        }
        break;
      case 'delivery':
        setCurrentStep('address');
        break;
      case 'payment':
        setCurrentStep('delivery');
        break;
      case 'confirmation':
        setCurrentStep('payment');
        break;
    }
  };

  const cartSubtotal = getCartTotal();
  const deliveryPrice = checkoutData.deliveryOption?.price || 0;
  const totalPrice = cartSubtotal + deliveryPrice;

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🛒</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some items to proceed with checkout</p>
            <Button onClick={onBack}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={goBack}
          className="mb-6 hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {getVisibleSteps().map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-primary bg-primary text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 bg-white text-gray-300'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  {index < getVisibleSteps().length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {getCurrentStepIndex() + 1} of {getVisibleSteps().length}: {getVisibleSteps()[getCurrentStepIndex()]?.title}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'auth' && (
              <CheckoutAuth onComplete={handleAuthComplete} />
            )}
            {currentStep === 'address' && (
              <CheckoutAddress 
                onComplete={handleAddressComplete}
                initialData={checkoutData.deliveryAddress}
                isGuest={isGuest}
              />
            )}
            {currentStep === 'delivery' && (
              <CheckoutDelivery onComplete={handleDeliveryComplete} />
            )}
            {currentStep === 'payment' && (
              <CheckoutPayment onComplete={handlePaymentComplete} />
            )}
            {currentStep === 'confirmation' && (
              <CheckoutConfirmation 
                checkoutData={checkoutData}
                onComplete={handleOrderComplete}
                onBack={() => setCurrentStep('payment')}
              />
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== 'confirmation' && (
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
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
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-sm text-gray-500">${item.product.price} each</p>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {checkoutData.deliveryOption && (
                      <div className="flex justify-between text-sm">
                        <span>Delivery ({checkoutData.deliveryOption.name})</span>
                        <span>
                          {deliveryPrice === 0 ? 'Free' : `$${deliveryPrice.toFixed(2)}`}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}