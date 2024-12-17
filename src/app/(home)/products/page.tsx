"use client";

import ProductGrid from "@/components/product/product-card-grids";
import SkeletonGrid from "@/components/product/product-skleton-card-grids";
import Breadcumb from "@/components/shared/breadcumb";
import ShopSidebar from "@/components/shop/shop-sidebar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);

    const [limit] = useState<number>(6);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [category, setCategory] = useState<string | undefined>(searchParams.get("categoryId") || undefined);
    const [brand, setBrand] = useState<string | undefined>(searchParams.get("brandId") || undefined);

    const { data, isError, isLoading, isFetching, error } =
        useGetAllProductsQuery([
            { name: "limit", value: limit },
            { name: "page", value: page },
            { name: "searchTerm", value: search || undefined },
            { name: "brandId", value: brand || undefined },
            { name: "categoryId", value: category || undefined },
            { name: "minPrice", value: minPrice || undefined },
            { name: "maxPrice", value: maxPrice || undefined },
        ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, error]);

    const totalPage = data?.meta?.totalPage || 1;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <Breadcumb />
            <section className="relative py-16">
                <div className="container mx-auto px-4 lg:px-0 relative">
                    <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div className="lg:col-span-3 md:col-span-4">
                            <ShopSidebar
                                selectedCategory={category}
                                setCategory={setCategory}
                                selectedBrand={brand}
                                setBrand={setBrand}
                                search={search}
                                setSearch={setSearch}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                            />
                        </div>
                        <div className="lg:col-span-9 md:col-span-8">
                            {isLoading || isFetching ? (
                                <SkeletonGrid />
                            ) : data?.data && data?.data.length > 0 ? (
                                <ProductGrid products={data?.data || []} />
                            ) : (
                                <div className="flex justify-center my-10">
                                    <h3 className="text-xl font-medium">
                                        No Product Available
                                    </h3>
                                </div>
                            )}

                            <div className="py-8">
                                {totalPage > 1 && (
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    className={"cursor-pointer"}
                                                    onClick={() =>
                                                        page > 1 &&
                                                        handlePageChange(
                                                            page - 1
                                                        )
                                                    }
                                                />
                                            </PaginationItem>
                                            {Array.from(
                                                { length: totalPage },
                                                (_, index) => index + 1
                                            ).map((pageNumber) => (
                                                <PaginationItem
                                                    key={pageNumber}
                                                >
                                                    <PaginationLink
                                                        className={"cursor-pointer"}
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNumber
                                                            )
                                                        }
                                                        isActive={
                                                            page === pageNumber
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            <PaginationItem>
                                                <PaginationNext
                                                    className={"cursor-pointer"}
                                                    onClick={() =>
                                                        page < totalPage &&
                                                        handlePageChange(
                                                            page + 1
                                                        )
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
