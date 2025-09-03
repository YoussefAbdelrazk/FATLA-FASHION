'use client';

import { Button } from '@/components/ui/button';
import { OrderItem } from '@/types/order';
import { Package, PackageX } from 'lucide-react';
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
    <div className='space-y-4'>
      {items.map(item => (
        <div
          key={item.id}
          className={`group relative p-6 rounded-lg border transition-all duration-200 hover:shadow-sm ${
            item.isMissing
              ? 'border-red-200 bg-red-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className='flex items-start gap-4'>
            {/* Product Image */}
            <div className='relative w-20 h-20 flex-shrink-0'>
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className='object-cover rounded-md'
              />
              {item.isMissing && (
                <div className='absolute inset-0 bg-red-500/20 rounded-md flex items-center justify-center'>
                  <PackageX className='w-6 h-6 text-red-600' />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h4 className='font-semibold text-gray-900 mb-2'>{item.productName}</h4>

                  {/* Product Details */}
                  <div className='space-y-1 text-sm text-gray-600'>
                    <div>ID: {item.id}</div>
                    <div>SKU: {item.sku}</div>
                    <div>Size: {item.size}</div>
                    <div>Color: {item.color}</div>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className='text-right ml-4'>
                  <div className='flex items-center gap-2 mb-1'>
                    {item.price !== item.salePrice ? (
                      <>
                        <span className='text-sm text-gray-500 line-through'>
                          {formatCurrency(item.price)}
                        </span>
                        <span className='font-semibold text-red-600'>
                          {formatCurrency(item.salePrice)}
                        </span>
                      </>
                    ) : (
                      <span className='font-semibold text-gray-900'>
                        {formatCurrency(item.price)}
                      </span>
                    )}
                  </div>

                  <div className='text-sm text-gray-600 mb-2'>Qty: {item.quantity}</div>

                  <div className='text-sm font-semibold text-gray-900'>
                    Total: {formatCurrency(item.salePrice * item.quantity)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className='flex justify-end mt-4'>
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
  );
}
