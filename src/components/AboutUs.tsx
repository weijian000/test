'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Users, Award, Wrench, Clock } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
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
            <h1 className="text-4xl font-bold mb-4">About Rover P6 Parts</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for authentic Rover P6 components and accessories since 2010.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">50,000+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">14 Years</h3>
                <p className="text-gray-600">of Excellence</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">10,000+</h3>
                <p className="text-gray-600">Parts Available</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7</h3>
                <p className="text-gray-600">Customer Support</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2010 by a group of passionate Rover P6 enthusiasts, Rover P6 Parts began as a small operation 
                dedicated to keeping these iconic British classics on the road. What started in a modest garage has grown 
                into one of the world's leading suppliers of authentic Rover P6 components.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our founder, Mark Gray, has been working with Rover P6 vehicles for over 30 years. His expertise and 
                passion for these magnificent cars drives our commitment to quality and authenticity. Every part we sell 
                is carefully sourced and thoroughly inspected to ensure it meets our high standards.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve customers worldwide, from weekend enthusiasts to professional restorers. Our mission 
                remains the same: to provide the highest quality parts and exceptional service to keep the Rover P6 
                legacy alive for future generations.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To preserve automotive heritage by providing authentic, high-quality parts for Rover P6 vehicles, 
                  ensuring these remarkable cars continue to be enjoyed by enthusiasts worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Authenticity and quality in every part</li>
                  <li>• Exceptional customer service</li>
                  <li>• Expert knowledge and guidance</li>
                  <li>• Supporting the classic car community</li>
                  <li>• Preserving automotive history</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Authentic Parts</h4>
                  <p className="text-sm text-gray-600">
                    We source only genuine OEM and high-quality reproduction parts that meet original specifications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Expert Knowledge</h4>
                  <p className="text-sm text-gray-600">
                    Our team has decades of experience with Rover P6 vehicles and can provide technical guidance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Global Shipping</h4>
                  <p className="text-sm text-gray-600">
                    We ship worldwide with secure packaging to ensure your parts arrive in perfect condition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Head Office</h4>
                  <p className="text-sm text-gray-600">
                    123 Classic Car Lane<br />
                    Birmingham, West Midlands<br />
                    B12 3AB, United Kingdom
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Get in Touch</h4>
                  <p className="text-sm text-gray-600">
                    Phone: +44 121 456 7890<br />
                    Email: info@roverp6parts.co.uk<br />
                    Hours: Mon-Fri 9AM-6PM GMT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}