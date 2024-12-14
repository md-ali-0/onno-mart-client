"use client";

import { useSession } from "@/provider/session-provider";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface ReviewDialogProps {
    productId: string;
    open: boolean;
    onClose: () => void;
}

interface FormInputProps {
    comment: string;
}

export default function ReviewDialog({
    productId,
    open,
    onClose,
}: ReviewDialogProps) {
    const form = useForm<FormInputProps>({
        defaultValues: {
            comment: "",
        },
    });
    const { reset } = form;

    const { session } = useSession();
    const [selectedRating, setSelectedRating] = useState<number>(0);

    const [createReview, { isSuccess, isLoading, isError, error }] =
        useCreateReviewMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Review Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        reset({
            comment: "",
        });
        setSelectedRating(0)
    }, [isSuccess, reset]);

    const onSubmit = async (data: FormInputProps) => {
        const loadingToast = toast.loading("Review is Creating...");
        const reviewData = {
            userId: session?.user,
            productId,
            rating: selectedRating,
            comment: data.comment,
        };
        await createReview(reviewData);
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">Give a Rating</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate Your Experience</DialogTitle>
                    <DialogDescription>
                        Please provide your rating and feedback. Click submit
                        when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <div className="flex items-center justify-center gap-2">
                            {/* Rating selection */}
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Star
                                    key={rating}
                                    onClick={() => setSelectedRating(rating)}
                                    className={`size-8 cursor-pointer ${
                                        selectedRating >= rating
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-gray-300 text-gray-300"
                                    } rounded-full`}
                                ></Star>
                            ))}
                        </div>
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel htmlFor="comment">
                                        Comment
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="comment"
                                            maxLength={150}
                                            placeholder="Write your comment here..."
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={!selectedRating || isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
