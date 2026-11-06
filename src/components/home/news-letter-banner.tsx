import NewsletterFields from "./newsletter-fields";

const perks = ["Price drops first", "One email a week", "No spam, ever"];

/** Server wrapper: the copy is static HTML, only the form hydrates. */
export default function NewsletterSection() {
    return (
        <section id="newsletter" className="scroll-mt-24 border-t">
            <div className="container-page">
                <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
                    <div>
                        <p className="label-caps">Newsletter</p>
                        <h2 className="mt-3 max-w-[18ch] font-display text-[30px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[38px]">
                            Deals worth opening an email for.
                        </h2>
                        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                            New arrivals, genuine price drops and offers from
                            verified shops. Once a week, nothing more.
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                            {perks.map((perk) => (
                                <li key={perk} className="label-caps">
                                    {perk}
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
