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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";
import { generateSlug } from "@/utils/genereateSlug";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ProductFormValues = {
    name: string;
    slug: string;
    price: number;
    description: string;
    categoryId: string;
    brandId: string;
    inventory: number;
    discount: number;
    thumbnail: File | null;
    images: FileList | null;
};

export default function CreateProductForm() {
    const { data: user } = useGetMeQuery(undefined);
    console.log(user);
    
    const form = useForm<ProductFormValues>({
        defaultValues: {
            name: "",
            slug: "",
            price: 0,
            description: "",
            categoryId: "",
            brandId: "",
            inventory: 0,
            discount: 0,
            thumbnail: null,
            images: null,
        },
    });

    const { watch, setValue, reset } = form;
    const name = watch("name");

    useEffect(() => {
        const slug = generateSlug(name);
        setValue("slug", slug);
    }, [name, setValue]);

    const [createProduct, { isSuccess, isLoading, isError, error }] =
        useCreateProductMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Product successfully created");
            reset();
        }
    }, [isError, isSuccess, error, reset]);

    const { data: brands, isLoading: isBrandLoading } = useGetAllBrandsQuery([
        {
            name: "limit",
            value: 999,
        },
    ]);

    const { data: categories, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery([
            {
                name: "limit",
                value: 999,
            },
        ]);

    const onSubmit = async (data: ProductFormValues) => {
        const productData = {
            name: data.name,
            slug: data.slug,
            price: Number(data.price),
            description: data.description,
            categoryId: data.categoryId,
            brandId: data.brandId,
            shopId: user?.shop.id,
            inventory: Number(data.inventory),
            discount: Number(data.discount),
        };

        const formData = new FormData();
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }
        if (data.images) {
            Array.from(data.images).forEach((image) => {
                formData.append("images", image);
            });
        }
        formData.append("data", JSON.stringify(productData));

        const loadingToast = toast.loading("Creating product...");
        await createProduct(formData);
        toast.dismiss(loadingToast);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="name"
                                    placeholder="Enter product name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="price">Price</FormLabel>
                            <FormControl>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter product price"
                                    {...field}
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
                                    placeholder="Enter Product slug"
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
                        <FormItem>
                            <FormLabel htmlFor="description">
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    id="description"
                                    placeholder="Enter product description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category and Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="category">
                                    Category
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
                                        disabled={isCategoryLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    isCategoryLoading
                                                        ? "Loading.."
                                                        : "Select Category"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.data?.map((item) => (
                                                <SelectItem
                                                    value={String(item?.slug)}
                                                    key={item?.slug}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brandId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="brand">Brand</FormLabel>
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
                                        disabled={isBrandLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    isBrandLoading
                                                        ? "Loading.."
                                                        : "Select Brands"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands?.data?.map((item) => (
                                                <SelectItem
                                                    value={String(item?.slug)}
                                                    key={item?.slug}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={30}
                                                        className="inline w-6 mr-2"
                                                    />
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Inventory, Discount, and Media */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="inventory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="inventory">
                                    Inventory
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="inventory"
                                        type="number"
                                        placeholder="Enter inventory count"
                                        {...field}
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
                                    Discount (%)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="discount"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter discount percentage"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
                            <FormControl>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files?.[0] || null
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
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="images">Images</FormLabel>
                            <FormControl>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    onChange={(e) =>
                                        field.onChange(e.target.files || null)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Creating Product..." : "Create Product"}
                </Button>
            </form>
        </Form>
    );
}
