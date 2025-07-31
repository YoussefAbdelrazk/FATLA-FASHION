export interface Product {
  id: string;
  name: string;
  image: string;
  availableQty: number;
  price: number;
  discount: number;
  barcode: string;
  soldCount: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface ProductTableProps {
  products: Product[];
}
