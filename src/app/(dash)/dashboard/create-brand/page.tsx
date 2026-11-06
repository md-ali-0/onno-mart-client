import BrandForm from "@/components/dash-form/brand-form";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const CreateBrand: FC = () => {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Create New Brand
                    </h3>
                    <Button asChild variant={'default'} size={'sm'}>
                        <Link href={"/dashboard/brands"}>Manage Brands</Link>
                    </Button>
                </div>
                <div className="p-7">
                    <BrandForm />
                </div>
            </div>
        </div>
    );
}

export default CreateBrand;