import { ClientAddress } from '@/types/order';
import { User } from 'lucide-react';

interface ClientInfoModernProps {
  name: string;
  mobile: string;
  address: ClientAddress;
}

export default function ClientInfoModern({ name, mobile, address }: ClientInfoModernProps) {
  return (
    <div className='space-y-4'>
      {/* Customer Profile */}
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
          <User className='w-6 h-6 text-purple-600' />
        </div>
        <div className='flex-1'>
          <p className='font-medium text-gray-900'>{name}</p>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <span>📄</span>
            <span>5 Orders</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Mobile Number */}
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
          <span className='text-gray-600 text-sm'>📞</span>
        </div>
        <span className='text-sm text-gray-900'>{mobile}</span>
      </div>

      {/* Address Details */}
      <div className='space-y-2'>
        <h4 className='font-medium text-gray-900 text-sm'>Address:</h4>
        <div className='text-sm text-gray-600 space-y-1'>
          <div>Government: {address.government}</div>
          <div>City: {address.city}</div>
          <div>Area: {address.area}</div>
          <div>Building: {address.building}</div>
          <div>Floor: {address.floor}</div>
          <div>Landmark: {address.landmark}</div>
        </div>
      </div>
    </div>
  );
}
