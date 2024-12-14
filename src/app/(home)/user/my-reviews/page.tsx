import MyReviews from "@/components/user/my-reviews";

export default function Page() {
    return (
        <div>
            <div className="bg-white border rounded-xl">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">My Reviews</h2>
                </div>
                <div className="p-5">
                    <MyReviews />
                </div>
            </div>
        </div>
    );
}
