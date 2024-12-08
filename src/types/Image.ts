import { Product } from "./Product";

export type Image = {
    url: string;
    productId: string;
    product: Product
    createdAt: Date;
    updatedAt: Date;
};
