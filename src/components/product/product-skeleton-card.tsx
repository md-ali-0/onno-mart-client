/** Matches the anatomy of ProductCard so loading grids do not jump. */
export default function ProductSkeletonCard() {
    return (
        <div className="flex h-full flex-col">
            <div className="skeleton aspect-[4/5] w-full" />

            <div className="flex flex-1 flex-col pt-3">
                <div className="skeleton h-2 w-1/3" />
                <div className="mt-2 space-y-1.5">
                    <div className="skeleton h-3.5 w-full" />
                    <div className="skeleton h-3.5 w-2/3" />
                </div>
                <div className="skeleton mt-2 h-3 w-1/2" />

                <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="skeleton h-5 w-1/2" />
                    <div className="skeleton h-9 w-9 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
