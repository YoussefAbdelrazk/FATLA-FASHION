'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientAddress } from '@/types/order';
import { MapPin, Phone, User } from 'lucide-react';

interface ClientInfoProps {
  name: string;
  mobile: string;
  address: ClientAddress;
}

export default function ClientInfo({ name, mobile, address }: ClientInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='w-5 h-5' />
          Client Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Client Name and Mobile */}
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4 text-gray-500' />
              <span className='font-medium'>Name:</span>
              <span className='text-gray-900'>{name}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-gray-500' />
              <span className='font-medium'>Mobile:</span>
              <a
                href={`tel:${mobile}`}
                className='text-blue-600 hover:text-blue-800 hover:underline'
              >
                {mobile}
              </a>
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <MapPin className='w-4 h-4 text-gray-500' />
              <span className='font-medium'>Address:</span>
            </div>
            <div className='grid grid-cols-2 gap-4 ml-6'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Government:</span>
                  <span className='text-sm text-gray-900'>{address.government}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>City:</span>
                  <span className='text-sm text-gray-900'>{address.city}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Area:</span>
                  <span className='text-sm text-gray-900'>{address.area}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Building:</span>
                  <span className='text-sm text-gray-900'>{address.building}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Floor:</span>
                  <span className='text-sm text-gray-900'>{address.floor}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Landmark:</span>
                  <span className='text-sm text-gray-900'>{address.landmark}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
