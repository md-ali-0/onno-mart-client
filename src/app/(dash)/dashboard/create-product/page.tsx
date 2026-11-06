import CreateProductForm from "@/components/dash-form/product-form";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateProduct() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Create Product
                    </h3>
                    <Button asChild variant={"default"} size={"sm"}>
                        <Link href={"/dashboard/seller-products"}>
                            Manage Products
                        </Link>
                    </Button>
                </div>
                <div className="p-7">
                    <CreateProductForm />
                </div>
            </div>
        </div>
    );
}
