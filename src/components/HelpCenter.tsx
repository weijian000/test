'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, Clock, HelpCircle, Book, Wrench, Package } from 'lucide-react';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface HelpCenterProps {
  onBack: () => void;
}

export function HelpCenter({ onBack }: HelpCenterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Ordering & Payment',
      icon: <Package className="h-5 w-5" />,
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order through our website by adding items to your cart and proceeding to checkout. We accept major credit cards, PayPal, and bank transfers.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept Visa, MasterCard, American Express, PayPal, and bank transfers. All payments are processed securely using SSL encryption.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. After this time, please contact our customer service team for assistance.'
        },
        {
          question: 'Do you offer quantity discounts?',
          answer: 'Yes, we offer quantity discounts for orders of 5 or more of the same item. Discounts are automatically applied at checkout.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: <Package className="h-5 w-5" />,
      faqs: [
        {
          question: 'What are your shipping options?',
          answer: 'We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and overnight delivery for urgent orders.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship worldwide. International shipping times vary by destination, typically 7-14 business days. Customs fees may apply.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in the "My Orders" section of your account.'
        },
        {
          question: 'What if my package is damaged?',
          answer: 'If your package arrives damaged, please contact us immediately with photos of the damage. We\'ll arrange a replacement or refund promptly.'
        }
      ]
    },
    {
      title: 'Product Information',
      icon: <Wrench className="h-5 w-5" />,
      faqs: [
        {
          question: 'How do I know if a part fits my P6?',
          answer: 'Each product page includes compatibility information. You can also use our VIN lookup tool or contact our technical support team for assistance.'
        },
        {
          question: 'Are your parts genuine or aftermarket?',
          answer: 'We stock both genuine OEM parts and high-quality aftermarket alternatives. Product descriptions clearly indicate the type and manufacturer.'
        },
        {
          question: 'Do you provide installation instructions?',
          answer: 'Many of our products include installation guides. You can also find comprehensive guides in our Installation section or contact technical support.'
        },
        {
          question: 'What warranty do you offer on parts?',
          answer: 'Warranty periods vary by part and manufacturer, typically ranging from 1-3 years. Full warranty details are provided with each product.'
        }
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: <Package className="h-5 w-5" />,
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused parts in original packaging. Items must be in resalable condition with proof of purchase.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our customer service team to obtain a return authorization number (RMA). Package the item securely and ship to our returns address.'
        },
        {
          question: 'Who pays for return shipping?',
          answer: 'Return shipping costs are the customer\'s responsibility unless the item is defective or we shipped the wrong part.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 5-7 business days after we receive the returned item. The refund will appear on your original payment method.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <MessageCircle className="h-6 w-6" />,
      action: 'Start Chat',
      available: 'Mon-Fri 9AM-6PM GMT'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a technical expert',
      icon: <Phone className="h-6 w-6" />,
      action: '+44 121 456 7890',
      available: 'Mon-Fri 9AM-6PM GMT'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions or photos',
      icon: <Mail className="h-6 w-6" />,
      action: 'support@roverp6parts.co.uk',
      available: '24/7 - Response within 4 hours'
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="text-blue-600 mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <Button variant="outline" className="mb-2">
                    {option.action}
                  </Button>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {option.available}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            
            {filteredFAQs.length === 0 && searchTerm !== '' && (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">Try different keywords or browse the categories below.</p>
                </CardContent>
              </Card>
            )}

            {filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? Our expert support team is here to help with any questions 
                about Rover P6 parts, installation, or technical issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}