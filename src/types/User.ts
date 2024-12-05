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
    role: Role;
    createdAt: Date;
    updatedAt: Date;
};

enum Role {
    ADMIN,
    VENDOR,
    USER,
}
