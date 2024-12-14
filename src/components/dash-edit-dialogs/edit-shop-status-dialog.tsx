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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "./../ui/form";

interface EditShopStatusDialogProps {
    shop: Shop | null;
    open: boolean;
    onClose: () => void;
}

const EditShopStatusDialog = ({
    shop,
    open,
    onClose,
}: EditShopStatusDialogProps) => {
    const form = useForm<Shop>({
        defaultValues: shop || {
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
                className="sm:max-w-[325px]"
            >
                <DialogHeader>
                    <DialogTitle>Change Shop Status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
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

export default EditShopStatusDialog;
