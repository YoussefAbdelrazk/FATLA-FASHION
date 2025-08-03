import ColorsTable from '@/components/colors/colors-table';
import { colors } from '@/data/colors';

export default function ColorsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Colors</h1>
        <p className='text-muted-foreground'>
          Manage your product colors, organize inventory, and control visibility.
        </p>
      </div>
      <ColorsTable colors={colors} />
    </div>
  );
}
