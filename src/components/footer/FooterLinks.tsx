import React from 'react';
import { socialIcons, quickLinks, supportLinks } from '../../constants/footer-data';

type PageView = 'home' | 'terms' | 'customer-rights' | 'privacy';

interface FooterLinksProps {
  onNavigate: (page: PageView) => void;
  onNavigateToSupport?: (page: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export function FooterLinks({ onNavigate, onNavigateToSupport, onCategoryFilter }: FooterLinksProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Rover P6 Parts</h3>
          <p className="text-gray-400 text-sm leading-6">
            Your trusted partner for high-quality car parts and accessories. 
            We've been serving automotive enthusiasts since 2010 with premium 
            products and exceptional service.
          </p>
          <div className="flex space-x-4">
            {socialIcons.map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    if (link.href === '#contact') {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (link.name === 'Track Order') {
                      onNavigateToSupport?.('track-order');
                    } else if (link.name === 'Returns') {
                      onNavigateToSupport?.('return-policy');
                    } else if (link.name === 'About Us') {
                      onNavigateToSupport?.('about-us');
                    } else if (link.name === 'Size Guide') {
                      onNavigateToSupport?.('size-guide');

                    } else if (link.name === 'Product Support') {
                      onNavigateToSupport?.('product-support');
                    } else if (link.name === 'Live Chat') {
                      onNavigateToSupport?.('live-chat');
                    } else if (link.name === 'Call Support') {
                      onNavigateToSupport?.('call-support');
                    } else {
                      // Handle other quick links as needed
                      console.log(`Clicked ${link.name}`);
                    }
                  }}
                  className="text-gray-400 hover:text-white text-sm transition-colors text-left block w-full"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>



        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {supportLinks.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    if (item.name === 'Installation Guides') {
                      onNavigateToSupport?.('installation-guide');
                    } else if (item.name === 'Warranty') {
                      onNavigateToSupport?.('warranty-info');

                    } else if (item.name === 'Live Chat') {
                      onNavigateToSupport?.('live-chat');
                    } else if (item.name === 'Call Support') {
                      onNavigateToSupport?.('call-support');
                    } else {
                      console.log(`Clicked support: ${item.name}`);
                    }
                  }}
                  className="text-gray-400 hover:text-white text-sm transition-colors text-left block w-full"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}