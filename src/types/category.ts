export interface Category {
  id: string;
  arName: string;
  enName: string;
  image: string;
  productsCount: number;
  createdAt: string;
  createdBy: string;
}

export interface CategoryFormData {
  arName: string;
  enName: string;
  image: string;
}

export interface CategoryTableProps {
  categories: Category[];
}
