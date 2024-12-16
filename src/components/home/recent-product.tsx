/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { Product } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ProductCard from "../product/product-card";
import { Input } from "../ui/input";

const RecentProducts = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(4);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);

    const { data: categories, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery([{ name: "limit", value: 999 }]);

    const { data, isError, isLoading, error } = useGetAllProductsQuery(
        [
            { name: "limit", value: limit },
            { name: "page", value: page },
            { name: "searchTerm", value: search || undefined },
            { name: "categoryId", value: category || undefined },
            { name: "minPrice", value: minPrice || undefined },
            { name: "maxPrice", value: maxPrice || undefined },
        ],
        { skip: !hasMore && !isFiltering }
    );

    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(() => {
        if (hasMore && !isLoading && !isFiltering) setPage((prev) => prev + 1);
    }, [hasMore, isLoading, isFiltering]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting) loadMore();
        },
        [loadMore]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            threshold: 1.0,
        });
        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [handleObserver]);

    useEffect(() => {
        if (data) {
            setProducts((prev) => [...prev, ...(data?.data || [])]);
            setHasMore(
                (data?.meta?.page || 1) < (data?.meta?.totalPage || 1)
            );
            setIsFiltering(false);
        }
    }, [data]);

    useEffect(() => {
        if (isError) toast.error("Something Went Wrong");
    }, [isError, error]);

    // Reset and filter products when filters change
    const handleFilterChange = useCallback(() => {
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setIsFiltering(true);
    }, []);

    useEffect(() => {
        handleFilterChange();
    }, [search, minPrice, maxPrice, category]);

    return (
        <section className="mb-10 sm:mb-20">
            <div className="container px-4 lg:px-0">
                <div>
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-3.5">
                            <h3 className="text-2xl font-semibold ">
                                Recent Products
                            </h3>
                            <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2.5">
                                <Input
                                    type="search"
                                    id="searchname"
                                    className="h-9 px-3 max-w-36 rounded border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setCategory(value)
                                    }
                                    value={category}
                                    disabled={isCategoryLoading}
                                >
                                    <SelectTrigger className={"max-w-36"}>
                                        <SelectValue
                                            placeholder={
                                                isCategoryLoading
                                                    ? "Loading..."
                                                    : "Select Category"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>

                                        {categories?.data?.map((item) => (
                                            <SelectItem
                                                key={item.slug}
                                                value={String(item.slug)}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        className="h-9 px-3 max-w-28 rounded border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                                        placeholder="Min Price"
                                        min={1}
                                        value={minPrice || ""}
                                        onChange={(e) =>
                                            setMinPrice(
                                                Number(e.target.value) || null
                                            )
                                        }
                                    />
                                    <Input
                                        type="number"
                                        className="h-9 px-3 max-w-28 rounded border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                                        placeholder="Max Price"
                                        min={1}
                                        value={maxPrice || ""}
                                        onChange={(e) =>
                                            setMaxPrice(
                                                Number(e.target.value) || null
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                        {isLoading && (
                            <div className="text-center mt-4">
                                Loading more products...
                            </div>
                        )}
                        <div ref={observerRef}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentProducts;
