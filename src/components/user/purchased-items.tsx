/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/provider/session-provider";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { Product, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ReviewDialog from "./review-dialog";

export default function PurchasedItems() {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { session } = useSession();
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<Product | null>(null);
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
            {
                name: "status",
                value: "COMPLETED",
            },
        ]
    );

    useEffect(() => {
        if (isError) {
            toast.error("Something went wrong");
        }
    }, [isError, isSuccess, error]);

    // Flatten all products from orders into a single array
    const products: any[] =
        data?.data?.flatMap((order) =>
            order.products.map((product) => ({
                ...product,
                orderId: order.id, // Add order reference if needed
                orderStatus: order.status, // Include status for product context
                orderTranId: order.tranId, // Add transaction ID
                orderDate: order.createdAt, // Add order date for the product
            }))
        ) || [];

    const handleReviewClick = (product: Product) => {
        setReviewToEdit(product);
        setReviewDialogOpen(true);
    };
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original?.product?.thumbnail}
                            alt={row.original?.product?.name}
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
                return <span>{row?.original?.product?.name}</span>;
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return <span>${row.original?.price}</span>;
            },
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => {
                return <span>{row.original.product?.inventory}</span>;
            },
        },
        {
            accessorKey: "orderStatus",
            header: "Order Status",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"outline"}>
                        {row.original.orderStatus}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "orderDate",
            header: "Order Date",
            cell: ({ row }) => {
                return (
                    <div>
                        {new Date(row.original.orderDate).toLocaleDateString(
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
        {
            accessorKey: "action",
            header: "Action",
            cell: ({row}) => {
                return (
                    <Button
                        variant="outline"
                        onClick={() => handleReviewClick(row.original?.product)}
                    >
                        Write Review
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={products}
                isLoading={isLoading}
                onSearchValueChange={setSearch}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
            <ReviewDialog product={reviewToEdit as unknown as Product} open={reviewDialogOpen}  onClose={() => setReviewDialogOpen(false)} />
        </>
    );
}
