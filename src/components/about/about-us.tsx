import bannerImage from "@/assets/banner/about.jpg";
import Image from "next/image";

const AboutUsSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-20">
            <div className="container">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 text-sm rounded-lg bg-muted">
                            About Us
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Discover the Difference with Sports Mart
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            At Sports Mart, we&apos;re passionate about
                            providing high-quality products and exceptional
                            customer service. Our mission is to make your
                            shopping experience seamless and enjoyable.
                        </p>
                    </div>
                    <Image
                        src={bannerImage.src}
                        width="550"
                        height="350"
                        alt="About Us"
                        className="object-center mx-auto overflow-hidden aspect-video rounded-xl sm:w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
