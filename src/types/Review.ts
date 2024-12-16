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
    replies: ReviewReply[] | []
    createdAt: Date;
    updatedAt: Date;
}

export type ReviewReply = {
    id: string;
    isDeleted: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    reviewId: string;
    userId: string;
    user: User
    comment: string | null;
}