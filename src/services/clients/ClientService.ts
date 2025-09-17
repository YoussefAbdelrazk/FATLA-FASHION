import baseAPI from '@/lib/config';
import { Client, ClientsResponse } from '@/types/client';

// Get all clients with pagination
export const getAllClients = async (
  page: number = 1,
  pageSize: number = 20,
  lang: string = 'ar',
): Promise<ClientsResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/AdminClients/GetAllClients`, {
      params: { page, pageCount: pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

// Get single client by ID
export const getClientById = async (id: number, lang: string = 'ar'): Promise<Client> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/AdminClients/GetClientById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

// Block client
export const blockClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  try {
    const api = await baseAPI();
    await api.put(`/api/${lang}/AdminClients/BlockClient/${id}`);
  } catch (error) {
    console.error('Error blocking client:', error);
    throw error;
  }
};

// Unblock client
export const unblockClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  try {
    const api = await baseAPI();
    await api.put(`/api/${lang}/AdminClients/UnblockClient/${id}`);
  } catch (error) {
    console.error('Error unblocking client:', error);
    throw error;
  }
};

// Delete client
export const deleteClient = async (id: number, lang: string = 'ar'): Promise<void> => {
  try {
    const api = await baseAPI();
    await api.delete(`/api/${lang}/AdminClients/DeleteClient/${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
