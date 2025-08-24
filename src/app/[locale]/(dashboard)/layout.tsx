import Providers from '@/app/providers';
import { Navbar } from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;

  // Import messages directly
  let messages;
  try {
    if (locale === 'ar') {
      messages = (await import('@/i18n/messages/ar.json')).default;
    } else {
      messages = (await import('@/i18n/messages/en.json')).default;
    }
  } catch (error) {
    console.error('Error loading messages:', error);
    messages = {};
  }

  return (
    <Providers messages={messages} locale={locale}>
      <div className={`flex h-screen bg-gray-50 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
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
