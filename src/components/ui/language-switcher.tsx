'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleLanguage}
      className='hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 p-2'
      title={`Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
    >
      <Languages className='h-4 w-4 text-gray-700 dark:text-gray-300' />
      <span className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
        {language === 'ar' ? 'AR' : 'EN'}
      </span>
    </Button>
  );
}
