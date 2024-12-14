"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    useDeleteBrandMutation
} from "@/redux/features/brand/brandApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { ErrorResponse, Product, TMeta } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { toast } from "sonner";
import EditProductDialog from "../dash-edit-dialogs/edit-product-dialog";
import { DataTable } from "../data-table/data-table";
import DeleteDialog from "../shared/delete-dialog";

const ManageSellerProductTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: user } = useGetMeQuery(undefined)
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null
    );

    const { data, isError, isLoading, isSuccess, error } = useGetAllProductsQuery(
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

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original?.thumbnail}
                            alt={row.original.name}
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
            header: "Name",
        },
        {
            accessorKey: "brand.name",
            header: "Brand",
        },
        {
            accessorKey: "category.name",
            header: "Category",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "createdAt",
            header: "Product Uploaded",
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
            accessorKey: "Last Updated",
            header: "Last Updated",
            cell: ({ row }) => {
                return (
                    <div className="">
                        {new Date(
                            String(row.original.updatedAt)
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
                            <DropdownMenuItem
                                onClick={() => handleEditClick(row.original)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(row.original)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [
        deleteBrand,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeleteBrandMutation();

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
            toast.success("Brand Deleted successfully");
        }
    }, [isDeleteError, isDeleteSuccess, deleteError]);

    const handleDelete = async (id: string) => {
        await deleteBrand(id);
    };

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
            <EditProductDialog
                product={productToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <DeleteDialog
                id={productToDelete?.id as string}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default ManageSellerProductTable;
