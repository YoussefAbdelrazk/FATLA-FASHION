export interface TopProduct {
  name: string;
  sales: number;
  revenue: string;
  growth: string;
  category?: string;
  image?: string;
}

export interface TopProductsData {
  products: TopProduct[];
  period: string;
}

export const topProductsData: TopProductsData = {
  products: [
    { name: 'Designer Handbag', sales: 234, revenue: '23,400', growth: '+12%' },
    { name: 'Premium Watch', sales: 189, revenue: '18,900', growth: '+8%' },
    { name: 'Luxury Shoes', sales: 156, revenue: '15,600', growth: '+15%' },
    { name: 'Silk Scarf', sales: 123, revenue: '12,300', growth: '+5%' },
    { name: 'Leather Wallet', sales: 98, revenue: '9,800', growth: '+18%' },
    { name: 'Gold Necklace', sales: 87, revenue: '8,700', growth: '+22%' },
    { name: 'Diamond Ring', sales: 76, revenue: '7,600', growth: '+9%' },
    { name: 'Silver Bracelet', sales: 65, revenue: '6,500', growth: '+14%' },
    { name: 'Pearl Earrings', sales: 54, revenue: '5,400', growth: '+7%' },
    { name: 'Crystal Pendant', sales: 43, revenue: '4,300', growth: '+11%' },
  ],
  period: 'All time',
};
