"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Category, ErrorResponse, TMeta } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";
import DeleteDialog from "../shared/delete-dialog";

const ManageCategoTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );

    const { data, isError, isLoading, isSuccess, error } = useGetAllCategoriesQuery(
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
        ]
    );

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "icon",
            header: "Icon",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "slug",
            header: "Slug",
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
    ] = useDeleteCategoryMutation();

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
            toast.success("Category Deleted successfully");
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

            <DeleteDialog
                id={categoryToDelete?.id as string}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default ManageCategoTable;
