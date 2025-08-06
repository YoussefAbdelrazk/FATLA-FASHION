export interface BrandforAll {
  id: number;
  name: string;
  imageUrl: string;
  visibilityOrder: number;
  productsCount: number;
  createdAt?: string;
  createdBy?: string;
}
export interface Brand {
  id: number;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  visibilityOrder: number;
}

export interface BrandFormData {
  NameAr: string;
  NameEn: string;
  imageUrl: string;
  visibilityOrder: number;
}

export interface CreateBrandData {
  name: string;
  imageUrl?: string;
  visibilityOrder?: number;
}

export interface UpdateBrandData {
  id: number;
  name?: string;
  imageUrl?: string;
  visibilityOrder?: number;
}

export interface BrandTableProps {
  brands: Brand[];
}
