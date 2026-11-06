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
            <div className="flex items-start gap-3 rounded-xl border bg-card p-5">
                <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-success"
                    aria-hidden
                />
                <div>
                    <p className="text-sm font-semibold">You are subscribed</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        We will send the next round-up to {email}. Unsubscribe
                        anytime from the footer of any email.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                </label>
                <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full rounded-lg border border-input bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                <button
                    type="submit"
                    disabled={isLoading || !email || !agreed}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send className="h-4 w-4" aria-hidden />
                    {isLoading ? "Subscribing…" : "Subscribe"}
                </button>
            </div>

            <div className="mt-3 flex items-start gap-2">
                <input
                    id="newsletter-terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                />
                <label
                    htmlFor="newsletter-terms"
                    className="text-xs leading-relaxed text-muted-foreground"
                >
                    I agree to receive occasional product updates and accept the
                    privacy policy. No spam, unsubscribe anytime.
                </label>
            </div>
        </form>
    );
}
