import FavoriteShops from "@/components/user/favorite-shops";

export default function Page() {
    return (
        <div>
            <div className="bg-white border rounded-xl">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">My Favorite Shops</h2>
                </div>
                <div className="p-5">
                    <FavoriteShops />
                </div>
            </div>
        </div>
    );
}
