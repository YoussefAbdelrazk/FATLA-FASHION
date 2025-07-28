export interface RestockProduct {
  name: string;
  current: number;
  min: number;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  category?: string;
  supplier?: string;
  lastRestock?: string;
}

export interface RestockProductsData {
  products: RestockProduct[];
  totalNeedingRestock: number;
}

export const restockProductsData: RestockProductsData = {
  products: [
    { name: 'Designer Handbag', current: 3, min: 10, urgency: 'High' },
    { name: 'Premium Watch', current: 5, min: 8, urgency: 'Medium' },
    { name: 'Luxury Shoes', current: 2, min: 15, urgency: 'High' },
    { name: 'Silk Scarf', current: 7, min: 12, urgency: 'Medium' },
    { name: 'Leather Wallet', current: 1, min: 10, urgency: 'Critical' },
  ],
  totalNeedingRestock: 5,
};
