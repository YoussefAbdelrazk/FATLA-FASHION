export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  price: number;
  salePrice: number;
  quantity: number;
  sku: string;
  isMissing: boolean;
}

export interface ClientAddress {
  government: string;
  city: string;
  area: string;
  floor: string;
  building: string;
  landmark: string;
}

export interface Order {
  id: string;
  orderNo: string;
  clientName: string;
  clientMobile: string;
  clientAddress: ClientAddress;
  orderDate: string;
  subTotal: number;
  deliveryTotal: number;
  discountTotal: number;
  couponDiscount: number;
  finalTotal: number;
  paymentMethod: 'Cash' | 'Card' | 'Online' | 'COD';
  orderStatus:
    | 'Pending'
    | 'Confirmed'
    | 'Processing'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled';
  driverName: string;
  driverMobile: string;
  codCollected: number;
  deliveryDateTime: string;
  orderItems: OrderItem[];
  totalQuantity: number;
}

export interface OrderTableProps {
  orders: Order[];
}
