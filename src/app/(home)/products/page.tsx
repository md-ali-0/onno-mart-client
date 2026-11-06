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
    const [search, setSearch] = useState<string | undefined>(searchParams.get("searchTerm") || undefined);
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
            <section className="section">
                <div className="container-page">
                    <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-12">
                        <div className="md:col-span-4 lg:col-span-3">
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
                        <div className="md:col-span-8 lg:col-span-9">
                            <p className="mb-5 border-b pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                {data?.meta?.total ?? 0} products
                            </p>
                            {isLoading || isFetching ? (
                                <SkeletonGrid />
                            ) : data?.data && data?.data.length > 0 ? (
                                <ProductGrid products={data?.data || []} />
                            ) : (
                                <div className="border border-dashed py-20 text-center">
                                    <p className="font-display text-[20px]">
                                        Nothing here yet
                                    </p>
                                    <p className="mt-1 text-[13px] text-muted-foreground">
                                        Try a wider price range or another
                                        category.
                                    </p>
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
