export interface Slider {
  id: string;
  arName: string;
  enName: string;
  arImage: string;
  enImage: string;
  brandName: string;
  productName: string;
  categoryName: string;
  isVisible: boolean;
  createdAt: string;
  createdBy: string;
}

export interface SliderTableProps {
  sliders: Slider[];
}
