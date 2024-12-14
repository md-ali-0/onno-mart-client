import { Order } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

export type Shop = {
    id: string;
    name: string;
    logoUrl: string | null;
    description: string | null;
    vendorId: string;
    products:    Product[]
    orders:      Order[]
    followers:   User[]  
    status: ShopStatus;
    createdAt: Date;
    updatedAt: Date;
};

export enum ShopStatus {
    ACTIVE,
    BLOCKED,
}
