'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types/order';
import { Package, PackageX } from 'lucide-react';
import Image from 'next/image';

interface OrderItemsProps {
  items: OrderItem[];
  onToggleMissing: (itemId: string) => void;
}

export default function OrderItems({ items, onToggleMissing }: OrderItemsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Package className='w-5 h-5' />
          Order Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {items.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                item.isMissing ? 'bg-red-50 border-red-200' : 'bg-white'
              }`}
            >
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
                    <h4 className='font-semibold text-gray-900 truncate'>{item.productName}</h4>
                    <div className='flex items-center gap-4 mt-1 text-sm text-gray-600'>
                      <span>ID: {item.id}</span>
                      <span>SKU: {item.sku}</span>
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className='text-right ml-4'>
                    <div className='flex items-center gap-2'>
                      {item.price !== item.salePrice ? (
                        <>
                          <span className='text-sm text-gray-500 line-through'>
                            {formatCurrency(item.price)}
                          </span>
                          <span className='font-semibold text-green-600'>
                            {formatCurrency(item.salePrice)}
                          </span>
                        </>
                      ) : (
                        <span className='font-semibold text-gray-900'>
                          {formatCurrency(item.price)}
                        </span>
                      )}
                    </div>
                    <div className='text-sm text-gray-600 mt-1'>
                      Total: {formatCurrency(item.salePrice * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Missing Item Button */}
              <div className='flex-shrink-0'>
                <Button
                  variant={item.isMissing ? 'destructive' : 'outline'}
                  size='sm'
                  onClick={() => onToggleMissing(item.id)}
                  className='flex items-center gap-2'
                >
                  {item.isMissing ? (
                    <>
                      <PackageX className='w-4 h-4' />
                      Missing
                    </>
                  ) : (
                    <>
                      <Package className='w-4 h-4' />
                      Set Missing
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
