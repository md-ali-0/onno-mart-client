/** Shared skeleton for /products, /category and /brand while data streams in. */
export default function ListingSkeleton() {
    return (
        <section className="section">
            <div className="container-page">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12">
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="skeleton h-[420px] rounded-lg" />
                    </div>
                    <div className="md:col-span-8 lg:col-span-9">
                        <div className="skeleton mb-4 h-4 w-40" />
                        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="rounded-lg border bg-card p-3">
                                    <div className="skeleton aspect-square w-full rounded-md" />
                                    <div className="skeleton mt-3 h-3 w-1/3" />
                                    <div className="skeleton mt-2 h-4 w-full" />
                                    <div className="skeleton mt-2 h-4 w-2/3" />
                                    <div className="skeleton mt-3 h-6 w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
