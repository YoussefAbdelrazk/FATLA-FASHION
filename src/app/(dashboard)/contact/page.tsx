import { ContactClient } from '@/components/contact/contact-client';

export default function ContactPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>معلومات التواصل</h1>
          <p className='text-gray-600 mt-1'>
            عرض وتعديل معلومات الاتصال وروابط وسائل التواصل الاجتماعي
          </p>
        </div>
      </div>

      {/* Contact Components */}
      <ContactClient />
    </div>
  );
}
