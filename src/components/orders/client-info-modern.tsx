import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientAddress } from '@/types/order';
import { Building, Map, MapPin, Navigation, Phone, User } from 'lucide-react';

interface ClientInfoModernProps {
  name: string;
  mobile: string;
  address: ClientAddress;
}

export default function ClientInfoModern({ name, mobile, address }: ClientInfoModernProps) {
  return (
    <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-blue-50'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-gray-900'>
          <User className='w-5 h-5 text-blue-600' />
          Client Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {/* Client Basic Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                <User className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Client Name</p>
                <p className='font-semibold text-gray-900'>{name}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                <Phone className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Mobile Number</p>
                <a
                  href={`tel:${mobile}`}
                  className='font-semibold text-blue-600 hover:text-blue-800 hover:underline'
                >
                  {mobile}
                </a>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 mb-4'>
              <MapPin className='w-5 h-5 text-purple-600' />
              <h4 className='font-semibold text-gray-900'>Delivery Address</h4>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Left Column */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                    <Map className='w-4 h-4 text-purple-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Government</p>
                    <p className='font-medium text-gray-900'>{address.government}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Map className='w-4 h-4 text-blue-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>City</p>
                    <p className='font-medium text-gray-900'>{address.city}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                    <Navigation className='w-4 h-4 text-green-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Area</p>
                    <p className='font-medium text-gray-900'>{address.area}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center'>
                    <Building className='w-4 h-4 text-orange-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Building</p>
                    <p className='font-medium text-gray-900'>{address.building}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center'>
                    <Building className='w-4 h-4 text-indigo-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Floor</p>
                    <p className='font-medium text-gray-900'>{address.floor}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <div className='w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center'>
                    <MapPin className='w-4 h-4 text-pink-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Landmark</p>
                    <p className='font-medium text-gray-900'>{address.landmark}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
