import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import '../globals.css';
import Providers from '../providers';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FATLA - Fashion Management Platform',
  description:
    'Fashion e-commerce platform for managing products, orders, customers, and analytics.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
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
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          locale === 'ar' ? 'rtl' : 'ltr'
        }`}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
