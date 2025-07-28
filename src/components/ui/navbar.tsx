'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import {
  Bell,
  Crown,
  Heart,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const [notificationCount, setNotificationCount] = useState(8);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { openMobileSidebar } = useSidebar();

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-black/95 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6'>
        {/* Mobile Search Bar - Full Width */}
        {isMobileSearchOpen && (
          <div className='py-3 border-b border-gray-200/50 dark:border-gray-700/50 lg:hidden'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search orders, products, customers...'
                className='w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black dark:focus:ring-white/20 dark:focus:border-white transition-all duration-200 bg-white/50 dark:bg-black/50 backdrop-blur-sm dark:text-white text-sm'
                autoFocus
              />
              <Button
                variant='ghost'
                size='sm'
                className='absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-800 p-1'
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className='w-4 h-4 text-gray-500 dark:text-gray-400' />
              </Button>
            </div>
          </div>
        )}

        <div className='flex justify-between items-center h-14 lg:h-16'>
          {/* Left Section */}
          <div className='flex items-center space-x-2 lg:space-x-4'>
            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 p-2'
              onClick={openMobileSidebar}
            >
              <Menu className='h-5 w-5 text-gray-700 dark:text-gray-300' />
            </Button>

            {/* Brand Logo and Name */}
            <Link href='/' className='flex items-center space-x-2 lg:space-x-3 group'>
              <div className='relative'>
                <div className='w-8 h-8 lg:w-10 lg:h-10 bg-black dark:bg-white rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
                  <Shield className='w-4 h-4 lg:w-5 lg:h-5 text-white dark:text-black' />
                </div>
                <div className='absolute -top-0.5 -right-0.5 w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full flex items-center justify-center'>
                  <Crown className='w-1 h-1 lg:w-1.5 lg:h-1.5 text-white' />
                </div>
              </div>
              <div className='hidden sm:block'>
                <h1 className='text-lg lg:text-2xl font-bold text-black dark:text-white'>
                  FATLA Admin
                </h1>
                <p className='text-xs text-gray-500 dark:text-gray-400 -mt-0.5 font-medium hidden lg:block'>
                  Fashion Management Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section - Quick Access Icons */}
          <div className='flex items-center space-x-1 lg:space-x-2'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Orders - Hidden on very small screens */}
            <Button
              variant='ghost'
              size='sm'
              className='relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group p-2 hidden sm:flex'
            >
              <ShoppingBag className='w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200' />
              <Badge className='absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black shadow-sm'>
                12
              </Badge>
            </Button>

            {/* Products - Hidden on very small screens */}
            <Button
              variant='ghost'
              size='sm'
              className='relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group p-2 hidden sm:flex'
            >
              <Heart className='w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200' />
              <Badge className='absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black shadow-sm'>
                45
              </Badge>
            </Button>

            {/* Notifications */}
            <Button
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
            </Button>

            {/* Admin Avatar Dropdown */}
            <DropdownMenu>
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
                <DropdownMenuItem className='p-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200'>
                  <LogOut className='mr-3 h-4 w-4 text-red-500' />
                  <span className='font-medium text-red-600 dark:text-red-400'>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
