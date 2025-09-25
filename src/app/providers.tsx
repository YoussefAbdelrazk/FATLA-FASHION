'use client';

import { getQueryClient } from '@/components/providers/get-query-provider';
import { LanguageProvider } from '@/context/language';
import { SidebarProvider } from '@/context/sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
        <LanguageProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
