'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactInfo } from '@/types/contact';
import { Globe, Mail, MapPin, MessageCircle } from 'lucide-react';

interface ContactDisplayProps {
  contactData: ContactInfo | null;
  isLoading?: boolean;
}

export function ContactDisplay({ contactData, isLoading = false }: ContactDisplayProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>جاري تحميل معلومات التواصل...</p>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center min-h-96'>
          <div className='text-center'>
            <Globe className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-600 text-lg'>لا توجد معلومات تواصل</p>
            <p className='text-gray-500 text-sm'>استخدم النموذج أدناه لإضافة معلومات التواصل</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Globe className='h-5 w-5' />
          معلومات التواصل الحالية
        </CardTitle>
        <CardDescription>تفاصيل الاتصال وروابط وسائل التواصل الاجتماعي الحالية</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Contact Details */}
          <div className='space-y-3'>
            <h4 className='font-semibold text-gray-900 flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              تفاصيل الاتصال
            </h4>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='font-medium'>البريد الإلكتروني:</span> {contactData.email}
              </p>
              <p>
                <span className='font-medium'>الخط الساخن:</span> {contactData.hotline}
              </p>
              <p>
                <span className='font-medium'>واتساب:</span> {contactData.whatsapp}
              </p>
              <p>
                <span className='font-medium'>الجوال الأول:</span> {contactData.mobile1}
              </p>
              {contactData.mobile2 && (
                <p>
                  <span className='font-medium'>الجوال الثاني:</span> {contactData.mobile2}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className='space-y-3'>
            <h4 className='font-semibold text-gray-900 flex items-center gap-2'>
              <MapPin className='h-4 w-4' />
              الموقع
            </h4>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='font-medium'>العنوان:</span> {contactData.address}
              </p>
              <p>
                <span className='font-medium'>الإحداثيات:</span> {contactData.latitude.toFixed(6)},{' '}
                {contactData.longitude.toFixed(6)}
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className='space-y-3'>
            <h4 className='font-semibold text-gray-900 flex items-center gap-2'>
              <MessageCircle className='h-4 w-4' />
              وسائل التواصل الاجتماعي
            </h4>
            <div className='space-y-2 text-sm'>
              {contactData.facebook && (
                <p>
                  <span className='font-medium'>فيسبوك:</span> {contactData.facebook}
                </p>
              )}
              {contactData.instagram && (
                <p>
                  <span className='font-medium'>إنستغرام:</span> {contactData.instagram}
                </p>
              )}
              {contactData.tiktok && (
                <p>
                  <span className='font-medium'>تيك توك:</span> {contactData.tiktok}
                </p>
              )}
              {contactData.snapchat && (
                <p>
                  <span className='font-medium'>سناب شات:</span> {contactData.snapchat}
                </p>
              )}
              {contactData.linkedin && (
                <p>
                  <span className='font-medium'>لينكد إن:</span> {contactData.linkedin}
                </p>
              )}
              {contactData.x && (
                <p>
                  <span className='font-medium'>إكس (تويتر):</span> {contactData.x}
                </p>
              )}
              {contactData.telegram && (
                <p>
                  <span className='font-medium'>تليجرام:</span> {contactData.telegram}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
