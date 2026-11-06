"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
    images: string[];
    alt: string;
};

/**
 * The only interactive part of the product page. Everything around it stays a
 * server component, so the page still ships as static HTML plus a small island.
 */
export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const gallery = images.length > 0 ? images : [];
    const active = gallery[activeIndex];

    return (
        <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
                {active ? (
                    <Image
                        src={active}
                        alt={alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 92vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {gallery.length > 1 && (
                <ul
                    className="grid grid-cols-4 gap-3 sm:grid-cols-5"
                    aria-label="Product images"
                >
                    {gallery.map((image, index) => (
                        <li key={image}>
                            <button
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Show image ${index + 1}`}
                                aria-current={index === activeIndex}
                                className={cn(
                                    "relative aspect-square w-full overflow-hidden rounded-lg border bg-muted transition",
                                    index === activeIndex
                                        ? "border-primary ring-2 ring-primary/30"
                                        : "hover:border-foreground/25"
                                )}
                            >
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    sizes="120px"
                                    className="object-cover"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}