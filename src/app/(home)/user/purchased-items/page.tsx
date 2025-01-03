import PurchasedItems from "@/components/user/purchased-items";

export default function Page() {
    return (
        <div>
            <div className="bg-white border rounded-xl">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">My Purchased</h2>
                </div>
                <div className="p-5">
                    <PurchasedItems />
                </div>
            </div>
        </div>
    );
}
