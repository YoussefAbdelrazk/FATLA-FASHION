export interface FAQ {
  id: number;
  question: string;
  answear: string;
  questionAr?: string;
  questionEn?: string;
  answearAr?: string;
  answearEn?: string;
  createdAt: string;
}

export interface FAQDetail {
  id: number;
  answearAr: string;
  answearEn: string;
  questionAr: string;
  questionEn: string;
  createdAt: string;
}

export interface CreateFAQRequest {
  questionAr: string;
  questionEn: string;
  answearAr: string;
  answearEn: string;
}

export interface UpdateFAQRequest {
  questionAr: string;
  questionEn: string;
  answearAr: string;
  answearEn: string;
}
