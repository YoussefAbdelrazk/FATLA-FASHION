export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  mainImage: string;
  price: number;
  salePrice: number;
  currentQty: number;
  bestSeller: boolean;
  todayDeals: boolean;
  sku: string;
  images: string[];
}

export interface Product {
  id: string;
  arName: string;
  enName: string;
  mainImage: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  brand: string;
  gender: 'male' | 'female' | 'unisex';
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface ProductTableProps {
  products: Product[];
}

export interface ProductFormData {
  arName: string;
  enName: string;
  mainImage: File | null;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  brand: string;
  gender: 'male' | 'female' | 'unisex';
  variants: ProductVariant[];
}
