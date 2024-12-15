"use client";

import { useSession } from "@/provider/session-provider";
import {
    useFollowShopMutation,
    useGetMeQuery,
    useUnfollowShopMutation,
} from "@/redux/features/user/userApi";
import { Shop } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function ShopCard({ shop }: { shop: Shop }) {
    const { data: user, isLoading } = useGetMeQuery(undefined);
    const { session } = useSession();

    const [followShop, { isLoading: isFollowing }] = useFollowShopMutation();
    const [unfollowShop, { isLoading: isUnfollowing }] =
        useUnfollowShopMutation();

    const isShopFollowed = user?.followedShops?.some((s) => s.id === shop.id);

    const handleFollowUnfollow = async () => {
        if (!session?.isAuth) {
            toast.warning("You are not LoggedIn");
        }
        if (isShopFollowed) {
            await unfollowShop(shop.id);
        } else {
            await followShop(shop.id);
        }
    };

    return (
        <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <Image
                        src={shop.logoUrl as unknown as string}
                        alt={shop.name}
                        width={250}
                        height={250}
                        className="w-28 mx-auto rounded-full"
                    />
                </div>
                <h2 className="text-lg font-semibold mb-1">{shop.name}</h2>
                <p className="text-gray-600 text-sm mb-2 h-16 line-clamp-3">
                    {shop.description}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                    {new Date(shop.createdAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                {isLoading ? (
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
                        <Link
                            href={`/shop?shopId=${shop.id}`}
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            Visit Store
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
