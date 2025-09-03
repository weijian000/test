'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CheckoutAddressProps {
  onComplete: (addressData: any) => void;
  initialData?: any;
  isGuest: boolean;
}

export function CheckoutAddress({ onComplete, initialData, isGuest }: CheckoutAddressProps) {
  const { user, updateProfile } = useAuth();
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postal: '',
    country: 'United Kingdom',
    phone: '',
    ...initialData
  });

  useEffect(() => {
    if (user && !initialData) {
      setAddressData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        ...(user.address && {
          street: user.address.street,
          city: user.address.city,
          postal: user.address.postal,
          country: user.address.country
        })
      }));
    }
  }, [user, initialData]);

  const countries = [
    'United Kingdom',
    'Ireland',
    'France',
    'Germany',
    'Spain',
    'Italy',
    'Netherlands',
    'Belgium',
    'Portugal',
    'United States',
    'Canada',
    'Australia'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save address to user profile if logged in
    if (user) {
      updateProfile({
        address: {
          street: addressData.street,
          city: addressData.city,
          postal: addressData.postal,
          country: addressData.country
        }
      });
    }
    
    onComplete(addressData);
  };

  const handleInputChange = (field: string, value: string) => {
    setAddressData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Delivery Address</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={addressData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={addressData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                type="text"
                placeholder="123 Main Street"
                value={addressData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={addressData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal">Postal Code *</Label>
                <Input
                  id="postal"
                  type="text"
                  value={addressData.postal}
                  onChange={(e) => handleInputChange('postal', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select 
                value={addressData.country} 
                onValueChange={(value) => handleInputChange('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 20 7946 0958"
              value={addressData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          {/* Additional Information */}
          {isGuest && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Create an account after checkout to save this address for future orders.
              </p>
            </div>
          )}

          <Button type="submit" className="w-full">
            Continue to Delivery Options
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}