"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ErrorResponse, Shop, ShopStatus, TMeta } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { toast } from "sonner";

import { useSession } from "@/provider/session-provider";
import {
    useDeleteShopMutation,
    useGetAllShopsQuery,
} from "@/redux/features/shop/shopApi";
import Image from "next/image";
import EditShopDialog from "../dash-edit-dialogs/edit-shop-dialog";
import EditShopStatusDialog from "../dash-edit-dialogs/edit-shop-status-dialog";
import { DataTable } from "../data-table/data-table";
import DeleteDialog from "../shared/delete-dialog";
import { Badge } from "../ui/badge";

const ManageShopTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { session } = useSession();
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [shopToStatus, setShopToStatus] = useState<Shop | null>(null);
    const [shopToEdit, setShopToEdit] = useState<Shop | null>(null);
    const [shopToDelete, setShopToDelete] = useState<Shop | null>(null);

    const { data, isError, isLoading, isSuccess, error } = useGetAllShopsQuery([
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
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleViewClick = (shop: Shop) => {
        setShopToEdit(shop);
        setViewDialogOpen(true);
    };
    const handleStatusClick = (shop: Shop) => {
        setShopToStatus(shop);
        setStatusDialogOpen(true);
    };

    const handleDeleteClick = (shop: Shop) => {
        setShopToDelete(shop);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<Shop>[] = [
        {
            accessorKey: "logoUrl",
            header: "Shop Logo",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original?.logoUrl as unknown as string}
                            alt={row.original.name}
                            width={50}
                            height={50}
                            className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "products",
            header: "Total Products",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"outline"}>
                        {row.original.products?.length}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "orders",
            header: "Total Orders",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"outline"}>
                        {row.original.orders?.length}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "followers",
            header: "Total Followers",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={"outline"}>
                        {row.original.followers?.length}
                    </Badge>
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
                        variant={
                            row.original.status === ShopStatus.ACTIVE
                                ? "default"
                                : "outline"
                        }
                    >
                        {row.original.status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Join On",
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
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <LuMoreVertical size={20} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {session?.role === "VENDOR" && (
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleViewClick(row.original)
                                    }
                                >
                                    Edit
                                </DropdownMenuItem>
                            )}
                            {session?.role === "ADMIN" && (
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleStatusClick(row.original)
                                    }
                                >
                                    Change Status
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(row.original)}
                            >
                                Remove
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [
        deleteShop,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeleteShopMutation();

    useEffect(() => {
        if (isDeleteError) {
            const errorResponse = deleteError as
                | ErrorResponse
                | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isDeleteSuccess) {
            toast.success("User Deleted successfully");
        }
    }, [isDeleteError, isDeleteSuccess, deleteError]);

    const handleDelete = async (id: string) => {
        await deleteShop(id);
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data ?? []}
                isLoading={isLoading}
                onSearchValueChange={setSearch}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
            <EditShopDialog
                shop={shopToEdit as Shop}
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
            />
            <EditShopStatusDialog
                shop={shopToStatus as Shop}
                open={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
            />
            <DeleteDialog
                id={shopToDelete?.id as string}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default ManageShopTable;
