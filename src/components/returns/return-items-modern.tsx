'use client';

import { ReturnItem } from '@/types/return';
import { Package } from 'lucide-react';
import Image from 'next/image';

interface ReturnItemsModernProps {
  items: ReturnItem[];
}

export default function ReturnItemsModern({ items }: ReturnItemsModernProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(amount);
  };

  return (
    <div className='space-y-4'>
      {items.map(item => (
        <div
          key={item.id}
          className='group relative p-6 rounded-lg border border-orange-200 bg-orange-50 hover:shadow-sm transition-all duration-200'
        >
          <div className='flex flex-col lg:flex-row items-start gap-4'>
            {/* Product Image */}
            <div className='relative w-20 h-20 flex-shrink-0'>
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className='object-cover rounded-md'
              />
            </div>

            {/* Product Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h4 className='font-semibold text-gray-900 mb-2'>{item.productName}</h4>

                  {/* Product Details */}
                  <div className='space-y-1 text-sm text-gray-600'>
                    <div>Color: {item.color}</div>
                    <div>Size: {item.size}</div>
                    {item.sku && <div>SKU: {item.sku}</div>}
                  </div>

                  {/* Return Reason */}
                  <div className='mt-3 p-3 bg-red-50 border border-red-200 rounded-lg'>
                    <div className='flex items-center gap-2 text-red-800 mb-1'>
                      <Package className='w-4 h-4' />
                      <span className='text-sm font-medium'>Return Reason:</span>
                    </div>
                    <p className='text-sm text-red-700'>{item.returnReason}</p>
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
                        <span className='font-semibold text-orange-600'>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
