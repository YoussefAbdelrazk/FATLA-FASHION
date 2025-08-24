import SlidersTable from '@/components/sliders/sliders-table';
import { createQueryClient } from '@/lib/query-client';
import { getAllSliders } from '@/services/sliders/SliderService';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function SlidersPage() {
  const queryClient = createQueryClient();

  console.log('Starting sliders prefetch...');

  // Prefetch with the exact query key structure used in useGetAllSliders
  await queryClient.prefetchQuery({
    queryKey: ['sliders', 'list', 'en'], // Match the hook's query key structure: [...sliderKeys.lists(), lang]
    queryFn: async () => {
      console.log('Fetching sliders from API...');
      const data = await getAllSliders('en');
      console.log('Raw API response:', data);

      // Transform API response to match Slider type (same as in the hook)
      return data;
    },
  });

  console.log('Sliders prefetch completed');
  const dehydratedState = dehydrate(queryClient);
  console.log('Dehydrated state:', dehydratedState);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Sliders Management</h1>
          <p className='text-muted-foreground'>
            Manage your slider content and visibility settings
          </p>
        </div>
      </div>

      <HydrationBoundary state={dehydratedState}>
        <SlidersTable />
      </HydrationBoundary>
    </div>
  );
}
