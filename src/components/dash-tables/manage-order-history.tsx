"use client";


import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Order, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";
import { Badge } from "../ui/badge";

const ManageOrderHistoryTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: user } = useGetMeQuery(undefined);

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
                name: "shopId",
                value: user?.shop?.id,
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
            accessorKey: "user",
            header: "User Name",
            cell: ({ row }) => {
                return (
                    <span
                    >
                        {row.original.user.name}
                    </span>
                );
            },
        },
        {
            accessorKey: "totalAmount",
            header: "Total Price",
            cell: ({ row }) => {
                return (
                    <span
                    >
                        $ {row.original.totalAmount}
                    </span>
                );
            },
        },
        {
            accessorKey: "shop",
            header: "Shop Name",
            cell: ({ row }) => {
                return (
                    <span
                    >
                        {row.original.shop.name}
                    </span>
                );
            },
        },
        {
            accessorKey: "products",
            header: "Total Products",
            cell: ({ row }) => {
                return (
                    <span
                    >
                        {row.original.products.length}
                    </span>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <Badge
                        className="capitalize"
                        variant={"outline"}
                    >
                        {row.original.status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "Last Updated",
            header: "Last Updated",
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
};

export default ManageOrderHistoryTable;
