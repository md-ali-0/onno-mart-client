"use client";

import { useSession } from "@/provider/session-provider";
import {
    useFollowShopMutation,
    useGetMeQuery,
    useUnfollowShopMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";

/** The only interactive part of a shop page; the header itself is server HTML. */
export default function ShopFollowButton({ shopId }: { shopId: string }) {
    const { session } = useSession();
    const { data: user } = useGetMeQuery(undefined);
    const [followShop, { isLoading: isFollowing }] = useFollowShopMutation();
    const [unfollowShop, { isLoading: isUnfollowing }] =
        useUnfollowShopMutation();

    const isFollowed = user?.followedShops?.some((shop) => shop.id === shopId);
    const busy = isFollowing || isUnfollowing;

    const handleClick = async () => {
        if (!session?.isAuth) {
            toast.warning("Sign in to follow this shop");
            return;
        }
        try {
            if (isFollowed) await unfollowShop(shopId).unwrap();
            else await followShop(shopId).unwrap();
        } catch {
            toast.error("Could not update. Please try again.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={busy}
            className={
                isFollowed
                    ? "inline-flex shrink-0 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-60"
                    : "inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            }
        >
            {busy ? "Saving…" : isFollowed ? "Following" : "Follow shop"}
        </button>
    );
}
