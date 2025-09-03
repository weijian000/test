'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CreditCard, Smartphone, Shield } from 'lucide-react';
import { paymentMethods } from '../../constants/checkout-data';
import { PaymentMethod } from '../../types';

interface CheckoutPaymentProps {
  onComplete: (paymentMethod: PaymentMethod) => void;
}

export function CheckoutPayment({ onComplete }: CheckoutPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod) {
      onComplete(selectedMethod);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    if (method.type === 'card') {
      return <CreditCard className="h-5 w-5" />;
    }
    return <Smartphone className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Choose Payment Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod?.id === method.id;
                
                return (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getPaymentIcon(method)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card Details Form */}
          {selectedMethod?.type === 'card' && (
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/20">
              <h4 className="font-medium flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure Card Details</span>
              </h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="John Smith"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date *</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center space-x-2">
                <Shield className="h-3 w-3" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>
          )}

          {/* E-wallet instructions */}
          {selectedMethod?.type === 'ewallet' && (
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You will be redirected to {selectedMethod.name} to complete your payment securely.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Secure Payment</p>
                <p>
                  Your payment is processed securely using industry-standard encryption. 
                  We never store your complete card details on our servers.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={!selectedMethod || (selectedMethod.type === 'card' && (!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvv))}
            className="w-full"
          >
            Continue to Order Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}