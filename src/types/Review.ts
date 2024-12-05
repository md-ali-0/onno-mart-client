export type Review = {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
}