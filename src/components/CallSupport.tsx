'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Phone, Clock, Mail, MapPin, Globe, Users, Headphones, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface CallSupportProps {
  onBack: () => void;
}

export function CallSupport({ onBack }: CallSupportProps) {
  const supportLines = [
    {
      title: 'General Support',
      number: '+44 121 456 7890',
      description: 'Orders, shipping, returns, and general inquiries',
      hours: 'Mon-Fri 9AM-6PM GMT',
      icon: <Headphones className="h-5 w-5" />,
      priority: 'Standard',
      avgWaitTime: '2-3 minutes'
    },
    {
      title: 'Technical Support',
      number: '+44 121 456 7891',
      description: 'Product installation, troubleshooting, and technical guidance',
      hours: 'Mon-Fri 9AM-6PM GMT',
      icon: <Phone className="h-5 w-5" />,
      priority: 'Priority',
      avgWaitTime: '1-2 minutes'
    },
    {
      title: 'Sales Inquiries',
      number: '+44 121 456 7892',
      description: 'Product information, quotes, and bulk orders',
      hours: 'Mon-Fri 8AM-7PM GMT',
      icon: <Users className="h-5 w-5" />,
      priority: 'Standard',
      avgWaitTime: '1-2 minutes'
    },
    {
      title: 'Emergency Support',
      number: '+44 121 456 7893',
      description: 'Urgent technical assistance for breakdowns',
      hours: '24/7 Available',
      icon: <Phone className="h-5 w-5" />,
      priority: 'Emergency',
      avgWaitTime: 'Immediate'
    }
  ];

  const operatingHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM GMT', status: 'Open' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM GMT', status: 'Open' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM GMT', status: 'Open' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM GMT', status: 'Open' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM GMT', status: 'Open' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM GMT', status: 'Limited' },
    { day: 'Sunday', hours: 'Closed', status: 'Closed' }
  ];

  const currentTime = new Date();
  const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const currentHour = currentTime.getHours();
  
  const isOpen = () => {
    if (currentDay === 'Sunday') return false;
    if (currentDay === 'Saturday') return currentHour >= 10 && currentHour < 16;
    return currentHour >= 9 && currentHour < 18;
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'text-green-600';
      case 'Limited':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Call Support</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Speak directly with our expert support team for immediate assistance
            </p>
            
            {/* Current Status */}
            <div className="mt-6 flex items-center justify-center">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isOpen() ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`w-3 h-3 rounded-full ${isOpen() ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${isOpen() ? 'text-green-800' : 'text-red-800'}`}>
                  {isOpen() ? 'Support Lines Open Now' : 'Support Lines Currently Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Support Lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportLines.map((line, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {line.icon}
                      </div>
                      <CardTitle>{line.title}</CardTitle>
                    </div>
                    <Badge className={getPriorityColor(line.priority)}>
                      {line.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{line.description}</p>
                    
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
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{line.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Weekly Schedule</h3>
                  <div className="space-y-3">
                    {operatingHours.map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className={`font-medium ${currentDay === schedule.day ? 'text-blue-600' : 'text-gray-700'}`}>
                          {schedule.day}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">{schedule.hours}</span>
                          <span className={`text-sm font-medium ${getStatusColor(schedule.status)}`}>
                            {schedule.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Special Hours & Holidays</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Bank Holidays</h4>
                      <p className="text-sm text-blue-700">
                        Limited support available 10AM-2PM GMT. Emergency line remains 24/7.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Extended Hours</h4>
                      <p className="text-sm text-green-700">
                        During peak seasons (March-October), we extend Saturday hours to 6PM GMT.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Time Zone Note</h4>
                      <p className="text-sm text-orange-700">
                        All times listed are Greenwich Mean Time (GMT). We adjust for British Summer Time when applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Head Office & Support Center</h4>
                    <address className="text-gray-600 not-italic">
                      Rover P6 Parts Ltd.<br />
                      123 Classic Car Lane<br />
                      Birmingham, West Midlands<br />
                      B12 3AB, United Kingdom
                    </address>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Alternative Contact Methods</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>support@roverp6parts.co.uk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span>www.roverp6parts.co.uk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span>Live Chat available on website</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Before You Call</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    To help us assist you more efficiently, please have the following information ready:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Order Information</h5>
                        <p className="text-sm text-gray-600">Order number, purchase date, and product details</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">2</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Vehicle Information</h5>
                        <p className="text-sm text-gray-600">Rover P6 model year, engine type, and VIN if available</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">3</span>
                      </div>
                      <div>
                        <h5 className="font-medium">Issue Description</h5>
                        <p className="text-sm text-gray-600">Detailed description of the problem or question</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Tip:</strong> Our technical support team can often diagnose issues more quickly with photos. 
                      Consider having your phone ready to send images via email during the call.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call Back Service */}
          <Card>
            <CardHeader>
              <CardTitle>Can't Call Right Now?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Request a Call Back</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Schedule a convenient time for our team to call you
                  </p>
                  <Button variant="outline">Schedule Call</Button>
                </div>
                
                <div className="text-center">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Send us your questions and get a detailed response
                  </p>
                  <Button variant="outline">Send Email</Button>
                </div>
                
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button variant="outline">Start Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}