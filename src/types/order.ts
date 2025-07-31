export interface Order {
  id: string;
  orderNo: string;
  clientName: string;
  clientMobile: string;
  orderDate: string;
  subTotal: number;
  deliveryTotal: number;
  discountTotal: number;
  finalTotal: number;
  paymentMethod: 'Cash' | 'Card' | 'Online' | 'COD';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  driverName: string;
  driverMobile: string;
  codCollected: number;
  deliveryDateTime: string;
}

export interface OrderTableProps {
  orders: Order[];
}
