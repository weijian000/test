'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Mock newsletter subscription
    setIsSubscribed(true);
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="h-16 w-16 mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get the latest car parts deals, new arrivals, and exclusive offers delivered 
            straight to your inbox. Join thousands of car enthusiasts!
          </p>
        </div>

        {isSubscribed ? (
          <div className="flex items-center justify-center space-x-3 text-green-300">
            <CheckCircle className="h-6 w-6" />
            <span className="text-lg font-medium">Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-3">
              We respect your privacy. <a href="/unsubscribe" className="underline hover:text-white transition-colors cursor-pointer">Unsubscribe</a> at any time.
            </p>
          </form>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: 'Exclusive Deals',
              description: 'Get access to member-only discounts and flash sales'
            },
            {
              title: 'New Arrivals',
              description: 'Be the first to know about new products and brands'
            },
            {
              title: 'Expert Tips',
              description: 'Receive maintenance tips and installation guides'
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-blue-200 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}