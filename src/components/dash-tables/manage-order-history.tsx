"use client";


import { formatPrice } from "@/lib/format";
import {
    useGetAllOrdersQuery,
    useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Order, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";

const ORDER_STATUSES = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
] as const;

const ManageOrderHistoryTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: user } = useGetMeQuery(undefined);
    const [updateOrder] = useUpdateOrderMutation();

    const changeStatus = async (id: string, status: string) => {
        try {
            await updateOrder({ id, formData: { status } }).unwrap();
            toast.success(`Order marked ${status.toLowerCase()}`);
        } catch {
            toast.error("Could not update the order status");
        }
    };

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
                        {formatPrice(Number(row.original.totalAmount))}
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
            cell: ({ row }) => (
                <select
                    value={row.original.status}
                    onChange={(event) =>
                        changeStatus(row.original.id, event.target.value)
                    }
                    aria-label={`Status for order ${row.original.id}`}
                    className="h-8 rounded-md border border-input bg-card px-2 text-[12px] capitalize outline-none transition-colors focus:border-primary"
                >
                    {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {status.toLowerCase()}
                        </option>
                    ))}
                </select>
            ),
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
