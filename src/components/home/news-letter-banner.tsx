import { BellRing, ShieldCheck, Tag } from "lucide-react";
import NewsletterFields from "./newsletter-fields";

const perks = [
    { icon: Tag, label: "Price drops first" },
    { icon: BellRing, label: "One email a week" },
    { icon: ShieldCheck, label: "No spam, ever" },
];

/** Server wrapper: the copy is static HTML, only the form hydrates. */
export default function NewsletterSection() {
    return (
        <section id="newsletter" className="section scroll-mt-24 pt-0">
            <div className="container-page">
                <div className="surface-muted grid gap-8 rounded-2xl border px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14">
                    <div>
                        <p className="eyebrow">Stay in the loop</p>
                        <h2 className="section-heading mt-2">
                            Deals worth opening an email for.
                        </h2>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                            New arrivals, genuine price drops and offers from
                            verified shops — once a week, nothing more.
                        </p>

                        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {perks.map(({ icon: Icon, label }) => (
                                <li
                                    key={label}
                                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                                >
                                    <Icon
                                        className="h-3.5 w-3.5 text-primary"
                                        aria-hidden
                                    />
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <NewsletterFields />
                </div>
            </div>
        </section>
    );
}
