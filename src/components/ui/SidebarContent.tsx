'use client';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';

interface SidebarContentProps {
  isExpanded: boolean;
  onLinkClick?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Support', href: '/support', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function SidebarContent({ isExpanded, onLinkClick }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col h-full bg-white dark:bg-black'>
      {/* Logo */}
      <div className='flex items-center justify-center h-14 lg:h-16 px-4 border-b border-gray-200 dark:border-gray-700'>
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
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2'>
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 lg:px-4 py-3 lg:py-3 rounded-lg transition-all duration-200 group relative',
                isActive
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white',
              )}
              onClick={onLinkClick}
              title={!isExpanded ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-200 flex-shrink-0',
                  isActive ? 'scale-110' : 'group-hover:scale-110',
                )}
              />
              {isExpanded && <span className='font-medium text-sm lg:text-base'>{item.name}</span>}
              {!isExpanded && isActive && (
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white dark:bg-black rounded-r-full'></div>
              )}
            </Link>
          );
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
