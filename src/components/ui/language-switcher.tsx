'use client';

import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function LanguageSwitcher({
  variant = 'default',
  className,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [currentLocale, setCurrentLocale] = useState<string>('en');

  // Extract locale from pathname
  const getLocaleFromPath = (path: string) => {
    const segments = path.split('/');
    const locale = segments[1];
    return ['en', 'ar'].includes(locale) ? locale : 'en';
  };

  const locale = getLocaleFromPath(pathname);

  // Initialize currentLocale from localStorage or pathname
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && ['en', 'ar'].includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    } else {
      setCurrentLocale(locale);
    }
  }, [locale]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const switchLanguage = (newLocale: string) => {
    console.log('Switching to locale:', newLocale);
    console.log('Current pathname:', pathname);

    // Save preferred locale to localStorage
    localStorage.setItem('preferred-locale', newLocale);
    setCurrentLocale(newLocale);

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    console.log('New path:', newPath);
    router.push(newPath);
  };

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={cn('h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800', className)}
          >
            <Globe className='h-4 w-4' />
            <span className='sr-only'>{t('selectLanguage')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-40'>
          {languages.map(language => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={cn(
                'cursor-pointer',
                currentLocale === language.code && 'bg-gray-100 dark:bg-gray-800',
              )}
            >
              <span className='mr-2'>{language.flag}</span>
              <span className={currentLocale === language.code ? 'font-medium' : ''}>
                {language.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'flex items-center space-x-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
            className,
          )}
        >
          <Globe className='h-4 w-4' />
          <span className='hidden sm:inline-block'>
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <span className='sm:hidden'>{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <div className='px-2 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400'>
          {t('chooseLanguage')}
        </div>
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={cn(
              'cursor-pointer flex items-center space-x-3',
              currentLocale === language.code && 'bg-gray-100 dark:bg-gray-800',
            )}
          >
            <span className='text-lg'>{language.flag}</span>
            <div className='flex flex-col'>
              <span className={currentLocale === language.code ? 'font-medium' : ''}>
                {language.name}
              </span>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {language.code.toUpperCase()}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
