import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Eye } from 'lucide-react';

export default function WelcomeHeader() {
  return (
    <div className='relative overflow-hidden rounded-3xl bg-black dark:bg-white p-8 text-white dark:text-black'>
      <div className='absolute inset-0 bg-black/5 dark:bg-white/5' />
      <div className='relative z-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>Welcome back, Admin! 👋</h1>
            <p className='text-gray-300 dark:text-gray-700 text-lg'>
              Here&apos;s what&apos;s happening with your fashion empire today.
            </p>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            <Badge
              variant='secondary'
              className='bg-white/10 dark:bg-black/10 text-white dark:text-black border-white/20 dark:border-black/20'
            >
              <Activity className='w-4 h-4 mr-2' />
              Live Dashboard
            </Badge>
            <Button
              variant='outline'
              className='border-white/30 dark:border-black/30 text-black dark:text-white'
            >
              <Eye className='w-4 h-4 mr-2' />
              View Reports
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className='absolute top-4 right-4 w-32 h-32 bg-white/10 dark:bg-black/10 rounded-full' />
      <div className='absolute bottom-4 left-4 w-24 h-24 bg-white/10 dark:bg-black/10 rounded-full' />
    </div>
  );
}
