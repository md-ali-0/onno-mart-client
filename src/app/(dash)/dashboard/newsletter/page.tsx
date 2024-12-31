
import ManageNewsLetterTable from "@/components/dash-tables/manage-newsletters-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";


export default function CategoryPage() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Manage NewsLetters
                    </h3>
                </div>
                <div className="p-5">
                <ManageNewsLetterTable />
                </div>
            </div>
        </div>
    );
}
