import { Brand } from "./Brand";
import { Category } from "./Category";
import { Image } from "./Image";
import { Shop } from "./Shop";

export type Product = {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    categoryId: string;
    brandId: string;
    inventory: number;
    brand: Brand;
    images: Image[];
    category: Category;
    discount: number;
    shopId: string;
    shop: Shop;
    createdAt: Date;
    updatedAt: Date;
};
