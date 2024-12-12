import { Shop } from "./Shop";

export type Vendor = {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    role: Role;
    shop: Shop;
    createdAt: Date;
    updatedAt: Date;
};

enum Role {
    ADMIN,
    VENDOR,
    USER,
}
