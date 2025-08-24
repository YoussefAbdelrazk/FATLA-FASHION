'use client';

import { cn } from '@/lib/utils';
import {
  Building,
  ChevronDown,
  Home,
  Image,
  List,
  LogOut,
  LucideIcon,
  Package,
  Palette,
  Plus,
  Shield,
  ShoppingBag,
  Tag,
  Users,
  X
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './button';
import LanguageSwitcher from './language-switcher';

interface SidebarContentProps {
  isExpanded: boolean;
  onLinkClick?: () => void;
  t: ReturnType<typeof useTranslations>;
}

interface NavigationChild {
  name: string;
  href: string;
  count?: number;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavigationGroup {
  name: string;
  icon: LucideIcon;
  children: NavigationChild[];
}

type NavigationItemType = NavigationItem | NavigationGroup;

const navigation: NavigationItemType[] = [
  { name: 'home', href: '/', icon: Home },
  {
    name: 'orders',
    icon: ShoppingBag,
    children: [
      { name: 'allOrders', href: '/orders', count: 10 },
      { name: 'pending', href: '/orders/pending', count: 1 },
      { name: 'done', href: '/orders/done', count: 4 },
      { name: 'cancelled', href: '/orders/cancelled', count: 300 },
    ],
  },
  { name: 'clients', href: '/clients', icon: Users },
  { name: 'sliders', href: '/sliders', icon: Image },

  {
    name: 'products',
    icon: Package,
    children: [
      { name: 'productsList', href: '/products' },
      { name: 'categories', href: '/categories' },
      { name: 'brands', href: '/brands' },
      { name: 'sizes', href: '/sizes' },
      { name: 'colors', href: '/colors' },
    ],
  },
];

export default function SidebarContent({ isExpanded, onLinkClick, t }: SidebarContentProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['orders', 'products']);
  const sidebarT = useTranslations('sidebar');



  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName) ? prev.filter(item => item !== itemName) : [...prev, itemName],
    );
  };

  const isActive = (href: string) => pathname === href;

  const isNavigationItem = (item: NavigationItemType): item is NavigationItem => {
    return 'href' in item;
  };

  const isNavigationGroup = (item: NavigationItemType): item is NavigationGroup => {
    return 'children' in item;
  };

  return (
    <div className='flex flex-col h-full bg-white dark:bg-black'>
      {/* Logo */}
      <div className='flex items-center justify-between h-14 lg:h-16 px-4 border-b border-gray-200 dark:border-gray-700'>
        {isExpanded ? (
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 lg:w-10 lg:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center'>
              <Shield className='w-4 h-4 lg:w-5 lg:h-5 text-white dark:text-black' />
            </div>
            <div className='flex flex-col'>
              <span className='text-lg lg:text-xl font-bold text-black dark:text-white'>
                {sidebarT('brandName')}
              </span>
              <span className='text-xs text-gray-500 dark:text-gray-400 hidden lg:block'>
                {sidebarT('brandDescription')}
              </span>
            </div>
          </div>
        ) : (
          <div className='w-8 h-8 lg:w-10 lg:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center'>
            <Shield className='w-4 h-4 lg:w-5 lg:h-5 text-white dark:text-black' />
          </div>
        )}

        {/* Language Switcher and Close button */}
        <div className='flex items-center space-x-2'>
          {isExpanded && <LanguageSwitcher variant='compact' />}
          {isExpanded && onLinkClick && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onLinkClick}
              className='lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 p-2'
              title={sidebarT('closeSidebar')}
            >
              <X className='h-5 w-5 text-gray-700 dark:text-gray-300' />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2 overflow-y-auto'>
        {navigation.map(item => {
          if (isNavigationItem(item)) {
            // Simple navigation item
            const isActive = pathname === item.href;
            return (
              <div key={item.name} className='relative group'>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 lg:px-4 py-3 lg:py-3 rounded-lg transition-all duration-200 group relative',
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                      : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white',
                  )}
                  onClick={onLinkClick}
                  title={t(item.name)}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-200 flex-shrink-0',
                      isActive ? 'scale-110' : 'group-hover:scale-110',
                    )}
                  />
                  {isExpanded && (
                    <span className='font-medium text-sm lg:text-base'>{t(item.name)}</span>
                  )}
                  {!isExpanded && isActive && (
                    <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white dark:bg-black rounded-r-full'></div>
                  )}
                </Link>
              </div>
            );
          } else if (isNavigationGroup(item)) {
            // Nested navigation item
            const isExpanded = expandedItems.includes(item.name);
            const hasActiveChild = item.children?.some(child => isActive(child.href));

            return (
              <div key={item.name}>
                <div className='relative group'>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 lg:px-4 py-3 lg:py-3 rounded-lg transition-all duration-200 group relative',
                      hasActiveChild
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                        : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white',
                    )}
                    title={isExpanded ? sidebarT('collapseSidebar') : sidebarT('expandSidebar')}
                  >
                    <div className='flex items-center space-x-3'>
                      <item.icon
                        className={cn(
                          'w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-200 flex-shrink-0',
                          hasActiveChild ? 'scale-110' : 'group-hover:scale-110',
                        )}
                      />
                      {isExpanded && (
                        <span className='font-medium text-sm lg:text-base'>{t(item.name)}</span>
                      )}
                    </div>
                    {isExpanded && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          !isExpanded && 'rotate-180',
                        )}
                      />
                    )}
                    {!isExpanded && hasActiveChild && (
                      <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white dark:bg-black rounded-r-full'></div>
                    )}
                  </button>
                </div>

                {/* Nested items */}
                {isExpanded && item.children && (
                  <div className='ml-4 mt-1 space-y-1'>
                    {item.children.map(child => {
                      const isChildActive = isActive(child.href);
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'flex items-center justify-between px-3 lg:px-4 py-2 lg:py-2 rounded-lg transition-all duration-200 group relative text-sm',
                            isChildActive
                              ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                              : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white',
                          )}
                          onClick={onLinkClick}
                          title={t(child.name)}
                        >
                          <div className='flex items-center space-x-3'>
                            {child.name === 'allOrders' && <ShoppingBag className='w-4 h-4' />}
                            {child.name === 'productsList' && <List className='w-4 h-4' />}
                            {child.name === 'newProduct' && <Plus className='w-4 h-4' />}
                            {child.name === 'categories' && <Tag className='w-4 h-4' />}
                            {child.name === 'sizes' && <Tag className='w-4 h-4' />}
                            {child.name === 'colors' && <Palette className='w-4 h-4' />}
                            {child.name === 'brands' && <Building className='w-4 h-4' />}
                            <span className='font-medium'>{t(child.name)}</span>
                          </div>
                          {child.count && (
                            <span className='bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-full text-xs font-medium'>
                              {child.count}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </nav>

      {/* Bottom section */}
      <div className='p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700'>
        <Button
          variant='ghost'
          className={cn(
            'w-full justify-start text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm lg:text-base',
            !isExpanded && 'justify-center',
          )}
          title={t('logout')}
        >
          <LogOut className={cn('w-5 h-5 flex-shrink-0', isExpanded ? 'mr-3' : '')} />
          {isExpanded && t('logout')}
        </Button>
      </div>
    </div>
  );
}
