import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        <p className='text-gray-600 mb-8'>
          {locale === 'ar'
            ? 'الصفحة التي تبحث عنها غير موجودة.'
            : 'The page you are looking for does not exist.'}
        </p>
        <Link
          href={`/${locale}`}
          className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
        >
          {locale === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
        </Link>
      </div>
    </div>
  );
}
