'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, User, Package, Heart, Settings, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileSettings } from './profile/ProfileSettings';
import { MyOrders } from './profile/MyOrders';
import { Wishlist } from './profile/Wishlist';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const { user, logout, deleteAccount, getUserOrders, getWishlist } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">👤</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Please log in</h3>
            <p className="text-gray-500 mb-4">You need to be logged in to access your profile</p>
            <Button onClick={onBack}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const orders = getUserOrders();
  const wishlist = getWishlist();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    onBack();
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    toast.success('Account deleted successfully');
    onBack();
  };

  const getRecentOrderStatus = () => {
    if (orders.length === 0) return null;
    const recentOrder = orders[0];
    return recentOrder.status;
  };

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Wishlist Items',
      value: wishlist.length,
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Account Status',
      value: 'Active',
      icon: User,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-primary-foreground/80">{user.email}</p>
                {getRecentOrderStatus() && (
                  <Badge className="mt-2 bg-white/20 text-white">
                    Last order: {getRecentOrderStatus()}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Member since</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="profile" className="mt-0">
                  <ProfileSettings />
                </TabsContent>

                <TabsContent value="orders" className="mt-0">
                  <MyOrders />
                </TabsContent>

                <TabsContent value="wishlist" className="mt-0">
                  <Wishlist />
                </TabsContent>

                <TabsContent value="account" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <Card className="border-orange-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <LogOut className="h-5 w-5 text-orange-600" />
                                <div>
                                  <h4 className="font-medium">Sign Out</h4>
                                  <p className="text-sm text-gray-600">Sign out of your account</p>
                                </div>
                              </div>
                              <Button variant="outline" onClick={handleLogout}>
                                Sign Out
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-red-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Trash2 className="h-5 w-5 text-red-600" />
                                <div>
                                  <h4 className="font-medium text-red-600">Delete Account</h4>
                                  <p className="text-sm text-gray-600">
                                    Permanently delete your account and all data
                                  </p>
                                </div>
                              </div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    Delete Account
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your 
                                      account and remove all your data from our servers, including:
                                      <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Profile information</li>
                                        <li>Order history</li>
                                        <li>Wishlist items</li>
                                        <li>Saved addresses</li>
                                      </ul>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={handleDeleteAccount}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Yes, delete my account
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Account Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Account ID:</span>
                          <p className="font-mono">{user.id}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Registration Date:</span>
                          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}