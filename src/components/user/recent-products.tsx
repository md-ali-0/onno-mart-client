"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/provider/session-provider";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { Order, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RecentProducts() {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { session } = useSession();
    const { data, isError, isLoading, isSuccess, error } = useGetAllOrdersQuery(
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

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "image",
            header: "Shop Logo",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original.shop.logoUrl as string}
                            alt={row.original.shop.name}
                            width={100}
                            height={100}
                            className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "shop",
            header: "Shop Name",
            cell: ({ row }) => {
                return <span>{row.original.shop.name}</span>;
            },
        },
        {
            accessorKey: "totalAmount",
            header: "Total Price",
            cell: ({ row }) => {
                return <span>$ {row.original.totalAmount}</span>;
            },
        },

        {
            accessorKey: "products",
            header: "Total Products",
            cell: ({ row }) => {
                return <span>{row.original.products.length}</span>;
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"outline"}>
                        {row.original.status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "paymentMethod",
            header: "Payment Method",
            cell: () => {
                return (
                    <span className="capitalize">
                        SSLCOMMERZ
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Order Created",
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
