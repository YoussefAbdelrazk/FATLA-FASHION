import { OrderReturn } from '@/types/return';

export const mockReturns: OrderReturn[] = [
  {
    id: '1',
    returnNo: 'RET-001',
    orderId: 'ORD-001',
    orderNo: 'ORD-001',
    customerName: 'أحمد محمد',
    customerMobile: '+201234567890',
    refundMethod: 'credit_card',
    returnStatus: 'pending',
    refundAmount: 250.0,
    refundDate: '2024-01-15',
    returnItems: [
      {
        id: '1',
        productId: 'PROD-001',
        productName: 'قميص قطني أزرق',
        productImage: '/images/shirt-blue.jpg',
        size: 'L',
        color: 'أزرق',
        price: 150.0,
        salePrice: 120.0,
        quantity: 1,
        sku: 'SHIRT-BLUE-L',
        returnReason: 'حجم غير مناسب',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    returnNo: 'RET-002',
    orderId: 'ORD-002',
    orderNo: 'ORD-002',
    customerName: 'فاطمة علي',
    customerMobile: '+201234567891',
    refundMethod: 'wallet',
    returnStatus: 'in_progress',
    refundAmount: 180.0,
    refundDate: '2024-01-14',
    returnItems: [
      {
        id: '2',
        productId: 'PROD-002',
        productName: 'بنطلون جينز',
        productImage: '/images/jeans.jpg',
        size: 'M',
        color: 'أزرق داكن',
        price: 200.0,
        salePrice: 180.0,
        quantity: 1,
        sku: 'JEANS-DARK-M',
        returnReason: 'عيب في الصنع',
      },
    ],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: '3',
    returnNo: 'RET-003',
    orderId: 'ORD-003',
    orderNo: 'ORD-003',
    customerName: 'محمد حسن',
    customerMobile: '+201234567892',
    refundMethod: 'credit_card',
    returnStatus: 'refunded',
    refundAmount: 320.0,
    refundDate: '2024-01-13',
    returnItems: [
      {
        id: '3',
        productId: 'PROD-003',
        productName: 'جاكيت شتوي',
        productImage: '/images/jacket.jpg',
        size: 'XL',
        color: 'أسود',
        price: 350.0,
        salePrice: 320.0,
        quantity: 1,
        sku: 'JACKET-BLACK-XL',
        returnReason: 'تغيير في الطلب',
      },
    ],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
  },
  {
    id: '4',
    returnNo: 'RET-004',
    orderId: 'ORD-004',
    orderNo: 'ORD-004',
    customerName: 'سارة أحمد',
    customerMobile: '+201234567893',
    refundMethod: 'wallet',
    returnStatus: 'rejected',
    refundAmount: 150.0,
    refundDate: '2024-01-12',
    returnItems: [
      {
        id: '4',
        productId: 'PROD-004',
        productName: 'فستان صيفي',
        productImage: '/images/dress.jpg',
        size: 'S',
        color: 'وردي',
        price: 180.0,
        salePrice: 150.0,
        quantity: 1,
        sku: 'DRESS-PINK-S',
        returnReason: 'لون مختلف عن المطلوب',
      },
    ],
    rejectReason: 'المنتج تم استخدامه ولا يمكن إرجاعه',
    createdAt: '2024-01-12T16:00:00Z',
    updatedAt: '2024-01-12T18:30:00Z',
  },
];

export const getReturns = async (): Promise<OrderReturn[]> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockReturns);
    }, 500);
  });
};

export const getReturnById = async (id: string): Promise<OrderReturn | null> => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      const returnItem = mockReturns.find(r => r.id === id);
      resolve(returnItem || null);
    }, 300);
  });
};

