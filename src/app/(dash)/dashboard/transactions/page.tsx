
import ManageTransectionsTable from "@/components/dash-tables/manage-transection-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";


export default function TransectionsPage() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Manage Transactions
                    </h3>
                </div>
                <div className="p-5">
                <ManageTransectionsTable />
                </div>
            </div>
        </div>
    );
}
