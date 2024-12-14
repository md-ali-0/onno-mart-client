"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useSession } from "@/provider/session-provider";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { Review, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyReviews() {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const {session} = useSession()
    const { data, isError, isLoading, isSuccess, error } = useGetAllReviewsQuery(
        [
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
            {
                name: "userId",
                value: session?.user,
            },
        ]
    );

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const columns: ColumnDef<Review>[] = [
        {
            accessorKey: "product.name",
            header: "Product Name",
            // cell: ({ row }) => {
            //     return <span>{row.original.product.name}</span>;
            // },
        },
        {
            accessorKey: "rating",
            header: "Review Rating",
            cell: ({ row }) => {
                return <span>$ {row.original.rating}</span>;
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
        <>
            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                onSearchValueChange={setSearch}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
        </>
    );
}
