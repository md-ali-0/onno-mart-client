import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Countdown from "./countdown";

/** Promotional band only — the discounted products live in the trending grid. */
export default function FlashSale() {
    return (
        <section className="pb-2 pt-4">
            <div className="container-page">
                <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-5 text-primary-foreground sm:px-7">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10"
                    />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                <Zap className="h-5 w-5" aria-hidden />
                            </span>
                            <div>
                                <p className="text-[17px] font-bold leading-tight">
                                    Flash sale
                                </p>
                                <p className="text-[11px] text-primary-foreground/80">
                                    Limited time offers. Grab them before they
                                    are gone.
                                </p>
                            </div>
                        </div>

                        <Countdown />

                        <Link
                            href="/flash-sale"
                            className="inline-flex h-10 w-fit items-center gap-1.5 rounded-lg bg-card px-4 text-[12px] font-semibold text-primary transition-colors hover:bg-card/90"
                        >
                            Up to 40% off
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
