export interface Color {
  id: number;
  nameAr: string;
  nameEn: string;
  colorCode: string;
  isDeleted: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string | null;
  createdByNavigation: unknown | null;
  productImages: unknown[];
  productVariants: unknown[];
}

export interface CreateColorRequest {
  nameAr: string;
  nameEn: string;
  colorCode: string;
}

export interface UpdateColorRequest {
  nameAr: string;
  nameEn: string;
  colorCode: string;
}
