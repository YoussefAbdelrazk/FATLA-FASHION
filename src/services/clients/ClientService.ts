import { callAPI } from '@/lib/config';
import { Client, ClientsResponse } from '@/types/client';

// Get all clients with pagination
export const getAllClients = async (
  page: number = 1,
  pageSize: number = 20,
  lang: string = 'ar',
): Promise<ClientsResponse> => {
  return callAPI('get', `/api/${lang}/AdminClients/GetAllClients`, {
    params: { page, pageCount: pageSize },
  });
};

// Get single client by ID
export const getClientById = async (id: number, lang: string = 'ar'): Promise<Client> => {
  return callAPI('get', `/api/${lang}/AdminClients/GetClientById/${id}`);
};

// Block client
export const blockClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  return callAPI('put', `/api/${lang}/AdminClients/BlockClient/${id}`);
};

// Unblock client
export const unblockClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  return callAPI('put', `/api/${lang}/AdminClients/UnblockClient/${id}`);
};

// Delete client
export const deleteClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  return callAPI('delete', `/api/${lang}/AdminClients/DeleteClient/${id}`);
};
