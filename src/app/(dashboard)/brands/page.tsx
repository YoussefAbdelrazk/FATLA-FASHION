import BrandsTable from '@/components/brands/brands-table';
import { createQueryClient } from '@/lib/query-client';
import { BrandService } from '@/services/brands/BrandService';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function BrandsPage() {
  const queryClient = createQueryClient();

  console.log('Starting brands prefetch...');

  // Prefetch with the exact query key structure used in useGetAllBrands
  await queryClient.prefetchQuery({
    queryKey: ['brands', 'en', 1, 20], // Match the hook's query key structure
    queryFn: async () => {
      console.log('Fetching brands from API...');
      const response = await BrandService.getAllBrands('en', 1, 20);
      console.log('Raw API response:', response);

      // Transform API response to exactly match what the hook expects
      return response;
    },
  });

  console.log('Brands prefetch completed');
  const dehydratedState = dehydrate(queryClient);
  console.log('Dehydrated state:', dehydratedState);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Brands Management</h1>
          <p className='text-muted-foreground'>Manage your product brands and their content</p>
        </div>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <BrandsTable />
      </HydrationBoundary>
    </div>
  );
}
