export interface TermsConditions {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface TermsConditionsFormData {
  arHtml: string;
  enHtml: string;
}

export interface TermsConditionsResponse {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}
