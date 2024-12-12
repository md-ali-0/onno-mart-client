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
import { useUpdateBrandMutation } from "@/redux/features/brand/brandApi";
import { Brand, ErrorResponse } from "@/types";
import { generateSlug } from "@/utils/genereateSlug";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./../ui/form";

interface EditBrandDialogProps {
    brand: Brand | null;
    open: boolean;
    onClose: () => void;
}

const EditBrandDialog = ({ brand, open, onClose }: EditBrandDialogProps) => {
    const form = useForm<Brand>({
        defaultValues: brand || {
            name: "",
            slug: "",
            image: ""
        },
        values: brand || undefined,
    });
    const { watch, setValue, reset } = form;
    const name = watch("name");

    useEffect(() => {
        const slug = generateSlug(name);
        setValue("slug", slug);
    }, [name, setValue]);

    const [updatecategory, { isSuccess, isError, error }] =
        useUpdateBrandMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Brand Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        reset(
            brand || {
                name: "",
                slug: "",
                image: ""
            }
        );
    }, [brand, reset]);

    const onSubmit = async (data: Brand) => {
        const loadingToast = toast.loading("Brand is Updating...");

        const formData = new FormData();

        const brandData = {
            name: data.name,
            slug: data.slug,
        };

        if ((data.image as any) instanceof File) {
            formData.append("image", data.image);
        }
        formData.append("data", JSON.stringify(brandData));

        if (brand) {
            formData.append("id", brand?.id);
            await updatecategory({formData, id: brand?.id});
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
                    <DialogTitle>Edit Brand</DialogTitle>
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
                                <FormItem className="col-span-2">
                                    <FormLabel htmlFor="name">
                                        Brand Name
                                    </FormLabel>
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
                                <FormItem>
                                    <FormLabel htmlFor="slug">
                                        Brand Slug
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="slug"
                                            placeholder="Enter Brand Slug"
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
                                <FormItem>
                                    <FormLabel htmlFor="image">
                                        Image
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="image"
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

export default EditBrandDialog;
