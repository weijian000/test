'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Clock, Phone, Mail, Navigation, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface HelpCenterBranchesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenterBranches({ isOpen, onClose }: HelpCenterBranchesProps) {
  const branches = [
    {
      id: '1',
      name: 'Birmingham Head Office',
      address: '123 Classic Car Lane, Birmingham, West Midlands, B12 3AB',
      phone: '+44 121 456 7890',
      email: 'birmingham@roverp6parts.co.uk',
      hours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      services: ['Parts Sales', 'Technical Support', 'Warranty Claims', 'Installation Guides'],
      isHeadOffice: true,
      coordinates: { lat: 52.4862, lng: -1.8904 }
    },
    {
      id: '2',
      name: 'London Service Center',
      address: '456 Motor Avenue, London, Greater London, SW1A 1AA',
      phone: '+44 20 7946 0958',
      email: 'london@roverp6parts.co.uk',
      hours: {
        monday: '8:30 AM - 7:00 PM',
        tuesday: '8:30 AM - 7:00 PM',
        wednesday: '8:30 AM - 7:00 PM',
        thursday: '8:30 AM - 7:00 PM',
        friday: '8:30 AM - 7:00 PM',
        saturday: '9:00 AM - 5:00 PM',
        sunday: 'Closed'
      },
      services: ['Parts Sales', 'Express Delivery', 'Customer Service', 'Returns Processing'],
      isHeadOffice: false,
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: '3',
      name: 'Manchester Distribution Hub',
      address: '789 Industrial Park, Manchester, Greater Manchester, M1 2AB',
      phone: '+44 161 123 4567',
      email: 'manchester@roverp6parts.co.uk',
      hours: {
        monday: '7:00 AM - 5:00 PM',
        tuesday: '7:00 AM - 5:00 PM',
        wednesday: '7:00 AM - 5:00 PM',
        thursday: '7:00 AM - 5:00 PM',
        friday: '7:00 AM - 5:00 PM',
        saturday: '8:00 AM - 2:00 PM',
        sunday: 'Closed'
      },
      services: ['Wholesale Orders', 'Bulk Distribution', 'Trade Support'],
      isHeadOffice: false,
      coordinates: { lat: 53.4808, lng: -2.2426 }
    },
    {
      id: '4',
      name: 'Edinburgh Regional Office',
      address: '321 Royal Mile Extension, Edinburgh, Scotland, EH1 2NG',
      phone: '+44 131 555 0123',
      email: 'edinburgh@roverp6parts.co.uk',
      hours: {
        monday: '9:00 AM - 5:30 PM',
        tuesday: '9:00 AM - 5:30 PM',
        wednesday: '9:00 AM - 5:30 PM',
        thursday: '9:00 AM - 5:30 PM',
        friday: '9:00 AM - 5:30 PM',
        saturday: '10:00 AM - 3:00 PM',
        sunday: 'Closed'
      },
      services: ['Parts Sales', 'Scottish Customer Service', 'Local Delivery'],
      isHeadOffice: false,
      coordinates: { lat: 55.9533, lng: -3.1883 }
    }
  ];

  const getCurrentStatus = (hours: any) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const todayHours = hours[currentDay];
    
    if (todayHours === 'Closed') {
      return { status: 'Closed', color: 'text-red-600' };
    }
    
    const currentTime = now.getHours() + now.getMinutes() / 60;
    const [start, end] = todayHours.split(' - ').map((time: string) => {
      const [hours, minutes] = time.replace(' AM', '').replace(' PM', '').split(':').map(Number);
      return time.includes('PM') && hours !== 12 ? hours + 12 + minutes / 60 : 
             time.includes('AM') && hours === 12 ? minutes / 60 : hours + minutes / 60;
    });
    
    if (currentTime >= start && currentTime <= end) {
      return { status: 'Open Now', color: 'text-green-600' };
    } else {
      return { status: 'Closed', color: 'text-red-600' };
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Our Locations</h2>
            <p className="text-white/90">Find your nearest Rover P6 Parts branch</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => {
              const status = getCurrentStatus(branch.hours);
              
              return (
                <Card key={branch.id} className="relative overflow-hidden">
                  {branch.isHeadOffice && (
                    <Badge className="absolute top-4 right-4 bg-blue-600">
                      Head Office
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                          {branch.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{branch.address}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{branch.email}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className={`text-sm font-medium ${status.color}`}>
                        {status.status}
                      </span>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Services Available:</h4>
                      <div className="flex flex-wrap gap-1">
                        {branch.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Opening Hours */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Opening Hours:</h4>
                      <div className="space-y-1 text-xs">
                        {Object.entries(branch.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize text-gray-600">{day}:</span>
                            <span className={hours === 'Closed' ? 'text-red-600' : 'text-gray-800'}>
                              {hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(`tel:${branch.phone}`)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`mailto:${branch.email}`)}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const address = encodeURIComponent(branch.address);
                          window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
                        }}
                      >
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Customer Service</h4>
                <p className="text-gray-600">For general inquiries and support</p>
                <p className="text-blue-600 font-medium">0800 123 4567</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Technical Support</h4>
                <p className="text-gray-600">For installation and technical help</p>
                <p className="text-blue-600 font-medium">0800 123 4568</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Emergency Line</h4>
                <p className="text-gray-600">24/7 breakdown assistance</p>
                <p className="text-blue-600 font-medium">0800 123 4569</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}