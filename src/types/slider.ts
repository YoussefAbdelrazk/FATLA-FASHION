export interface Slider {
  brandId: number | null;
  nameAr: string;
  nameEn: string;
  imageUrlAr: string;
  imageUrlEn: string;
  categoryId: number | null;
  variantId: number | null;
  createdBy: string;
  id: number;
  brandName: string | null;
  categoryName: string | null;
  variantName: string | null;
  isVisible?: boolean;
  createdAt?: string;
}

export interface SliderTableProps {
  sliders: Slider[];
}
