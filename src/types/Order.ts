import { Shop } from "./Shop";
import { User } from "./User";

export type Order = {
    id: string;
    userId: string;
    shopId: string;
    tranId: string;
    totalAmount: number;
    user: User;
    shop: Shop;
    products: OrderItem[];
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

export enum OrderStatus {
    PENDING,
    SHIPPED,
    COMPLETED,
    CANCELED
  }
  
