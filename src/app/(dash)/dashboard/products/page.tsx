import ManageProductTable from "@/components/dash-tables/manage-product-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

export default async function ProductsPage() {

    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Manage Products
                    </h3>
                </div>
                <div className="p-5">
                    <ManageProductTable />
                </div>
            </div>
        </div>
    );
}
