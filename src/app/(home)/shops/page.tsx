import ShopCard from "@/components/sellers/shop-card";
import Breadcumb from "@/components/shared/breadcumb";
import { getShops } from "@/lib/get-products";
import Link from "next/link";

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
                                              const newParams = new URLSearchParams(searchParams);
                                              newParams.set("page", (currentPage - 1).toString());
                                              return `/shops?${newParams.toString()}`;
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
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set("page", pageNum.toString());
                            return (
                                <li key={pageNum}>
                                    <Link
                                        href={`/shops?${newParams.toString()}`}
                                        aria-current={pageNum === currentPage ? "page" : undefined}
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
                                    currentPage < totalPages
                                        ? (() => {
                                              const newParams = new URLSearchParams(searchParams);
                                              newParams.set("page", (currentPage + 1).toString());
                                              return `/shops?${newParams.toString()}`;
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


export default async function SellerPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = Number(searchParams.page) || 1;
    const shops = await getShops(page);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {shops?.data?.map((shop) => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                </div>
                <Pagination
                    totalPages={shops?.meta.totalPage}
                    currentPage={page}
                    searchParams={currentSearchParams}
                />
            </section>
        </>
    );
}
