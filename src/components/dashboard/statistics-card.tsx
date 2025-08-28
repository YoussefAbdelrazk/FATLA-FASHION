import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  subtitle?: string;
}

export default function StatisticsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  subtitle,
}: StatisticsCardProps) {
  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
          {title}
        </CardTitle>
        <Icon className='h-5 w-5 text-black dark:text-white' />
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-bold text-black dark:text-white'>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className='flex items-center mt-2'>
          {changeType === 'increase' ? (
            <ArrowUpRight className='w-4 h-4 text-green-500 mr-1' />
          ) : (
            <ArrowDownRight className='w-4 h-4 text-red-500 mr-1' />
          )}
          <span className='text-sm text-gray-600 dark:text-gray-400'>
            +{change}% {subtitle || 'من أمس'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
