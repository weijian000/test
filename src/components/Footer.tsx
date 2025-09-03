'use client';

import React from 'react';
import { Separator } from './ui/separator';
import { FooterFeatures } from './footer/FooterFeatures';
import { FooterLinks } from './footer/FooterLinks';
import { FooterBottom } from './footer/FooterBottom';

type PageView = 'home' | 'terms' | 'customer-rights' | 'privacy';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onNavigateToSupport?: (page: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export function Footer({ onNavigate, onNavigateToSupport, onCategoryFilter }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <FooterFeatures />
      <FooterLinks onNavigate={onNavigate} onNavigateToSupport={onNavigateToSupport} onCategoryFilter={onCategoryFilter} />
      <Separator className="bg-gray-800" />
      <FooterBottom onNavigate={onNavigate} />
    </footer>
  );
}