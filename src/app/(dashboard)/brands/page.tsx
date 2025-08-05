import BrandsTable from '@/components/brands/brands-table';

export default function BrandsPage() {
  return (
    <div className='w-full h-full'>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-black'>Brands</h1>
        <p className='text-gray-600 dark:text-gray-400'>Manage your fashion store brands</p>
      </div>
      <div className='w-full h-full'>
        <BrandsTable />
      </div>
    </div>
  );
}
