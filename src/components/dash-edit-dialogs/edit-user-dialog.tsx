/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { ErrorResponse, User, UserStatus } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./../ui/form";

interface EditUserDialogProps {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

const EditUserDialog = ({ user, open, onClose }: EditUserDialogProps) => {
    const form = useForm<User>({
        defaultValues: user || {
            name: "",
            email: "",
            password: "",
            avatar: "",
            status: UserStatus.ACTIVE,
        },
        values: user || undefined,
    });
    const { reset } = form;

    const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("User Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        reset(
            user || {
                name: "",
                email: "",
                password: "",
                avatar: "",
                status: UserStatus.ACTIVE,
            }
        );
    }, [user, reset]);

    const onSubmit = async (data: User) => {
        const loadingToast = toast.loading("User is Updating...");

        const formData = new FormData();

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            status: data.status,
        };

        if ((data.avatar as any) instanceof File) {
            formData.append("avatar", data.avatar);
        }
        formData.append("data", JSON.stringify(userData));

        if (user) {
            formData.append("id", user?.id);
            await updateUser({ formData, id: user?.id });
        }
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[525px]"
            >
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        User Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Enter User name"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="avatar">
                                        Avatar
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.files?.[0]
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel htmlFor="email">
                                        User email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="Enter User email"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">
                                        User Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter User Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="status">
                                        Status
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(values) => {
                                                field.onChange(values);
                                            }}
                                            value={
                                                field.value
                                                    ? String(field.value)
                                                    : undefined
                                            }
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"ACTIVE"}>
                                                    Active
                                                </SelectItem>
                                                <SelectItem value={"SUSPEND"}>
                                                    Suspend
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="col-span-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
