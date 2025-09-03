import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { contactInfo, quickSupportItems } from '../../constants/contact-data';
import { toast } from 'sonner@2.0.3';

interface ContactInfoProps {
  onNavigateToSupport?: (page: string) => void;
}

export function ContactInfo({ onNavigateToSupport }: ContactInfoProps = {}) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <Icon className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">{info.title}</p>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickSupportItems.map((item, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                switch(item) {
                  case 'Track Your Order':
                    onNavigateToSupport?.('track-order');
                    break;
                  case 'Return Policy':
                    onNavigateToSupport?.('return-policy');
                    break;
                  case 'Installation Guide':
                    onNavigateToSupport?.('installation-guide');
                    break;
                  case 'Warranty Info':
                    onNavigateToSupport?.('warranty-info');
                    break;
                  default:
                    toast.info(`${item} clicked - Feature coming soon!`);
                }
              }}
            >
              {item}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}