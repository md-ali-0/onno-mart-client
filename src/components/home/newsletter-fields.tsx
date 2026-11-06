"use client";

import { useCreateNewsletterMutation } from "@/redux/features/newsletter/newsletterApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

/** The only interactive part of the newsletter section. */
export default function NewsletterFields() {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [submitNewsletter, { isSuccess, isLoading, isError, error }] =
        useCreateNewsletterMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const message =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";
            toast.error(
                message === "Duplicate Key error"
                    ? "You are already subscribed"
                    : message
            );
        }
        if (isSuccess) toast.success("You are on the list. Welcome!");
    }, [error, isError, isSuccess]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !agreed) {
            toast.error("Enter your email and accept the terms first");
            return;
        }
        await submitNewsletter({ email });
    };

    if (isSuccess) {
        return (
            <div className="flex items-start gap-3 border bg-card px-5 py-4">
                <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-success"
                    aria-hidden
                />
                <div>
                    <p className="text-[15px] font-semibold">You are subscribed</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                        The next round-up goes to {email}. Unsubscribe anytime
                        from the footer of any email.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="newsletter-email" className="sr-only">
                Email address
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
                <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full flex-1 border-0 border-b border-foreground/25 bg-transparent px-0 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                />
                <button
                    type="submit"
                    disabled={isLoading || !email || !agreed}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-foreground px-7 text-[10px] font-medium uppercase tracking-[0.16em] text-background transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send className="h-3.5 w-3.5" aria-hidden />
                    {isLoading ? "Subscribing" : "Subscribe"}
                </button>
            </div>

            <div className="mt-3 flex items-start gap-2">
                <input
                    id="newsletter-terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
                />
                <label
                    htmlFor="newsletter-terms"
                    className="text-[11px] leading-relaxed text-muted-foreground"
                >
                    I agree to receive occasional product updates and accept the
                    privacy policy.
                </label>
            </div>
        </form>
    );
}
