/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/provider/session-provider";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const SignInForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();

    const { setIsLoading } = useSession();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleQuickSetCredentials = (email: string, password: string) => {
        setCredentials({ email, password });
        setValue("email", email);
        setValue("password", password);
        toast.success(`Credentials set for ${email}`);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const response = await signin(data);

        if (response.success) {
            localStorage.setItem("accessToken", response.data);
            toast.success("Logged in successfully");
            // Full reload so the header and every server component pick up the
            // new session cookie; a client-side push kept the old guest state.
            setTimeout(() => window.location.assign("/"), 400);
        } else {
            toast.error(response?.message || "Login failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="p-8 rounded-xl bg-white border">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
                Sign in
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Email</label>
                    <div>
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
                </div>
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                    <div>
                        <Input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
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
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember-me" {...register("rememberMe")} />
                        <Label htmlFor="remember-me" className="ml-2 block text-sm">
                            Keep me signed in
                        </Label>
                    </div>
                    <div className="text-sm">
                        <Link
                            href="/auth/forgot-password"
                            className="text-primary hover:underline font-semibold"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="!mt-8">
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </div>

                <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="text-primary hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                        Register here
                    </Link>
                </p>
            </form>

            {/* Quick login credentials */}
            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-800">Admin: admin@onnomart.dev / OnnoMart@123</span>
                    <Button
                        onClick={() => handleQuickSetCredentials("admin@onnomart.dev", "OnnoMart@123")}
                        className="bg-blue-600 text-white"
                        variant="default"
                    >
                        Copy Admin
                    </Button>
                </div>
                <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
                    <span className="text-green-800">Vendor: gadget@onnomart.dev / OnnoMart@123</span>
                    <Button
                        onClick={() => handleQuickSetCredentials("gadget@onnomart.dev", "OnnoMart@123")}
                        className="bg-green-600 text-white"
                        variant="default"
                    >
                        Copy Vendor
                    </Button>
                </div>
                <div className="flex items-center justify-between bg-purple-100 p-3 rounded-lg">
                    <span className="text-purple-800">Customer: customer@onnomart.dev / OnnoMart@123</span>
                    <Button
                        onClick={() => handleQuickSetCredentials("customer@onnomart.dev", "OnnoMart@123")}
                        className="bg-purple-600 text-white"
                        variant="default"
                    >
                        Copy Customer
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
