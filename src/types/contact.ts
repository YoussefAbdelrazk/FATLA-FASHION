export interface ContactInfo {
  id: number;
  email: string;
  hotline: string;
  whatsapp: string;
  mobile1: string;
  mobile2?: string;
  latitude: number;
  longitude: number;
  address: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  snapchat?: string;
  linkedin?: string;
  x?: string;
  telegram?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactInfo;
}

export interface ContactListResponse {
  success: boolean;
  message: string;
  data?: ContactInfo[];
  total?: number;
  page?: number;
  limit?: number;
}
