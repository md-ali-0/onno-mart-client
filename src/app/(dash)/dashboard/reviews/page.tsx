
import ManageReviewsTable from "@/components/dash-tables/manage-reviews-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

export default function ReviewsPage() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Manage Reviews
                    </h3>
                    {/* <Button asChild variant={"default"} size={"sm"}>
                        <Link href={"/dashboard/create-brand"}>Create Brand</Link>
                    </Button> */}
                </div>
                <div className="p-5">
                <ManageReviewsTable />
                </div>
            </div>
        </div>
    );
}
