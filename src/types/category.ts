export interface Category {
  id: string;
  arName: string;
  enName: string;
  image: string;
  productsCount: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface CategoryTableProps {
  categories: Category[];
}
