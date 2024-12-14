import ManageShopTable from "@/components/dash-tables/manage-shops-table";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

export default function userPage(){
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        All Shops
                    </h3>
                </div>
                <div className="p-5">
                    <ManageShopTable/>
                </div>
            </div>
        </div>
    )
}