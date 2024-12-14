"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ErrorResponse, TMeta, User, UserStatus } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { toast } from "sonner";

import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import EditUserDialog from "../dash-edit-dialogs/edit-user-dialog";
import { DataTable } from "../data-table/data-table";
import DeleteDialog from "../shared/delete-dialog";
import { Badge } from "../ui/badge";

const ManageUserTable: FC = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const { data, isError, isLoading, isSuccess, error } = useGetAllUsersQuery([
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

    const handleViewClick = (user: User) => {
        setUserToEdit(user);
        setViewDialogOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "avatar",
            header: "Avatar",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <Image
                            src={row.original?.avatar}
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
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <Badge
                        className="capitalize"
                        variant={
                            row.original.status === UserStatus.ACTIVE
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
            accessorKey: "joinOn",
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
                            <DropdownMenuItem
                                onClick={() => handleViewClick(row.original)}
                            >
                                Edit
                            </DropdownMenuItem>
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
        deleteUser,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeleteUserMutation();

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
        await deleteUser(id);
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
            <EditUserDialog
                user={userToEdit as User}
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
            />
            <DeleteDialog
                id={userToDelete?.id as string}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default ManageUserTable;
