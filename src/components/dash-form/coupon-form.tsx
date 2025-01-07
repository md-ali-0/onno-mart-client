"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { ErrorResponse } from "@/types";
import { CouponType } from "@/types/Coupon";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CouponFormValues = {
    code: string;
    discount: number;
    description: string;
    type: CouponType;
    startDate: string;
    endDate: string;
    isActive: boolean;
};

export default function CouponForm() {
    const form = useForm<CouponFormValues>({
        defaultValues: {
            code: "",
            discount: 0,
            description: "",
            type: CouponType.FIXED_AMOUNT,
            isActive: true,
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
        },
    });

    const { reset } = form;

    const [createCoupon, { isSuccess, isLoading, isError, error }] =
        useCreateCouponMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Coupon Successfully Created");
            reset();
        }
    }, [isError, isSuccess, error, reset]);

    const onSubmit = async (data: CouponFormValues) => {
        const loadingToast = toast.loading("Creating Coupon...");
        const couponData = {
            code: data.code,
            discount: Number(data.discount),
            description: data.description,
            type: data.type,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            isActive: data.isActive,
        };

        await createCoupon(couponData);
        toast.dismiss(loadingToast);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="code">Coupon Code</FormLabel>
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
                                        type="number"
                                        placeholder="Enter Discount Value"
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
                        name="description"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="description"
                                        placeholder="Enter Description (Optional)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="type">Coupon Type</FormLabel>
                                <FormControl>
                                <Select
                                            onValueChange={(value) =>
                                                field.onChange(value as "FIXED_AMOUNT" | "PERCENTAGE")
                                            }
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
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="endDate">End Date</FormLabel>
                                <FormControl>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <div className="pt-5">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Coupon..." : "Create Coupon"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
