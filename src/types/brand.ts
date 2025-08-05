export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  visibilityOrder: number;
  productsCount: number;
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
