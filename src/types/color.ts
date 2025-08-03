export interface Color {
  id: string;
  arName: string;
  enName: string;
  color: string; // hex color code
  productsCount: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface ColorTableProps {
  colors: Color[];
}
