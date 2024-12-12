import ProductCard from "@/components/product/product-card";
import ProductSkeletonCard from "@/components/product/product-skeleton-card";
import Breadcumb from "@/components/shared/breadcumb";
import ShopSidebar from "@/components/shop/shop-sidebar";
import { getBrands } from "@/lib/get-brands";
import { getCategories } from "@/lib/get-categories";
import { getProducts } from "@/lib/get-products";
import { Product } from "@/types";
import Link from "next/link";
import { Suspense } from "react";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeletonCard key={index} />
            ))}
        </div>
    );
}

function Pagination({
    totalPages,
    currentPage,
    searchParams,
}: {
    totalPages: number;
    currentPage: number;
    searchParams: URLSearchParams;
}) {
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
            <div className="md:col-span-12 text-center">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex items-center -space-x-px">
                        {/* Previous Button */}
                        <li>
                            <Link
                                href={
                                    currentPage > 1
                                        ? (() => {
                                              const newParams =
                                                  new URLSearchParams(
                                                      searchParams
                                                  );
                                              newParams.set(
                                                  "shop",
                                                  (currentPage - 1).toString()
                                              );
                                              return `/products?${newParams.toString()}`;
                                          })()
                                        : "#"
                                }
                                className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 ${
                                    currentPage === 1
                                        ? "cursor-not-allowed opacity-50"
                                        : "hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500"
                                }`}
                            >
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-5 rtl:rotate-180 rtl:-mt-1"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </Link>
                        </li>

                        {/* Page Numbers */}
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((pageNum) => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set("page", pageNum.toString());
                            return (
                                <li key={pageNum}>
                                    <Link
                                        href={`/products?${newParams.toString()}`}
                                        aria-current={
                                            pageNum === currentPage
                                                ? "page"
                                                : undefined
                                        }
                                        className={`size-[40px] inline-flex justify-center items-center ${
                                            pageNum === currentPage
                                                ? "text-white bg-orange-500 border border-orange-500"
                                                : "text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500"
                                        }`}
                                    >
                                        {pageNum}
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Next Button */}
                        <li>
                            <Link
                                href={
                                    currentPage > 1
                                        ? (() => {
                                              const newParams =
                                                  new URLSearchParams(
                                                      searchParams
                                                  );
                                              newParams.set(
                                                  "page",
                                                  (currentPage - 1).toString()
                                              );
                                              return `/products?${newParams.toString()}`;
                                          })()
                                        : "#"
                                }
                                className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 ${
                                    currentPage === totalPages
                                        ? "cursor-not-allowed opacity-50"
                                        : "hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500"
                                }`}
                            >
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-5 rtl:rotate-180 rtl:-mt-1"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = Number(searchParams.page) || 1;
    const categories =
        typeof searchParams.category === "string"
            ? searchParams.category.split(",")
            : [];
    const brands =
        typeof searchParams.brand === "string"
            ? searchParams.brand.split(",")
            : [];
    const shopId = searchParams.shop ? Number(searchParams.shop) : undefined;

    const allBrands = await getBrands();
    const allCategories = await getCategories();

    const { products, totalPages , totalProducts} = await getProducts(
        page,
        categories,
        brands,
        shopId
    );

    const currentSearchParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === "string") {
            currentSearchParams.append(key, value);
        }
    });

    return (
        <>
            <Breadcumb />
            <section className="relative py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div className="lg:col-span-3 md:col-span-4">
                            <ShopSidebar
                                categories={allCategories}
                                brands={allBrands}
                                selectedCategories={categories}
                                selectedBrands={brands}
                                selectedShop={shopId}
                            />
                        </div>
                        <div className="lg:col-span-9 md:col-span-8">
                            <div className="md:flex justify-between items-center mb-6">
                                <span className="font-semibold">
                                    Showing 1-16 of {totalProducts} items
                                </span>
                                <div className="md:flex items-center">
                                    <label className="font-semibold md:me-2">
                                        Sort by:
                                    </label>
                                    <select className="form-select form-input md:w-36 w-full md:mt-0 mt-1 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                                        <option>Featured</option>
                                        <option>Sale</option>
                                        <option>Alfa A-Z</option>
                                        <option>Alfa Z-A</option>
                                        <option>Price Low-High</option>
                                        <option>Price High-Low</option>
                                    </select>
                                </div>
                            </div>
                            <Suspense fallback={<SkeletonGrid />}>
                                {products.length > 0 ? (
                                    <ProductGrid products={products} />
                                ) : (
                                    <div className="flex justify-center my-10">
                                        <h3 className="text-xl font-medium">No Product Available</h3>
                                    </div>
                                )}
                            </Suspense>

                            <Pagination
                                totalPages={totalPages}
                                currentPage={page}
                                searchParams={currentSearchParams}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
