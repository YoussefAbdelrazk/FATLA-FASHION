export interface AboutUs {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface AboutUsFormData {
  arHtml: string;
  enHtml: string;
}

export interface AboutUsResponse {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}
