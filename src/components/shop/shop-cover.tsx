"use client";

import { useSession } from "@/provider/session-provider";
import { useGetSingleShopQuery } from "@/redux/features/shop/shopApi";
import {
    useFollowShopMutation,
    useGetMeQuery,
    useUnfollowShopMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function ShopCover({ id }: { id: string }) {
    const { data, isLoading } = useGetSingleShopQuery({ id });
    const { data: user, isLoading: isLoadingMe } = useGetMeQuery(undefined);
    const {session} = useSession()

    const [followShop, { isLoading: isFollowing }] = useFollowShopMutation();
    const [unfollowShop, { isLoading: isUnfollowing }] =
        useUnfollowShopMutation();

    const isShopFollowed = user?.followedShops?.some((s) => s.id === id);

    const handleFollowUnfollow = async () => {
        if (!session?.isAuth) {
           toast.warning("You are not LoggedIn") 
        }
        if (isShopFollowed) {
            await unfollowShop(id);
        } else {
            await followShop(id);
        }
    };
    
    if (isLoading) {
        <div className="relative rounded-xl my-8">
            <Skeleton className="w-full h-48 rounded-xl" />

            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48 mt-2" />
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="text-right mr-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-32 mt-2" />
                    </div>
                    <Skeleton className="h-10 w-20 rounded" />
                </div>
            </div>
        </div>;
    }

    return (
        <div className="relative rounded-xl my-8">
            <Image
                alt={data?.data?.name}
                className="w-full h-48 object-cover rounded-xl"
                height="300"
                src={data?.data?.logoUrl}
                width="1200"
            />
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Image
                        alt="Tech Scope logo"
                        className="w-12 h-12 rounded-full"
                        height="50"
                        src={data?.data?.logoUrl}
                        width="50"
                    />
                    <div className="ml-4">
                        <h1 className="text-xl font-bold">
                            {data?.data?.name}
                        </h1>
                        <p className="text-gray-600">
                            {data?.data?.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-right mr-4">
                        <p className="text-gray-600">Products</p>
                        <p className="text-lg font-semibold">
                            {data?.data?.products.length}
                        </p>
                    </div>
                    {isLoadingMe ? (
                        <div className="flex space-x-2">
                            <Skeleton className="bg-gray-400 h-10 w-24 rounded" />
                            <Skeleton className="bg-gray-400 h-10 w-32 rounded" />
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleFollowUnfollow}
                                disabled={isFollowing || isUnfollowing}
                                className={`px-4 py-2 rounded ${
                                    isShopFollowed
                                        ? "bg-gray-800 text-white"
                                        : "bg-primary text-white"
                                }`}
                            >
                                {isShopFollowed
                                    ? isUnfollowing
                                        ? "Unfollowing..."
                                        : "Unfollow"
                                    : isFollowing
                                    ? "Following..."
                                    : "Follow"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
