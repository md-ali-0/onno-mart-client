"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
    console.error("An error occurred:", error);
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="grid gap-4">
                    <div>
                        <div className="mx-auto h-12 w-12 text-primary" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            500 Internal Server Error
                        </h1>
                        <p className="mt-4 text-muted-foreground">
                            There was a problem on the server side. Please try
                            again later.
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
