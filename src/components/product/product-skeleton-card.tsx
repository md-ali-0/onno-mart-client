import { Skeleton } from "../ui/skeleton";

export default function ProductSkeletonCard() {
    return (
        <div className="group">
            <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                {/* Image Skeleton */}
                <Skeleton className="h-[400px] w-full rounded-md" />

                {/* Add to Cart Button Skeleton */}
                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Wishlist and View Icons Skeleton */}
                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-2">
                    <li>
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </li>
                    <li className="mt-1">
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </li>
                </ul>
            </div>

            {/* Product Details Skeleton */}
            <div className="mt-4 space-y-2">
                {/* Product Name */}
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* Price and Rating */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/3 rounded-md" />
                    <Skeleton className="h-6 w-1/4 rounded-md" />
                </div>
            </div>
        </div>
    );
}
