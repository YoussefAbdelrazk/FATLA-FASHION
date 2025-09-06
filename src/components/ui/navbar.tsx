'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/context/sidebar';
import { useAuthHook } from '@/hooks/useAuthHook';
import { LogOut, Menu, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { LogoutButton } from '../auth/logout-button';

export function Navbar() {
  const [notificationCount] = useState(8);
  const { openMobileSidebar } = useSidebar();
  const { logoutMutation, isLogoutPending } = useAuthHook();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-black/95 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6'>
        <div className='flex justify-between items-center h-14 lg:h-16'>
          {/* Left Section */}
          <div className='flex items-center space-x-2 lg:space-x-4'>
            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='sm'
              onClick={openMobileSidebar}
              className='lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 p-2'
            >
              <Menu className='h-5 w-5 text-gray-700 dark:text-gray-300' />
            </Button>

            {/* Brand Logo and Name */}
            <Link href='/' className='flex items-center space-x-2 lg:space-x-3 group'>
              <div className='relative'></div>
              <div className='hidden sm:block'>
                <h1 className='text-xl lg:text-2xl font-bold text-black dark:text-white'>
                  لوحة التحكم
                </h1>
              </div>
            </Link>
          </div>

          {/* Right Section - Quick Access Icons */}
          <div className='flex items-center space-x-2 lg:space-x-4'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            {/* <Button
              variant='ghost'
              size='sm'
              className='relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group p-2'
            >
              <Bell className='w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200' />
              {notificationCount > 0 && (
                <Badge className='absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white dark:border-black shadow-sm animate-pulse'>
                  {notificationCount}
                </Badge>
              )}
            </Button> */}

            {/* Admin Avatar Dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 lg:h-10 lg:w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group p-0'
                >
                  <Avatar className='h-8 w-8 lg:h-10 lg:w-10 ring-2 ring-transparent group-hover:ring-gray-200 dark:group-hover:ring-gray-700 transition-all duration-200'>
                    <AvatarImage src='/avatars/01.png' alt='Admin' />
                    <AvatarFallback className='bg-black dark:bg-white text-white dark:text-black font-semibold text-xs lg:text-sm'>
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-64 mt-2 bg-white dark:bg-black border-gray-200 dark:border-gray-700'
                align='end'
                forceMount
              >
                <DropdownMenuLabel className='font-normal p-4'>
                  <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-3'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage src='/avatars/01.png' alt='Admin' />
                        <AvatarFallback className='bg-black dark:bg-white text-white dark:text-black font-semibold'>
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-semibold leading-none text-black dark:text-white'>
                          Admin User
                        </p>
                        <p className='text-xs leading-none text-gray-500 dark:text-gray-400 mt-1'>
                          Super Administrator
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />
                <DropdownMenuItem className='p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'>
                  <User className='mr-3 h-4 w-4 text-gray-600 dark:text-gray-400' />
                  <span className='font-medium text-black dark:text-white'>Admin Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'>
                  <Settings className='mr-3 h-4 w-4 text-gray-600 dark:text-gray-400' />
                  <span className='font-medium text-black dark:text-white'>System Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />
                <DropdownMenuItem
                  className='p-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200'
                  onClick={handleLogout}
                  disabled={isLogoutPending}
                >
                  <LogOut className='mr-3 h-4 w-4 text-red-500' />
                  <span className='font-medium text-red-600 dark:text-red-400'>
                    {isLogoutPending ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
