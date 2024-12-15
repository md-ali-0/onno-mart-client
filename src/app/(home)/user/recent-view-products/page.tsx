import RecentViewProducts from "@/components/user/recent-view-products";

export default function Page() {
    return (
        <div>
            <div className="bg-white border rounded-xl">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">My Recent View Products</h2>
                </div>
                <div className="p-5">
                    <RecentViewProducts />
                </div>
            </div>
        </div>
    );
}
