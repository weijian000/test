'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { User, UserPlus, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface CheckoutAuthProps {
  onComplete: (isGuest: boolean) => void;
}

export function CheckoutAuth({ onComplete }: CheckoutAuthProps) {
  const [authMode, setAuthMode] = useState<'options' | 'login' | 'register'>('options');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast.success('Login successful!');
        onComplete(false);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(
        registerData.email,
        registerData.password,
        registerData.firstName,
        registerData.lastName
      );
      
      if (success) {
        toast.success('Account created successfully!');
        onComplete(false);
      } else {
        toast.error('Email already exists. Please use a different email.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    onComplete(true);
  };

  if (authMode === 'options') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Checkout Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Guest Checkout */}
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Purchase without Login</h3>
                  <p className="text-sm text-gray-600">Quick checkout as a guest</p>
                </div>
              </div>
              <Button onClick={handleGuestCheckout} className="w-full">
                Continue as Guest
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-500">or</span>
            </div>

            {/* Login */}
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Login to Your Account</h3>
                  <p className="text-sm text-gray-600">Access your saved addresses and order history</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setAuthMode('login')} className="w-full">
                Login Now
              </Button>
            </div>

            {/* Register */}
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Create New Account</h3>
                  <p className="text-sm text-gray-600">Register and checkout in one step</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setAuthMode('register')} className="w-full">
                Create Account & Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authMode === 'login') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAuthMode('options')}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Signing in...' : 'Login & Continue'}
              </Button>
            </div>
          </form>

          <Separator className="my-4" />
          
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('register')}>
              Create one now
            </Button>
          </p>
        </CardContent>
      </Card>
    );
  }

  if (authMode === 'register') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password (min. 6 characters)"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAuthMode('options')}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creating account...' : 'Register & Continue'}
              </Button>
            </div>
          </form>

          <Separator className="my-4" />
          
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('login')}>
              Sign in instead
            </Button>
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
}