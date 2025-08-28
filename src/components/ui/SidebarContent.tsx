'use client';

import { cn } from '@/lib/utils';
import {
  Bell,
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
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from './button';

interface SidebarContentProps {
  isExpanded: boolean;
  onLinkClick?: () => void;
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
  { name: 'الرئيسية', href: '/', icon: Home },
  {
    name: 'الطلبات',
    icon: ShoppingBag,
    children: [
      { name: 'جميع الطلبات', href: '/orders', count: 10 },
      { name: 'قيد الانتظار', href: '/orders/pending', count: 1 },
      { name: 'مكتملة', href: '/orders/done', count: 4 },
      { name: 'ملغية', href: '/orders/cancelled', count: 300 },
    ],
  },
  { name: 'العملاء', href: '/clients', icon: Users },
  { name: 'السلايدرز', href: '/sliders', icon: Image },
  { name: 'الإشعارات', href: '/notifications', icon: Bell },

  {
    name: 'المنتجات',
    icon: Package,
    children: [
      { name: 'قائمة المنتجات', href: '/products' },
      { name: 'الفئات', href: '/categories' },
      { name: 'العلامات التجارية', href: '/brands' },
      { name: 'المقاسات', href: '/sizes' },
      { name: 'الألوان', href: '/colors' },
    ],
  },
];

export default function SidebarContent({ isExpanded, onLinkClick }: SidebarContentProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['الطلبات', 'المنتجات']);

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
            <span className='text-lg lg:text-xl font-bold text-black dark:text-white'>FATLA</span>
          </div>
        ) : (
          <div className='w-8 h-8 lg:w-10 lg:h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center'>
            <Shield className='w-4 h-4 lg:w-5 lg:h-5 text-white dark:text-black' />
          </div>
        )}

        {/* Close button for mobile */}
        {isExpanded && onLinkClick && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onLinkClick}
            className='lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 p-2'
          >
            <X className='h-5 w-5 text-gray-700 dark:text-gray-300' />
          </Button>
        )}
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
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-200 flex-shrink-0',
                      isActive ? 'scale-110' : 'group-hover:scale-110',
                    )}
                  />
                  {isExpanded && (
                    <span className='font-medium text-sm lg:text-base'>{item.name}</span>
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
                  >
                    <div className='flex items-center space-x-3'>
                      <item.icon
                        className={cn(
                          'w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-200 flex-shrink-0',
                          hasActiveChild ? 'scale-110' : 'group-hover:scale-110',
                        )}
                      />
                      {isExpanded && (
                        <span className='font-medium text-sm lg:text-base'>{item.name}</span>
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

                  {/* Modern Tooltip for collapsed sidebar */}
                  {/* {!isExpanded && (
                    <div className='absolute left-full ml-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap'>
                      {item.name}
                      <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rotate-45'></div>
                    </div>
                  )} */}
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
                        >
                          <div className='flex items-center space-x-3'>
                            {child.name === 'جميع الطلبات' && <ShoppingBag className='w-4 h-4' />}
                            {child.name === 'قائمة المنتجات' && <List className='w-4 h-4' />}
                            {child.name === 'منتج جديد' && <Plus className='w-4 h-4' />}
                            {child.name === 'الفئات' && <Tag className='w-4 h-4' />}
                            {child.name === 'المقاسات' && <Tag className='w-4 h-4' />}
                            {child.name === 'الألوان' && <Palette className='w-4 h-4' />}
                            {child.name === 'العلامات التجارية' && <Building className='w-4 h-4' />}
                            <span className='font-medium'>{child.name}</span>
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
        >
          <LogOut className={cn('w-5 h-5 flex-shrink-0', isExpanded ? 'mr-3' : '')} />
          {isExpanded && 'Logout'}
        </Button>
      </div>
    </div>
  );
}
