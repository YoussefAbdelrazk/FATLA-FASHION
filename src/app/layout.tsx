import { Navbar } from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FATLA Admin - Fashion Management Dashboard',
  description:
    'Admin panel for FATLA fashion e-commerce platform. Manage products, orders, customers, and analytics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className='flex h-screen bg-gray-50'>
            <Sidebar />
            <div className='flex-1 flex flex-col min-w-0'>
              <Navbar />
              <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6 pt-4'>
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
