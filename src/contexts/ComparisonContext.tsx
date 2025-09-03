'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface ComparisonContextType {
  comparisonItems: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  maxItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonItems, setComparisonItems] = useState<Product[]>([]);
  const maxItems = 4;

  const addToComparison = (product: Product) => {
    setComparisonItems(prev => {
      if (prev.length >= maxItems) return prev;
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearComparison = () => {
    setComparisonItems([]);
  };

  const isInComparison = (productId: string): boolean => {
    return comparisonItems.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonItems,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      maxItems,
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}