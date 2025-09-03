import React from 'react';
import { Badge } from '../ui/badge';
import { paymentMethods, legalLinks } from '../../constants/footer-data';

type PageView = 'home' | 'terms' | 'customer-rights' | 'privacy';

interface FooterBottomProps {
  onNavigate: (page: PageView) => void;
}

export function FooterBottom({ onNavigate }: FooterBottomProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href === 'privacy' || href === 'terms' || href === 'customer-rights') {
      e.preventDefault();
      onNavigate(href as PageView);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-gray-400">
          © {currentYear} Rover P6 Parts. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">We Accept:</span>
          <div className="flex space-x-2">
            {paymentMethods.map((method, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 text-xs text-gray-500">
        {legalLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            onClick={(e) => handleLinkClick(link.href, e)}
            className="hover:text-gray-300 cursor-pointer transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-600 mt-4 pt-4 border-t border-gray-800">
        Supplied by Mark Gray
      </div>
    </div>
  );
}