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
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
};

export enum UserStatus {
    ACTIVE,
    SUSPEND,
}

enum Role {
    ADMIN,
    VENDOR,
    USER,
}
