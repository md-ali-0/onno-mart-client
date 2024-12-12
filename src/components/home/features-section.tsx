import Image from "next/image";

export default function FeaturesSection() {
    return (
        <section className="my-10 sm:my-14">
            <div className="container  px-4 lg:px-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white shadow-md px-5 py-3.5 rounded-xl">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="https://demo.shopperz.xyz/storage/4/conversions/professional_service-thumb.png"
                                alt="benefit"
                                className="w-7"
                                width={30}
                                height={30}
                            />
                            <h4 className="text-base font-semibold capitalize">
                                Professional Service
                            </h4>
                        </div>
                        <p className="text-sm">
                            Efficient customer support from passionate team
                        </p>
                    </div>
                    <div className="bg-white shadow-md px-5 py-3.5 rounded-xl">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="https://demo.shopperz.xyz/storage/5/conversions/secure_payment-thumb.png"
                                alt="benefit"
                                className="w-7"
                                width={30}
                                height={30}
                            />
                            <h4 className="text-base font-semibold capitalize">
                                Secure Payment
                            </h4>
                        </div>
                        <p className="text-sm">
                            Different secure payment methods
                        </p>
                    </div>
                    <div className="bg-white shadow-md px-5 py-3.5 rounded-xl">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="https://demo.shopperz.xyz/storage/6/conversions/fast_delivery-thumb.png"
                                alt="benefit"
                                className="w-7"
                                width={30}
                                height={30}
                            />
                            <h4 className="text-base font-semibold capitalize">
                                Fast Delivery
                            </h4>
                        </div>
                        <p className="text-sm">
                            Fast and convenient door to door delivery
                        </p>
                    </div>
                    <div className="bg-white shadow-md px-5 py-3.5 rounded-xl">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="https://demo.shopperz.xyz/storage/7/conversions/quality_&_savings-thumb.png"
                                alt="benefit"
                                className="w-7"
                                width={30}
                                height={30}
                            />
                            <h4 className="text-base font-semibold capitalize">
                                Quality &amp; Savings
                            </h4>
                        </div>
                        <p className="text-sm">
                            Comprehensive quality control and affordable prices
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
