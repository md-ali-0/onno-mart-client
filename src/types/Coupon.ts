export type Coupon = {
    id: string;
    description: string | null;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    type: CouponType;
    startDate: Date | null;
    endDate: Date | null;
    isActive: boolean;
};

export enum CouponType {
    PERCENTAGE,
    FIXED_AMOUNT,
}
