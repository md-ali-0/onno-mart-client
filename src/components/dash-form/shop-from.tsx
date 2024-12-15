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
import { useUpdateShopMutation } from "@/redux/features/shop/shopApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type ShopFormValues = {
    name: string;
    logoUrl: File | null;
    description: string;
};

export default function ShopForm() {
    const { data: user, isLoading: isLoadingMe } = useGetMeQuery(undefined);

    const form = useForm<ShopFormValues>();

    const { reset } = form;

    const [updateShop, { isSuccess, isLoading, isError, error }] =
        useUpdateShopMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Shop Updated Successfully");
            reset();
        }
    }, [isError, isSuccess, error, reset]);

    const onSubmit = async (data: ShopFormValues) => {
        const shopData = {
            name: data.name,
            description: data.description,
        };

        const formData = new FormData();
        if (data.logoUrl) {
            formData.append("logoUrl", data.logoUrl);
        }
        formData.append("data", JSON.stringify(shopData));
        const loadingToast = toast.loading("Shop is Updating...");
        await updateShop({ formData, id: user?.shop?.id });
        toast.dismiss(loadingToast);
    };

    if (isLoadingMe) {
        <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full animate-pulse bg-primary/60"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-primary/60"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-primary/60"></div>
        </div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Shop Name</FormLabel>
                                <FormControl>
                                    <Input
                                        id="name"
                                        placeholder="Enter Shop name"
                                        {...field}
                                        defaultValue={user?.shop?.name}
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
                                    Shop Logo
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="logoUrl"
                                        type="file"
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
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
                            <FormItem className="md:col-span-2">
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter Shop description"
                                        {...field}
                                        defaultValue={user?.shop?.description || ""}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {/* Submit Button */}
                <div className="col-span-2 py-5">
                    <Button type="submit">
                        {isLoading ? "Shop Updating..." : "Update My Shop"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
