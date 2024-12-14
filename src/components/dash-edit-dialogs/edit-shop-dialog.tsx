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
import { useUpdateShopMutation } from "@/redux/features/shop/shopApi";
import { ErrorResponse, Shop, ShopStatus } from "@/types";
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
import { Textarea } from "../ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./../ui/form";

interface EditShopDialogProps {
    shop: Shop | null;
    open: boolean;
    onClose: () => void;
}

const EditShopDialog = ({ shop, open, onClose }: EditShopDialogProps) => {
    const form = useForm<Shop>({
        defaultValues: shop || {
            name: "",
            logoUrl: "",
            description: "",
            status: ShopStatus.ACTIVE,
        },
        values: shop || undefined,
    });
    const { reset } = form;

    const [updateShop, { isSuccess, isError, error }] = useUpdateShopMutation();

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
            shop || {
                name: "",
                logoUrl: "",
                description: "",
                status: ShopStatus.ACTIVE,
            }
        );
    }, [shop, reset]);

    const onSubmit = async (data: Shop) => {
        const loadingToast = toast.loading("Shop is Updating...");

        const formData = new FormData();

        const userData = {
            name: data.name,
            description: data.description,
            status: data.status,
        };

        if ((data.logoUrl as any) instanceof File) {
            formData.append("logoUrl", data?.logoUrl as unknown as string);
        }
        formData.append("data", JSON.stringify(userData));

        if (shop) {
            formData.append("id", shop?.id);
            await updateShop({ formData, id: shop?.id });
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
                    <DialogTitle>Edit Shop</DialogTitle>
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
                            name="logoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="logoUrl">
                                        Shop logo
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="logoUrl"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel htmlFor="description">
                                        Shop Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter Shop Description"
                                            {...field}
                                            required
                                            value={field.value ?? ""}
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
                                                <SelectItem value={"BLOCKED"}>
                                                    Blacklist
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

export default EditShopDialog;
