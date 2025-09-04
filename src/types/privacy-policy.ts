export interface PrivacyPolicy {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface PrivacyPolicyFormData {
  arHtml: string;
  enHtml: string;
}

export interface PrivacyPolicyResponse {
  id: number;
  arHtml: string;
  enHtml: string;
  createdAt: string;
  updatedAt: string | null;
}
