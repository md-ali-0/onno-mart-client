import RecentProducts from "@/components/user/recent-products";

export default function DashboardPage() {
    return (
        <div>
            <div className="rounded-xl border bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                    My Orders
                    </h3>
                </div>
                <div className="p-5">
                    <RecentProducts/>
                </div>
            </div>
        </div>
    );
}
