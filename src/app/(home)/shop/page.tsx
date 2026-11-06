import { notFound, redirect } from "next/navigation";

/**
 * Old links used `/shop?shopId=<id>`. The canonical, indexable URL is now
 * `/shop/<id>` (see ./[id]/page.tsx), so keep the query form working as a
 * redirect instead of leaving those links broken.
 */
export default function LegacyShopPage({
    searchParams,
}: {
    searchParams: { shopId?: string };
}) {
    const shopId = searchParams.shopId;
    if (!shopId) notFound();
    redirect(`/shop/${encodeURIComponent(shopId)}`);
}
