"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // For shop description
import { useVendorSignUpMutation } from "@/redux/features/auth/authApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
    name: string;
    email: string;
    password: string;
    shopName: string;
    shopDescription?: string;
    shopLogo?: FileList;
}

const VendorSignUpForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const [signupVendor, { isSuccess, isError, error }] =
        useVendorSignUpMutation();
    const router = useRouter();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        }
        if (isSuccess) {
            toast.success("Vendor Created Successfully");
            router.push("/auth/signin");
        }
    }, [error, isError, isSuccess, router]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const vendorData = {
            name: data.name,
            email: data.email,
            password: data.password,
            shopName: data.shopName,
            shopDescription: data.shopDescription,
        };

        const formData = new FormData();

        formData.append("data", JSON.stringify(vendorData));
        if (data?.shopLogo?.[0]) {
            formData.append("shopLogo", data?.shopLogo?.[0]);
        }
        await signupVendor(formData);
    };

    return (
        <div className="p-8 rounded-2xl bg-white border">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
                Vendor Sign Up
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                {/* Name Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Name
                    </label>
                    <Input
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        })}
                        type="text"
                        placeholder="Enter your name"
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Email
                    </label>
                    <Input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Password
                    </label>
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                        type="password"
                        placeholder="Enter your password"
                        className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* Shop Name Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Shop Name
                    </label>
                    <Input
                        {...register("shopName", {
                            required: "Shop name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Shop name must be at least 3 characters",
                            },
                        })}
                        type="text"
                        placeholder="Enter your shop name"
                        className={errors.shopName ? "border-red-500" : ""}
                    />
                    {errors.shopName && (
                        <span className="text-red-500 text-sm">
                            {errors.shopName.message}
                        </span>
                    )}
                </div>

                {/* Shop Description Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Shop Description
                    </label>
                    <Textarea
                        {...register("shopDescription", {
                            required: "Shop Description is required",
                        })}
                        placeholder="Enter a brief description of your shop (optional)"
                    />
                    {errors.shopDescription && (
                        <span className="text-red-500 text-sm">
                            {errors.shopDescription.message}
                        </span>
                    )}
                </div>

                {/* Shop Logo Field */}
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                        Shop Logo
                    </label>
                    <Input
                        {...register("shopLogo", {
                            required: "Shop Logo is required",
                        })}
                        type="file"
                        accept="image/*"
                        className="block w-full"
                    />
                    {errors.shopLogo && (
                        <span className="text-red-500 text-sm">
                            {errors.shopLogo.message}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="!mt-8">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </div>

                {/* Login Link */}
                <p className="text-gray-800 text-sm !mt-8 text-center">
                    Already have an account?{" "}
                    <Link
                        href="/auth/signin"
                        className="text-primary hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default VendorSignUpForm;
