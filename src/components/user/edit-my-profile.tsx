/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signout } from "@/actions/auth";
import { useSession } from "@/provider/session-provider";
import {
    useGetMeQuery,
    useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import DeleteDialog from "../shared/delete-dialog";
import Loading from "../shared/loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EditMyProfile: FC = () => {
    const { data: user, isLoading } = useGetMeQuery(undefined);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const router = useRouter();
    const { session } = useSession();
    const [updateProfile, { isSuccess, isError, error }] =
        useUpdateProfileMutation();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            avatar: "",
            phone: "",
            city: "",
            state: "",
            zip_code: "",
            country: "",
            address: "",
        },
    });

    useEffect(() => {
        // Reset form values when user data is available
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                state: user.state,
                zip_code: user.zip_code,
                country: user.country,
                address: user.address,
            });
        }
    }, [user, reset]);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Profile Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    const onSubmit = async (data: any) => {
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            state: data.state,
            zip_code: data.zip_code,
            country: data.country,
            address: data.address,
        };

        const formData = new FormData();
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }
        formData.append("data", JSON.stringify(userData));
        const loadingToast = toast.loading("Profile is Updating...");
        await updateProfile(formData);
        toast.dismiss(loadingToast);
    };

    const hanldePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;

        if (password === confirm_password) {
            await updateProfile({ password });
            console.log(password);
        } else {
            toast.error("Password not Machted");
        }
    };

    const handleDelete = async () => {
        await updateProfile({ isDeleted: true });
        await signout();
        toast.success("You are redirecting to login page....", {
            duration: 2000,
        });
        setTimeout(() => router.push("/login"), 2000);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="p-6 rounded-md border dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <h5 className="text-lg font-semibold mb-4">
                    Personal Detail :
                </h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                        <div>
                            <label className="form-label font-medium">
                                Full Name :{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Full Name"
                                            defaultValue={user?.name}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="form-label font-medium">
                                Your Email :{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                Profile Picture :{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="avatar"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            type="file"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.files?.[0]
                                                )
                                            }
                                            placeholder="Profile Picture"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                Phone :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Phone Number"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                City :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="city"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="City"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                State :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="state"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="State"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                Postal Code :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="zip_code"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Postal Code"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                Country :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="country"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Country"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="form-label font-medium">
                                Address :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Address"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    {/*end row*/}
                    <div className="pt-5">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>

            {/* Change Password Section */}
            <div className="p-6 rounded-md border dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <h5 className="text-lg font-semibold mb-4">
                    Change password :
                </h5>
                <form onSubmit={hanldePasswordChange}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="form-label font-medium">
                                New password :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="New password"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label font-medium">
                                Re-type New password :
                            </label>
                            <div className="form-icon relative mt-2">
                                <Input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Re-type New password"
                                />
                            </div>
                        </div>
                    </div>
                    {/*end grid*/}
                    <div className="pt-5">
                        <Button type="submit">Save password</Button>
                    </div>
                </form>
            </div>

            {/* Delete Account Section */}
            <div className="p-6 rounded-md border dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <h5 className="text-lg font-semibold mb-5 text-red-600">
                    Delete Account :
                </h5>
                <p className="text-slate-400 mb-4">
                    Do you want to delete the account? Please press below
                    &quot;Delete&quot; button. After Delete You Can&quot;t
                    undone.
                </p>
                <Button
                    variant={"destructive"}
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    Delete
                </Button>
            </div>
            <DeleteDialog
                id={session?.user as unknown as string}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default EditMyProfile;
