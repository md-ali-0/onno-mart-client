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
                    className="fixed bottom-8 right-6 z-50 cursor-pointer rounded-md bg-primary p-2 text-primary-foreground shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={scrollToTop}
                >
                    <ArrowUp className="size-5" />
                    <span className="sr-only">Back to top</span>
                </div>
            )}
        </>
    );
}

export default BackToTop;
