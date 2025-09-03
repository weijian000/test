'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Search, Phone, Mail, MessageCircle, BookOpen, Video, Download, Wrench, AlertCircle, CheckCircle, User } from 'lucide-react';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface ProductSupportProps {
  onBack: () => void;
}

export function ProductSupport({ onBack }: ProductSupportProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const supportResources = [
    {
      title: 'Installation Guides',
      icon: <Wrench className="h-5 w-5" />,
      items: [
        { name: 'Engine Component Installation', type: 'PDF', size: '2.4 MB' },
        { name: 'Brake System Setup', type: 'Video', duration: '15 min' },
        { name: 'Electrical Component Wiring', type: 'PDF', size: '3.1 MB' },
        { name: 'Body Panel Replacement', type: 'Video', duration: '22 min' }
      ]
    },
    {
      title: 'Technical Documentation',
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { name: 'Rover P6 Service Manual', type: 'PDF', size: '45.2 MB' },
        { name: 'Parts Catalog 2024', type: 'PDF', size: '12.8 MB' },
        { name: 'Torque Specifications', type: 'PDF', size: '1.2 MB' },
        { name: 'Wiring Diagrams Complete', type: 'PDF', size: '8.7 MB' }
      ]
    },
    {
      title: 'Video Tutorials',
      icon: <Video className="h-5 w-5" />,
      items: [
        { name: 'Basic Maintenance Guide', type: 'Video', duration: '35 min' },
        { name: 'Troubleshooting Common Issues', type: 'Video', duration: '28 min' },
        { name: 'Advanced Restoration Tips', type: 'Video', duration: '45 min' },
        { name: 'Tool Requirements Overview', type: 'Video', duration: '12 min' }
      ]
    }
  ];

  const commonIssues = [
    {
      issue: 'Engine won\'t start',
      symptoms: ['No cranking', 'Cranks but won\'t start', 'Rough idle'],
      solutions: ['Check battery connections', 'Verify fuel supply', 'Inspect spark plugs'],
      difficulty: 'Beginner'
    },
    {
      issue: 'Brake performance issues',
      symptoms: ['Soft brake pedal', 'Brake noise', 'Pulling to one side'],
      solutions: ['Check brake fluid level', 'Inspect brake pads', 'Bleed brake system'],
      difficulty: 'Intermediate'
    },
    {
      issue: 'Electrical problems',
      symptoms: ['Lights not working', 'Gauges malfunction', 'Battery drain'],
      solutions: ['Check fuses', 'Test alternator', 'Inspect wiring harness'],
      difficulty: 'Advanced'
    },
    {
      issue: 'Cooling system problems',
      symptoms: ['Overheating', 'Coolant loss', 'Temperature fluctuation'],
      solutions: ['Check coolant level', 'Inspect radiator', 'Test thermostat'],
      difficulty: 'Intermediate'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-600';
      case 'Intermediate':
        return 'bg-yellow-600';
      case 'Advanced':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const filteredIssues = commonIssues.filter(issue =>
    searchTerm === '' ||
    issue.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <h1 className="text-4xl font-bold mb-4">Product Support</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical assistance, documentation, and troubleshooting guides for Rover P6 parts
            </p>
          </div>

          {/* Quick Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Technical Hotline</h3>
                <p className="text-sm text-gray-600 mb-4">Speak with our technical experts</p>
                <p className="font-medium text-blue-600">+44 121 456 7891</p>
                <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM GMT</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Technical Email</h3>
                <p className="text-sm text-gray-600 mb-4">Send detailed technical queries</p>
                <p className="font-medium text-green-600">tech@roverp6parts.co.uk</p>
                <p className="text-xs text-gray-500">Response within 4 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Real-time technical assistance</p>
                <Button className="w-full">Start Chat</Button>
                <p className="text-xs text-gray-500 mt-2">Available 24/7</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for technical issues, symptoms, or solutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="troubleshooting" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>

            <TabsContent value="troubleshooting" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Issues & Solutions</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {filteredIssues.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                            {item.issue}
                          </CardTitle>
                          <Badge className={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-red-600">Symptoms:</h4>
                            <ul className="space-y-2">
                              {item.symptoms.map((symptom, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3 text-green-600">Solutions:</h4>
                            <ul className="space-y-2">
                              {item.solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Need more help? Contact our technical team
                            </span>
                            <Button variant="outline" size="sm">
                              Get Expert Help
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Technical Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {supportResources.map((resource, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {resource.icon}
                          <span className="ml-2">{resource.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {resource.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                              <div className="flex items-center space-x-3">
                                <Download className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {item.type} • {item.size || item.duration}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                {item.type === 'Video' ? 'Watch' : 'Download'}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Request Custom Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Can't find the documentation you need? Our technical team can create custom guides for specific procedures or parts.
                    </p>
                    <Button>Request Custom Guide</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Warranty & Technical Support</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Warranty Claims</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          If you're experiencing issues with a product under warranty, our technical team will help diagnose the problem and process your claim.
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold">Required Information:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Order number and purchase date</li>
                            <li>• Product part number</li>
                            <li>• Detailed description of the issue</li>
                            <li>• Photos of the problem (if applicable)</li>
                          </ul>
                        </div>
                        
                        <Button className="w-full">Submit Warranty Claim</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Consultation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Our certified Rover P6 specialists are available for one-on-one technical consultations for complex installations or modifications.
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold">Consultation Services:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Engine rebuild guidance</li>
                            <li>• Electrical system diagnostics</li>
                            <li>• Performance modifications</li>
                            <li>• Restoration planning</li>
                          </ul>
                        </div>
                        
                        <Button className="w-full" variant="outline">Book Consultation</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Extended Support Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Basic Support</h4>
                        <p className="text-sm text-gray-600 mb-3">Email support and documentation access</p>
                        <p className="text-lg font-bold text-green-600">Free</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                        <h4 className="font-semibold mb-2">Premium Support</h4>
                        <p className="text-sm text-gray-600 mb-3">Priority support with phone access</p>
                        <p className="text-lg font-bold text-blue-600">£29/year</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Professional Support</h4>
                        <p className="text-sm text-gray-600 mb-3">1-on-1 consultations and custom guides</p>
                        <p className="text-lg font-bold text-purple-600">£99/year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}