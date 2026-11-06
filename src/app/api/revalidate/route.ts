import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand cache busting.
 *
 *   curl -X POST "https://onno-mart.vercel.app/api/revalidate?tag=products&secret=..."
 *
 * The API can call this after a vendor edits a product, so the storefront
 * reflects the change immediately instead of waiting out the ISR window.
 */
export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    const expected = process.env.REVALIDATE_SECRET;

    if (!expected || secret !== expected) {
        return NextResponse.json(
            { revalidated: false, message: "Invalid revalidation secret." },
            { status: 401 }
        );
    }

    const tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
        return NextResponse.json(
            { revalidated: false, message: "Pass a tag, e.g. ?tag=products." },
            { status: 400 }
        );
    }

    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}