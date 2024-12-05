export type Product = {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    categoryId: string;
    inventory: number;
    discount: number;
    shopId: string;
    createdAt: Date;
    updatedAt: Date;
}