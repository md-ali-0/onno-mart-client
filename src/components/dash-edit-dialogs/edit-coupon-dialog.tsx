"use client"

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

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateCouponMutation } from "@/redux/features/coupon/couponApi";
import { ErrorResponse } from "@/types";
import { Coupon, CouponType } from "@/types/Coupon";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditCouponDialogProps {
    coupon: Coupon | null;
    open: boolean;
    onClose: () => void;
}

const EditCouponDialog = ({ coupon, open, onClose }: EditCouponDialogProps) => {
    const form = useForm<Coupon>({
        defaultValues: coupon || {
            code: "",
            discount: 0,
            description: "",
            type: CouponType.FIXED_AMOUNT,
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    const [updateCoupon, { isSuccess, isError, error }] =
        useUpdateCouponMutation();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Coupon Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        form.reset(
            coupon || {
                code: "",
                discount: 0,
                description: "",
                type: CouponType.FIXED_AMOUNT,
                isActive: true,
                startDate: new Date(),
                endDate: new Date(),
            }
        );
    }, [coupon, form, form.reset]);

    const onSubmit = async (data: Coupon) => {
        const loadingToast = toast.loading("Coupon is Updating...");

        if (coupon) {
            await updateCoupon({ data: data, id: coupon.id });
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
                    <DialogTitle>Edit Coupon</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        {/* Code */}
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="code">
                                        Coupon Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="code"
                                            placeholder="Enter Coupon Code"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Discount */}
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount">
                                        Discount Value
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="discount"
                                            placeholder="Enter Discount Value"
                                            type="number"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            placeholder="Enter Coupon Description"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="type">
                                        Coupon Type
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(value as "FIXED_AMOUNT" | "PERCENTAGE")
                                            }
                                            defaultValue={field.value?.toString() || CouponType.FIXED_AMOUNT.toString()}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FIXED_AMOUNT">
                                                    Fixed
                                                </SelectItem>
                                                <SelectItem value="PERCENTAGE">
                                                    Percentage
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Start Date */}
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="startDate">
                                        Start Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            {...field}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* End Date */}
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="endDate">
                                        End Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            {...field}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="isActive">
                                        Status
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(values) =>
                                                field.onChange(values === "1")
                                            }
                                            defaultValue={field.value ? "1" : "0"}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Footer */}
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

export default EditCouponDialog;
