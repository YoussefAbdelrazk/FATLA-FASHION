import {
  blockClient,
  deleteClient,
  getAllClients,
  getClientById,
  unblockClient,
} from '@/services/clients/ClientService';
import { Client, ClientsResponse } from '@/types/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define error type for API responses
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Query keys
export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (lang: string, page: number, pageSize: number) =>
    [...clientKeys.lists(), { lang, page, pageSize }] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: number, lang: string) => [...clientKeys.details(), id, lang] as const,
};

// Get all clients with pagination
export const useGetAllClients = (lang: string = 'ar', page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: clientKeys.list(lang, page, pageSize),
    queryFn: async (): Promise<ClientsResponse> => {
      const response = await getAllClients(page, pageSize, lang);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single client by ID
export const useGetClientById = (id: number, lang: string = 'ar') => {
  return useQuery({
    queryKey: clientKeys.detail(id, lang),
    queryFn: async (): Promise<Client> => {
      const response = await getClientById(id, lang);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Block client
export const useBlockClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, lang = 'ar' }: { id: number; lang?: string }) => {
      const response = await blockClient(id, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      toast.success('Client blocked successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to block client');
    },
  });
};

// Unblock client
export const useUnblockClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, lang = 'ar' }: { id: number; lang?: string }) => {
      const response = await unblockClient(id, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      toast.success('Client unblocked successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to unblock client');
    },
  });
};

// Delete client
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, lang = 'ar' }: { id: number; lang?: string }) => {
      const response = await deleteClient(id, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      toast.success('Client deleted successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to delete client');
    },
  });
};
