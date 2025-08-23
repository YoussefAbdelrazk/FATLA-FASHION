'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types/order';
import { Hash, Package, PackageX, Palette, Ruler, ShoppingCart, Tag } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface OrderItemsModernProps {
  items: OrderItem[];
  onToggleMissing: (itemId: string) => Promise<void>;
}

export default function OrderItemsModern({ items, onToggleMissing }: OrderItemsModernProps) {
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleToggleMissing = async (itemId: string) => {
    setLoadingItems(prev => new Set(prev).add(itemId));
    try {
      await onToggleMissing(itemId);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  return (
    <Card className='border-0 shadow-lg'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-gray-900'>
          <Package className='w-5 h-5 text-blue-600' />
          Order Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {items.map(item => (
            <div
              key={item.id}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                item.isMissing
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
            >
              {/* Missing Item Overlay */}
              {item.isMissing && (
                <div className='absolute top-3 right-3'>
                  <div className='bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                    Missing
                  </div>
                </div>
              )}

              <div className='flex items-start gap-6'>
                {/* Product Image */}
                <div className='relative w-24 h-24 flex-shrink-0'>
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className='object-cover rounded-lg'
                  />
                  {item.isMissing && (
                    <div className='absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center'>
                      <PackageX className='w-8 h-8 text-red-600' />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                        {item.productName}
                      </h4>

                      {/* Product Details Grid */}
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='flex items-center gap-2'>
                          <Hash className='w-4 h-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>ID: {item.id}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Tag className='w-4 h-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>SKU: {item.sku}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Ruler className='w-4 h-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>Size: {item.size}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Palette className='w-4 h-4 text-gray-500' />
                          <span className='text-sm text-gray-600'>Color: {item.color}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className='text-right ml-6'>
                      <div className='flex items-center gap-2 mb-2'>
                        {item.price !== item.salePrice ? (
                          <>
                            <span className='text-sm text-gray-500 line-through'>
                              {formatCurrency(item.price)}
                            </span>
                            <span className='text-lg font-bold text-green-600'>
                              {formatCurrency(item.salePrice)}
                            </span>
                          </>
                        ) : (
                          <span className='text-lg font-bold text-gray-900'>
                            {formatCurrency(item.price)}
                          </span>
                        )}
                      </div>

                      <div className='flex items-center gap-2 text-sm text-gray-600 mb-3'>
                        <ShoppingCart className='w-4 h-4' />
                        <span>Qty: {item.quantity}</span>
                      </div>

                      <div className='text-sm font-semibold text-gray-900'>
                        Total: {formatCurrency(item.salePrice * item.quantity)}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className='flex justify-end'>
                    <Button
                      variant={item.isMissing ? 'destructive' : 'outline'}
                      size='sm'
                      onClick={() => handleToggleMissing(item.id)}
                      disabled={loadingItems.has(item.id)}
                      className={`transition-all duration-200 ${
                        item.isMissing
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {loadingItems.has(item.id) ? (
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2'></div>
                      ) : item.isMissing ? (
                        <PackageX className='w-4 h-4 mr-2' />
                      ) : (
                        <Package className='w-4 h-4 mr-2' />
                      )}
                      {item.isMissing ? 'Mark Available' : 'Mark Missing'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
