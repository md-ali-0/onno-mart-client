import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Countdown from "./countdown";

/** A quiet ink band instead of a loud coloured banner. */
export default function FlashSale() {
    return (
        <section className="pb-4 pt-2">
            <div className="container-page">
                <div className="flex flex-col gap-6 bg-primary px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
                    <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-primary-foreground/70">
                            Ends at midnight
                        </p>
                        <h2 className="mt-2 font-display text-[30px] leading-none tracking-[-0.02em] text-primary-foreground sm:text-[34px]">
                            The private sale
                        </h2>
                    </div>

                    <Countdown />

                    <Link
                        href="/flash-sale"
                        className="inline-flex w-fit items-center gap-2 border border-primary-foreground/40 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-primary-foreground hover:text-primary"
                    >
                        Up to 40% off
                        <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
}
