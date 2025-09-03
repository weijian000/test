'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Truck, Clock, Package, MapPin } from 'lucide-react';
import { deliveryOptions } from '../../constants/checkout-data';
import { DeliveryOption } from '../../types';

interface CheckoutDeliveryProps {
  onComplete: (deliveryOption: DeliveryOption) => void;
}

export function CheckoutDelivery({ onComplete }: CheckoutDeliveryProps) {
  const [selectedOption, setSelectedOption] = useState<DeliveryOption | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onComplete(selectedOption);
    }
  };

  const getDeliveryIcon = (optionId: string) => {
    switch (optionId) {
      case 'customer-pickup':
        return MapPin;
      case 'uk-express':
        return Clock;
      case 'international':
        return Package;
      default:
        return Truck;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5" />
          <span>Delivery Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 mb-6">
          Choose how you'd like to receive your order:
        </p>

        <div className="space-y-3">
          {deliveryOptions.map((option) => {
            const DeliveryIcon = getDeliveryIcon(option.id);
            const isSelected = selectedOption?.id === option.id;
            
            return (
              <div
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <DeliveryIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{option.name}</h3>
                        {option.price === 0 && (
                          <Badge className="bg-green-600">Free</Badge>
                        )}
                        {option.id === 'uk-express' && (
                          <Badge className="bg-blue-600">Fastest</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{option.estimatedDays}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                    </div>
                  </div>
                </div>
                
                {/* Additional info for specific options */}
                {option.id === 'customer-pickup' && isSelected && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Pickup Location:
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Rover P6 Parts Warehouse<br />
                      123 Industrial Estate<br />
                      Birmingham, B12 0XY<br />
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                )}
                
                {option.id === 'international' && isSelected && (
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg text-sm">
                    <p className="text-amber-800 dark:text-amber-200">
                      ⚠️ International orders may be subject to customs duties and taxes.
                      Delivery times may vary based on customs processing.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            className="w-full"
          >
            {selectedOption 
              ? `Continue with ${selectedOption.name}` 
              : 'Select a delivery option'
            }
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          <p>
            📦 All orders are carefully packaged and tracked. You'll receive email updates 
            about your order status and tracking information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}