'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Phone, Clock, X, Headphones, Users, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface CallSupportQuickProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallSupportQuick({ isOpen, onClose }: CallSupportQuickProps) {
  const supportLines = [
    {
      title: 'General Support',
      number: '+44 121 456 7890',
      description: 'Orders, shipping, returns, and general inquiries',
      hours: 'Mon-Fri 9AM-6PM GMT',
      icon: <Headphones className="h-5 w-5" />,
      priority: 'Standard',
      avgWaitTime: '2-3 minutes',
      available: true
    },
    {
      title: 'Technical Support',
      number: '+44 121 456 7891',
      description: 'Product installation, troubleshooting, and technical guidance',
      hours: 'Mon-Fri 9AM-6PM GMT',
      icon: <Phone className="h-5 w-5" />,
      priority: 'Priority',
      avgWaitTime: '1-2 minutes',
      available: true
    },
    {
      title: 'Sales Inquiries',
      number: '+44 121 456 7892',
      description: 'Product information, quotes, and bulk orders',
      hours: 'Mon-Fri 8AM-7PM GMT',
      icon: <Users className="h-5 w-5" />,
      priority: 'Standard',
      avgWaitTime: '1-2 minutes',
      available: true
    },
    {
      title: 'Emergency Support',
      number: '+44 121 456 7893',
      description: 'Urgent technical assistance for breakdowns',
      hours: '24/7 Available',
      icon: <AlertCircle className="h-5 w-5" />,
      priority: 'Emergency',
      avgWaitTime: 'Immediate',
      available: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Emergency':
        return 'bg-red-600';
      case 'Priority':
        return 'bg-blue-600';
      default:
        return 'bg-green-600';
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
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Call Support</h2>
            <p className="text-white/90">Get immediate help from our expert team</p>
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
            {supportLines.map((line, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {line.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{line.title}</h3>
                    </div>
                    <Badge className={getPriorityColor(line.priority)}>
                      {line.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{line.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{line.number}</p>
                        <p className="text-sm text-gray-500">Avg. wait: {line.avgWaitTime}</p>
                      </div>
                      <Button 
                        className="ml-4"
                        onClick={() => window.open(`tel:${line.number}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{line.hours}</span>
                      {line.available && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Available</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-4 text-blue-800">Before You Call - Have Ready:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Order Information</h5>
                  <p className="text-sm text-blue-700">Order number, purchase date, and product details</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Vehicle Information</h5>
                  <p className="text-sm text-blue-700">Rover P6 model year, engine type, and VIN if available</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Issue Description</h5>
                  <p className="text-sm text-blue-700">Detailed description of the problem or question</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="text-blue-600 mb-2">
                <Phone className="h-6 w-6 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1">Can't Call Now?</h4>
              <p className="text-sm text-gray-600 mb-3">Request a callback at your convenience</p>
              <Button variant="outline" size="sm" className="w-full">
                Schedule Callback
              </Button>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-green-600 mb-2">
                <Headphones className="h-6 w-6 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1">Live Chat</h4>
              <p className="text-sm text-gray-600 mb-3">Chat with our support team online</p>
              <Button variant="outline" size="sm" className="w-full">
                Start Chat
              </Button>
            </Card>
            
            <Card className="text-center p-4">
              <div className="text-purple-600 mb-2">
                <Users className="h-6 w-6 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1">Email Support</h4>
              <p className="text-sm text-gray-600 mb-3">Send us your detailed question</p>
              <Button variant="outline" size="sm" className="w-full">
                Send Email
              </Button>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}