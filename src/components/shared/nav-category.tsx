"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ChevronDown, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavCategory() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const { data, isError, isLoading, isSuccess, error } =
        useGetAllCategoriesQuery([
            {
                name: "limit",
                value: 999,
            },
        ]);
    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/products?categoryId=${categoryId}`);
    };

    return (
        <div className="lg:w-60">
            <div className="relative py-4">
                {/* Dropdown Trigger */}
                <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="inline-flex cursor-pointer items-center justify-between whitespace-nowrap rounded-[5px] bg-primary pl-4 pr-[18px] py-[9px] text-base font-medium text-white hover:bg-opacity-90"
                >
                    <span className="pr-[10px] text-white">
                        <Menu size={20} />
                    </span>
                    All categories
                    <span className="pl-3 text-white">
                        <ChevronDown size={20} />
                    </span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute left-0 top-[110%] z-10 w-[180px] max-h-[380px] overflow-y-auto rounded-lg border-[.5px] border-stroke dark:border-dark-3 bg-white dark:bg-dark-2 py-4 shadow-lg transition-all category-scroll min-w-48">
                        <span className="absolute -top-[6px] left-6 -z-10 h-3 w-3 rotate-45 rounded-sm border-[.5px] border-r-0 border-b-0 border-stroke dark:border-dark-3 bg-white dark:bg-dark-2 lg:block"></span>
                        {isLoading && <p>Loading...</p>}
                        {data?.data?.map((category) => (
                            <div key={category.id} className="pl-6 pr-[18px]">
                                <a
                                    onClick={() =>
                                        handleCategoryClick(category.id)
                                    }
                                    className="flex cursor-pointer items-center py-[6px] text-sm text-body-color dark:text-dark-6 hover:text-primary gap-3"
                                >
                                    <span className="mr-1">
                                        {category?.icon}
                                    </span>
                                    {category.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div
                onClick={() => setDropdownOpen(false)}
                className={`fixed inset-0 w-full h-full ${
                    dropdownOpen ? "" : "hidden"
                }`}
            ></div>
        </div>
    );
}
