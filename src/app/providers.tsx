'use client';

import { getQueryClient } from '@/components/providers/get-query-provider';
import { SidebarProvider } from '@/context/sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}

export default function Providers({ children, messages, locale }: ProvidersProps) {
  const queryClient = getQueryClient();

  // Debug: log messages and locale
  useEffect(() => {
    console.log('Providers - Locale:', locale);
    console.log('Providers - Messages:', messages);
    console.log('Providers - Navigation messages:', (messages as Record<string, unknown>)?.navigation);
    console.log('Providers - Sidebar messages:', (messages as Record<string, unknown>)?.sidebar);
  }, [messages, locale]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
