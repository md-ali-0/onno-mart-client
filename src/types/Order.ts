export type Order = {
    id: string;
    userId: string;
    shopId: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

enum OrderStatus {
    PENDING,
    SHIPPED,
    COMPLETED,
    CANCELED
  }
  
