"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function BackToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {showButton && (
                <div
                    className="fixed bottom-6 right-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center border border-foreground/20 bg-background text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2"
                    onClick={scrollToTop}
                >
                    <ArrowUp className="size-4" />
                    <span className="sr-only">Back to top</span>
                </div>
            )}
        </>
    );
}

export default BackToTop;
