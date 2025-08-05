import { Navbar } from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import Providers from '../providers';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className='flex h-screen bg-gray-50'>
        <Sidebar />
        <div className='flex-1 flex flex-col min-w-0'>
          <Navbar />
          <main className='flex-1 overflow-x-hidden overflow-y-auto p-2 lg:p-4'>{children}</main>
        </div>
      </div>
      <Toaster />
    </Providers>
  );
}
