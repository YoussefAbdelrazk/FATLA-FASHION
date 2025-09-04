export interface ReturnItem {
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
  returnReason: string;
}

export interface OrderReturn {
  id: string;
  returnNo: string;
  orderId: string;
  orderNo: string;
  customerName: string;
  customerMobile: string;
  refundMethod: 'credit_card' | 'wallet';
  returnStatus: 'pending' | 'in_progress' | 'refunded' | 'rejected';
  refundAmount: number;
  refundDate: string;
  returnItems: ReturnItem[];
  rejectReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnTableProps {
  returns: OrderReturn[];
}

export interface ReturnReason {
  id: string;
  arReason: string;
  enReason: string;
  createdBy: string;
  createdAt: string;
  isVisible: boolean;
  visibilityOrder: number;
}

export interface ReturnReasonTableProps {
  returnReasons: ReturnReason[];
}
