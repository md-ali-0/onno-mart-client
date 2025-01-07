import CouponForm from "@/components/dash-form/coupon-form";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const CreateCoupon: FC = () => {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create Coupon
                    </h3>
                    <Button asChild variant={'default'} size={'sm'}>
                        <Link href={"/dashboard/coupon"}>Manage Coupons</Link>
                    </Button>
                </div>
                <div className="p-7">
                    <CouponForm />
                </div>
            </div>
        </div>
    );
}

export default CreateCoupon;