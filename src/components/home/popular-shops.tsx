export default function PopularShops() {
    const shops = [
        {
            name: "Beauty Shop",
            logo: "/placeholder.svg?height=80&width=80",
            rating: 4.8,
            totalRatings: 4,
            verified: true,
            products: [
                {
                    name: "Men's Tundr...",
                    price: 34.25,
                    originalPrice: 36.95,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "Lâ€™OrÃ©al...",
                    price: 25.0,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "GownTown ...",
                    price: 43.56,
                    image: "/placeholder.svg?height=60&width=60",
                },
            ],
        },
        {
            name: "Sleek Style",
            logo: "/placeholder.svg?height=80&width=80",
            rating: 4.2,
            totalRatings: 5,
            verified: true,
            products: [
                {
                    name: "Gucci Mem...",
                    price: 32.0,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "Women's C...",
                    price: 19.0,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "Women's Sh...",
                    price: 32.0,
                    image: "/placeholder.svg?height=60&width=60",
                },
            ],
        },
        {
            name: "Tech Scope",
            logo: "/placeholder.svg?height=80&width=80",
            rating: 3.5,
            totalRatings: 2,
            verified: true,
            products: [
                {
                    name: "Xbox Core ...",
                    price: 307.97,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "Lenovo Idea...",
                    price: 618.0,
                    image: "/placeholder.svg?height=60&width=60",
                },
                {
                    name: "Microsoft S...",
                    price: 925.97,
                    image: "/placeholder.svg?height=60&width=60",
                },
            ],
        },
    ];

    return (
        <section className="my-10 sm:my-14">
            <div className="container px-4 lg:px-0 relative">
                <h2 className="text-2xl font-bold mb-4">Popular Shops</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shops.map((shop, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start gap-2 mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                                        <img
                                            src={shop.logo}
                                            alt=""
                                            className="w-12 h-12"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-1">
                                        <h3 className="text-lg font-semibold">
                                            {shop.name}
                                        </h3>
                                        {shop.verified && (
                                            <svg
                                                className="w-4 h-4 text-blue-500"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm">
                                            {shop.rating}
                                        </span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i <
                                                        Math.floor(shop.rating)
                                                            ? "text-yellow-400"
                                                            : i < shop.rating
                                                            ? "text-yellow-200"
                                                            : "text-gray-200"
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({shop.totalRatings} Ratings)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {shop.products.map((product, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={product.image}
                                                alt=""
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <span className="text-sm">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    £{product.originalPrice}
                                                </span>
                                            )}
                                            <span className="text-sm font-semibold ml-1">
                                                £{product.price}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                Visit Store
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
