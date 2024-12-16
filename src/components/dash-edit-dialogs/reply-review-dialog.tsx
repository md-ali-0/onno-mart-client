"use client";

import { useSession } from "@/provider/session-provider";
import { useCreateReplyMutation } from "@/redux/features/review/reviewApi";
import { ErrorResponse, Review } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
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

interface ReplyDialogProps {
    review: Review;
    open: boolean;
    onClose: () => void;
}

interface FormInputProps {
    comment: string;
}

export default function ReplyDialog({
    review,
    open,
    onClose,
}: ReplyDialogProps) {
    const form = useForm<FormInputProps>({
        defaultValues: {
            comment: "",
        },
    });
    const { reset } = form;

    const { session } = useSession();

    const [createReply, { isSuccess, isLoading, isError, error }] =
        useCreateReplyMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Reply Successfully Added");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        reset({
            comment: "",
        });
    }, [isSuccess, reset]);

    const onSubmit = async (data: FormInputProps) => {
        const loadingToast = toast.loading("Adding Reply...");
        const replyData = {
            userId: session?.user,
            reviewId: review.id,
            comment: data.comment,
        };
        await createReply(replyData);
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reply to Review</DialogTitle>
                    <DialogDescription>
                        Write a reply to this review. Click submit when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
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
                                            placeholder="Write your reply here..."
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
