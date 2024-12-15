/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useGetAllFavoriteShopsQuery } from "@/redux/features/user/userApi";
import { Shop, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FavoriteShops() {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isError, isLoading, isSuccess, error } = useGetAllFavoriteShopsQuery(
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
            }
        ]
    );

    useEffect(() => {
        if (isError) {
            toast.error("Something went wrong");
        }
    }, [isError, isSuccess, error]);


    const columns: ColumnDef<Shop>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original?.logoUrl as string}
                            alt={row.original?.name}
                            width={100}
                            height={100}
                            className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Product Name",
            cell: ({ row }) => {
                return <span>{row?.original?.name}</span>;
            },
        },
        {
            accessorKey: "products",
            header: "Total Products",
            cell: ({ row }) => {
                return <span>${row.original?.products.length}</span>;
            },
        },
        {
            accessorKey: "followers",
            header: "Total Followers",
            cell: ({ row }) => {
                return <span>{row.original?.followers.length}</span>;
            },
        },
        {
            accessorKey: "createdAt",
            header: "Join On",
            cell: ({ row }) => {
                return (
                    <div>
                        {new Date(row.original.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data  || []}
                isLoading={isLoading}
                onSearchValueChange={setSearch}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
        </>
    );
}
