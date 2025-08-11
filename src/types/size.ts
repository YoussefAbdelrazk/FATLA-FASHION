export interface Size {
  id: string;
  arName: string;
  enName: string;
  productsCount: number;
  createdAt: string;
  createdBy: string;
}

export interface SizeFormData {
  arName: string;
  enName: string;
}

export interface SizeTableProps {
  sizes: Size[];
}
