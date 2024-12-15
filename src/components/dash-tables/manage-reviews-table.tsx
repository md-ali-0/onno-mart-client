"use client";

import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Review, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";

const ManageReviewsTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: user } = useGetMeQuery(undefined);
    const [query, setQuery] = useState([
        {
            name: "limit",
            value: limit,
        },
        {
            name: "page",
            value: page,
        },
        {
            name: "searchTerm",
            value: search,
        },
    ]);

    useEffect(() => {
        // Update query only when `user?.shop` changes
        if (user?.shop) {
            setQuery((prevQuery) => [
                ...prevQuery.filter((param) => param.name !== "shopId"), // Remove previous `shopId` if present
                {
                    name: "shopId",
                    value: user?.shop?.id,
                },
            ]);
        }
    }, [user?.shop]); // This will trigger the effect only when `user?.shop` changes

    const { data, isError, isLoading, isSuccess, error } =
        useGetAllReviewsQuery(query);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const columns: ColumnDef<Review>[] = [
        {
            accessorKey: "product.name",
            header: "Product Name",
        },
        {
            accessorKey: "user.name",
            header: "User Name",
            cell: ({ row }) => {
                return <span className="whitespace-nowrap">{row.original.user.name}</span>;
            },
        },
        {
            accessorKey: "rating",
            header: "Review Rating",
            cell: ({ row }) => {
                return <span>★{row.original.rating}</span>;
            },
        },
        {
            accessorKey: "products",
            header: "Review Comment",
            cell: ({ row }) => {
                return <span>{row.original.comment}</span>;
            },
        },
        {
            accessorKey: "createdAt",
            header: "Created Date",
            cell: ({ row }) => {
                return (
                    <div className="">
                        {new Date(
                            String(row.original.createdAt)
                        ).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data?.data || []}
            isLoading={isLoading}
            onSearchValueChange={setSearch}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
            meta={data?.meta as TMeta}
        />
    );
};

export default ManageReviewsTable;
