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
import { useCreateBrandMutation } from "@/redux/features/brand/brandApi";
import { ErrorResponse } from "@/types";
import { generateSlug } from "@/utils/genereateSlug";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type BrandFormValues = {
    name: string;
    slug: string;
    image: File | null;
};

export default function BrandForm() {
    const form = useForm<BrandFormValues>({
        defaultValues: {
            name: "",
            slug: "",
            image: null,
        },
    });

    const { watch, setValue, reset } = form;
    const name = watch("name");

    useEffect(() => {
        const slug = generateSlug(name);
        setValue("slug", slug);
    }, [name, setValue]);

    const [addBrand, { isSuccess, isLoading, isError, error }] =
        useCreateBrandMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Brand Successfully Added");
            reset();
        }
    }, [isError, isSuccess, error, reset]);

    const onSubmit = async (data: BrandFormValues) => {
        const brandData = {
            name: data.name,
            slug: data.slug,
        };

        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("data", JSON.stringify(brandData));
        const loadingToast = toast.loading("Brand is Creating...");
        await addBrand(formData);
        toast.dismiss(loadingToast);
    };

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
                                <FormLabel htmlFor="name">Brand Name</FormLabel>
                                <FormControl>
                                    <Input
                                        id="name"
                                        placeholder="Enter Brand name"
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
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel htmlFor="slug">Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        id="slug"
                                        placeholder="Enter Brand slug"
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
                        name="image"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input
                                        id="image"
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
                </section>

                {/* Submit Button */}
                <div className="col-span-2 py-5">
                    <Button type="submit">
                        {isLoading ? "Creating Brand" : "Create Brand"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
