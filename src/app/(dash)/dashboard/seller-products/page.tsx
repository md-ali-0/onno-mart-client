import ManageSellerProductTable from "@/components/dash-tables/manage-seller-product";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function SellerProductsPage() {
    const session = await getSession();
    
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Manage Products
                    </h3>
                    {session.role === "VENDOR" && (
                        <Button asChild variant={"default"} size={"sm"}>
                            <Link href={"/dashboard/create-product"}>
                                Create Product
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="p-5">
                    <ManageSellerProductTable />
                </div>
            </div>
        </div>
    );
}
