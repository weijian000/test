'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  deliveryOption: string;
  deliveryPrice: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  getUserOrders: () => Order[];
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'orderDate'>) => void;
  getWishlist: () => string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1 && users[userIndex].password === currentPassword) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  };

  const deleteAccount = () => {
    if (!user) return;

    // Remove from users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter((u: any) => u.id !== user.id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    // Remove user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem(`orders_${user.id}`);
    localStorage.removeItem(`wishlist_${user.id}`);
    
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);
    
    if (foundUser) {
      // In a real app, this would send an email
      // For demo purposes, we'll just return true
      return true;
    }
    return false;
  };

  const getUserOrders = (): Order[] => {
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`orders_${user.id}`) || '[]');
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'orderDate'>) => {
    if (!user) return;

    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      userId: user.id,
      orderDate: new Date().toISOString(),
    };

    const orders = getUserOrders();
    orders.unshift(order);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
  };

  const getWishlist = (): string[] => {
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    
    const wishlist = getWishlist();
    const filtered = wishlist.filter(id => id !== productId);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(filtered));
  };

  const isInWishlist = (productId: string): boolean => {
    return getWishlist().includes(productId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      deleteAccount,
      resetPassword,
      getUserOrders,
      addOrder,
      getWishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}