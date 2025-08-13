import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false, // Don't refetch on mount if data exists
        refetchOnReconnect: false, // Don't refetch on reconnect if data exists
      },
      mutations: {
        retry: 1,
      },
    },
  });
};
