'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Package, Calendar, Truck, MapPin, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function MyOrders() {
  const { getUserOrders } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = getUserOrders();

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-600', label: 'Pending' },
      processing: { color: 'bg-blue-600', label: 'Processing' },
      shipped: { color: 'bg-purple-600', label: 'Shipped' },
      delivered: { color: 'bg-green-600', label: 'Delivered' },
      cancelled: { color: 'bg-red-600', label: 'Cancelled' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl text-gray-300 mb-4">📦</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
            ← Back to Orders
          </Button>
          <div className="text-right">
            <p className="text-sm text-gray-500">Order #{selectedOrder.id}</p>
            <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
          </div>
        </div>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Status</span>
              {getStatusBadge(selectedOrder.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Delivery Address</span>
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{selectedOrder.deliveryAddress.street}</p>
                  <p>{selectedOrder.deliveryAddress.city} {selectedOrder.deliveryAddress.postal}</p>
                  <p>{selectedOrder.deliveryAddress.country}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Delivery Method</span>
                </h4>
                <p className="text-sm">{selectedOrder.deliveryOption}</p>
                <p className="text-sm text-gray-600">{selectedOrder.estimatedDelivery}</p>
                {selectedOrder.trackingNumber && (
                  <p className="text-sm font-mono mt-1">
                    Tracking: {selectedOrder.trackingNumber}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedOrder.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.productName}
                      className="h-full w-full object-cover rounded"
                    />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {item.quantity}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.productName}</h4>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${(selectedOrder.total - selectedOrder.deliveryPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span>
                  {selectedOrder.deliveryPrice === 0 ? 'Free' : `$${selectedOrder.deliveryPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Orders ({orders.length})</h3>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found with the selected filter</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Order #{order.id}</h4>
                    <p className="text-sm text-gray-500 flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(order.orderDate)}</span>
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(order.status)}
                    <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>{order.deliveryOption}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>

                {/* Order Items Preview */}
                <div className="mt-4 flex space-x-2 overflow-x-auto">
                  {order.items.slice(0, 4).map((item: any, index: number) => (
                    <div key={index} className="relative flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.productName}
                        className="h-12 w-12 object-cover rounded"
                      />
                      {item.quantity > 1 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                          {item.quantity}
                        </Badge>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}