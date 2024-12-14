import { Product } from "./Product";
import { User } from "./User";

export type Review = {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    user: User;
    product: Product
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
}