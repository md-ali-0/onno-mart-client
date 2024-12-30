"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavbarCategorySearch() {
    const { data, isError, isLoading, isSuccess, error } =
        useGetAllCategoriesQuery([
            {
                name: "limit",
                value: 999,
            },
        ]);

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = new URLSearchParams({
            ...(categoryId && { categoryId }),
            ...(searchTerm && { searchTerm }),
        }).toString();

        router.push(`/products?${query}`);
    };

    return (
        <form className="hidden w-full lg:flex" onSubmit={handleSubmit}>
            <div className="relative flex items-center w-full border rounded-md border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2">
                <div className="relative border-r border-stroke dark:border-dark-3">
                    <select
                        name="categoryId"
                        className="appearance-none bg-transparent pr-10 pl-[22px] py-2 text-base font-medium text-dark dark:text-white outline-none"
                        disabled={isLoading}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="" className="dark:bg-dark-2">
                            All categories
                        </option>
                        {data?.data?.map((category) => (
                            <option
                                key={category?.id}
                                value={category?.slug}
                                className="dark:bg-dark-2"
                            >
                                {category?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="search"
                    name="searchTerm"
                    placeholder="I'm shopping for..."
                    className="w-full bg-transparent py-2 pl-6 pr-[58px] text-base outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute top-0 right-0 flex h-full w-[52px] items-center justify-center rounded-tr-md rounded-br-md border border-primary bg-primary text-white"
                >
                    <Search />
                </button>
            </div>
        </form>
    );
}
