/** Matches the anatomy of ProductCard so loading grids do not jump. */
export default function ProductSkeletonCard() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
            <div className="skeleton aspect-square w-full rounded-none" />

            <div className="flex flex-1 flex-col p-4">
                <div className="skeleton h-2.5 w-1/3" />
                <div className="mt-2 space-y-1.5">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-2/3" />
                </div>
                <div className="skeleton mt-2 h-3 w-1/2" />

                <div className="mt-auto pt-3">
                    <div className="skeleton h-5 w-1/2" />
                    <div className="skeleton mt-1.5 h-3 w-1/3" />
                </div>

                <div className="skeleton mt-3 h-10 w-full rounded-lg" />
            </div>
        </div>
    );
}
