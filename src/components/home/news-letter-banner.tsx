import NewsletterFields from "./newsletter-fields";

/** Server wrapper: the copy is static HTML, only the form hydrates. */
export default function NewsletterSection() {
    return (
        <section id="newsletter" className="scroll-mt-24 border-t">
            <div className="container-page">
                <div className="mx-auto max-w-xl py-16 text-center sm:py-20">
                    <p className="eyebrow">The list</p>
                    <h2 className="mt-4 font-display text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[42px]">
                        Occasional notes, worth reading.
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                        New arrivals and quiet price drops, once a week. No
                        spam, unsubscribe anytime.
                    </p>

                    <div className="mt-8 text-left">
                        <NewsletterFields />
                    </div>
                </div>
            </div>
        </section>
    );
}
