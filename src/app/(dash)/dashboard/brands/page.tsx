
import ManageBrandTable from "@/components/dash-tables/manage-brand-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrandPage() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Manage Brands
                    </h3>
                    <Button asChild variant={"default"} size={"sm"}>
                        <Link href={"/dashboard/create-brand"}>Create Brand</Link>
                    </Button>
                </div>
                <div className="p-5">
                <ManageBrandTable />
                </div>
            </div>
        </div>
    );
}
