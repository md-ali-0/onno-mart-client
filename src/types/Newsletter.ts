export type Newsletter = {
    id: string;
    isDeleted: boolean | null;
    email: string;
    firstName: string | null;
    lastName: string | null;
    subscribedAt: Date;
    unsubscribedAt: Date | null;
}