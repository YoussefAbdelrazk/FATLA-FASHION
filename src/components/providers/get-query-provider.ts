import { QueryClient, isServer } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
}
let broswerQueryClient: QueryClient | undefined;
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!broswerQueryClient) {
    broswerQueryClient = makeQueryClient();
  }
  return broswerQueryClient;
}
