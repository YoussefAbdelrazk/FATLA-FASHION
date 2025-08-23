import { Order } from '@/types/order';

export class OrderService {
  static async getOrderById(id: string): Promise<Order> {
    try {
      // TODO: Replace with actual API call
      // const response = await baseAPI.get(`/orders/${id}`);
      // return response.data;

      // Mock data for now
      return {
        id: '1',
        orderNo: 'ORD-2024-001',
        clientName: 'Ahmed Hassan',
        clientMobile: '+20 123 456 7890',
        clientAddress: {
          government: 'Cairo',
          city: 'New Cairo',
          area: 'First Settlement',
          floor: '3rd Floor',
          building: 'Building A',
          landmark: 'Near City Center Mall',
        },
        orderDate: '2024-01-15T10:30:00Z',
        subTotal: 299.99,
        deliveryTotal: 25.0,
        discountTotal: 30.0,
        couponDiscount: 15.0,
        finalTotal: 279.99,
        paymentMethod: 'COD',
        orderStatus: 'Confirmed',
        driverName: 'Mohammed Ali',
        driverMobile: '+20 987 654 3210',
        codCollected: 0.0,
        deliveryDateTime: '2024-01-16T14:30:00Z',
        totalQuantity: 3,
        orderItems: [
          {
            id: 'item-1',
            productId: 'prod-1',
            productName: 'Classic White T-Shirt',
            productImage: '/api/placeholder/80/80',
            size: 'L',
            color: 'White',
            price: 49.99,
            salePrice: 39.99,
            quantity: 2,
            sku: 'TSH-WHT-L-001',
            isMissing: false,
          },
          {
            id: 'item-2',
            productId: 'prod-2',
            productName: 'Denim Jeans',
            productImage: '/api/placeholder/80/80',
            size: '32',
            color: 'Blue',
            price: 89.99,
            salePrice: 79.99,
            quantity: 1,
            sku: 'JNS-BLU-32-001',
            isMissing: false,
          },
        ],
      };
    } catch (error) {
      throw new Error('Failed to fetch order');
    }
  }

  static async updateOrderStatus(id: string, status: Order['orderStatus']): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // await baseAPI.patch(`/orders/${id}/status`, { status });
      console.log('Updating order status to:', status);
    } catch (error) {
      throw new Error('Failed to update order status');
    }
  }

  static async cancelOrder(id: string): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // await baseAPI.patch(`/orders/${id}/cancel`);
      console.log('Cancelling order:', id);
    } catch (error) {
      throw new Error('Failed to cancel order');
    }
  }

  static async toggleItemMissing(orderId: string, itemId: string): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // await baseAPI.patch(`/orders/${orderId}/items/${itemId}/missing`);
      console.log('Toggling missing status for item:', itemId);
    } catch (error) {
      throw new Error('Failed to toggle item missing status');
    }
  }
}
