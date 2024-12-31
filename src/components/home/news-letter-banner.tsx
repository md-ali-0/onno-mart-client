"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CheckCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !agreed) {
            toast.error("Please fill in all fields and accept the terms");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubscribed(true);
        toast.success("Successfully subscribed to newsletter!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto py-8"
        >
            <div className="bg-primary rounded-xl px-4 sm:px-8 py-5">
                {!isSubscribed ? (
                    <>
                        <div className="text-center mb-3.5">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-primary/80 font-medium mb-2 flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                SUBSCRIBE AREA
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-bold tracking-tight text-white mb-4"
                            >
                                Sign Up For Latest News
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white"
                            >
                                Join our newsletter and stay updated with the
                                latest trends and insights.
                            </motion.p>
                        </div>

                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div className="relative max-w-md mx-auto">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 pl-4 pr-32 text-base"
                                    required
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !email || !agreed}
                                    className="absolute right-1 top-1 h-10"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Subscribe
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="flex justify-center items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    className="border-white bg-white"
                                    checked={agreed}
                                    onCheckedChange={(checked) =>
                                        setAgreed(checked as boolean)
                                    }
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the terms of service
                                </label>
                            </div>
                        </motion.form>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4 p-8"
                    >
                        <CheckCircle className="w-16 h-16 text-white mx-auto" />
                        <h3 className="text-2xl font-semibold text-white">
                            Thank You for Subscribing!
                        </h3>
                        <p className="text-white">
                            We&apos;ll keep you updated with the latest news and
                            updates.
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
