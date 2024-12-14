import StarRating from "@/components/product/star-rating";
import { getProductBySlug } from "@/lib/get-products";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "./product-actions";

async function getProduct(slug: string) {
    // This is a mock function. In a real app, you'd fetch this data from an API or database
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return product;
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = await getProduct(params.slug);

    return (
        <section className="relative md:py-24 py-16">
            <div className="container px-4 lg:px-0 relative">
                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="lg:col-span-5">
                        <div className="grid md:grid-cols-12 gap-3">
                            <div className="group md:col-span-12">
                                <div className="duration-500 group-hover:scale-105">
                                    <Image
                                        src={
                                            product.thumbnail as unknown as string
                                        }
                                        className="w-full"
                                        width={500}
                                        height={450}
                                        alt=""
                                    />
                                </div>
                            </div>
                            {product.images.map((image, key) => (
                                <div key={key} className="group md:col-span-6">
                                    <div className="duration-500 group-hover:scale-105">
                                        <Image
                                            src={image.url as unknown as string}
                                            className="w-full"
                                            width={500}
                                            height={450}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="sticky top-20">
                            <h5 className="text-2xl font-semibold">
                                {product?.name}
                            </h5>
                            <div className="flex items-center mt-2 gap-5">
                                <span className="text-slate-400 font-semibold me-1">
                                    $16USD{" "}
                                    <del className="text-red-600">$21USD</del>
                                </span>
                                <div className="inline-flex gap-2">
                                    <StarRating rating={4} maxRating={5} /> 4.8
                                    (45)
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">
                                    Overview :
                                </h5>
                                <p className="text-slate-400 mt-2">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Vero exercitationem, unde
                                    molestiae sint quae inventore atque minima
                                    natus fugiat nihil quisquam voluptates ea
                                    omnis. Modi laborum soluta tempore unde
                                    accusantium.
                                </p>
                                <ul className="list-none text-slate-400 mt-4">
                                    <li className="mb-1 flex ms-0">
                                        <i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2" />{" "}
                                        Digital Marketing Solutions for Tomorrow
                                    </li>
                                    <li className="mb-1 flex ms-0">
                                        <i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2" />{" "}
                                        Our Talented &amp; Experienced Marketing
                                        Agency
                                    </li>
                                    <li className="mb-1 flex ms-0">
                                        <i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2" />{" "}
                                        Create your own skin to match your brand
                                    </li>
                                </ul>
                            </div>
                            <ProductActions product={product}/>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
                    <div className="lg:col-span-3 md:col-span-5">
                        <div className="sticky top-20">
                            <ul
                                className="flex-column p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
                                id="myTab"
                                data-tabs-toggle="#myTabContent"
                                role="tablist"
                            >
                                <li className="ms-0">
                                    <button className="px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ">
                                        Description
                                    </button>
                                </li>
                                <li className="ms-0">
                                    <button className="px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ">
                                        Additional Information
                                    </button>
                                </li>
                                <li className="ms-0">
                                    <button className="px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 text-white bg-orange-500 hover:text-white">
                                        Review
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-9 md:col-span-7">
                        <div
                            id="myTabContent"
                            className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
                        >
                            <div>
                                <div className="mt-8 first:mt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src="/static/media/01.5fa6455abf6536cb1885.jpg"
                                                className="h-11 w-11 rounded-full shadow"
                                                alt=""
                                            />
                                            <div className="ms-3 flex-1">
                                                <a
                                                    className="text-lg font-semibold hover:text-orange-500 duration-500"
                                                    href="/product-detail-one/3"
                                                >
                                                    Calvin Carlo
                                                </a>
                                                <p className="text-sm text-slate-400">
                                                    13th March 2024 at 01:00 pm
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            className="text-slate-400 hover:text-orange-500 duration-500 ms-5"
                                            href="/product-detail-one/3"
                                        >
                                            <i className="mdi mdi-reply" />{" "}
                                            Reply
                                        </a>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                                        <ul className="list-none inline-block text-orange-400">
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline text-slate-400 font-semibold">
                                                5.0
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 italic">
                                            " There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour "
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 first:mt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src="/static/media/02.b98e5c0bb7d12e4c5e77.jpg"
                                                className="h-11 w-11 rounded-full shadow"
                                                alt=""
                                            />
                                            <div className="ms-3 flex-1">
                                                <a
                                                    className="text-lg font-semibold hover:text-orange-500 duration-500"
                                                    href="/product-detail-one/3"
                                                >
                                                    Calvin Carlo
                                                </a>
                                                <p className="text-sm text-slate-400">
                                                    5th May 2024 at 10:00 am
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            className="text-slate-400 hover:text-orange-500 duration-500 ms-5"
                                            href="/product-detail-one/3"
                                        >
                                            <i className="mdi mdi-reply" />{" "}
                                            Reply
                                        </a>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                                        <ul className="list-none inline-block text-orange-400">
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline text-slate-400 font-semibold">
                                                5.0
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 italic">
                                            " There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour "
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 first:mt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src="/static/media/03.2dd33f5f871860bfe7a6.jpg"
                                                className="h-11 w-11 rounded-full shadow"
                                                alt=""
                                            />
                                            <div className="ms-3 flex-1">
                                                <a
                                                    className="text-lg font-semibold hover:text-orange-500 duration-500"
                                                    href="/product-detail-one/3"
                                                >
                                                    Calvin Carlo
                                                </a>
                                                <p className="text-sm text-slate-400">
                                                    19th June 2024 at 00:00 1m
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            className="text-slate-400 hover:text-orange-500 duration-500 ms-5"
                                            href="/product-detail-one/3"
                                        >
                                            <i className="mdi mdi-reply" />{" "}
                                            Reply
                                        </a>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                                        <ul className="list-none inline-block text-orange-400">
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline text-slate-400 font-semibold">
                                                5.0
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 italic">
                                            " There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour "
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 first:mt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src="/static/media/04.83a0e432316fac374b37.jpg"
                                                className="h-11 w-11 rounded-full shadow"
                                                alt=""
                                            />
                                            <div className="ms-3 flex-1">
                                                <a
                                                    className="text-lg font-semibold hover:text-orange-500 duration-500"
                                                    href="/product-detail-one/3"
                                                >
                                                    Calvin Carlo
                                                </a>
                                                <p className="text-sm text-slate-400">
                                                    20th June 2024 at 01:30 pm
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            className="text-slate-400 hover:text-orange-500 duration-500 ms-5"
                                            href="/product-detail-one/3"
                                        >
                                            <i className="mdi mdi-reply" />{" "}
                                            Reply
                                        </a>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                                        <ul className="list-none inline-block text-orange-400">
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline">
                                                <i className="mdi mdi-star text-lg" />
                                            </li>
                                            <li className="inline text-slate-400 font-semibold">
                                                5.0
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 italic">
                                            " There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have suffered
                                            alteration in some form, by injected
                                            humour "
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                                    <h5 className="text-lg font-semibold">
                                        Leave A Comment:
                                    </h5>
                                    <form className="mt-8">
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-start">
                                                    <label
                                                        htmlFor="name"
                                                        className="font-semibold"
                                                    >
                                                        Your Name:
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeWidth={2}
                                                            viewBox="0 0 24 24"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="w-4 h-4 absolute top-3 start-4"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                            <circle
                                                                cx={12}
                                                                cy={7}
                                                                r={4}
                                                            />
                                                        </svg>
                                                        <input
                                                            name="name"
                                                            id="name"
                                                            type="text"
                                                            className="ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                            placeholder="Name :"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-start">
                                                    <label
                                                        htmlFor="email"
                                                        className="font-semibold"
                                                    >
                                                        Your Email:
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeWidth={2}
                                                            viewBox="0 0 24 24"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="w-4 h-4 absolute top-3 start-4"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                            <polyline points="22,6 12,13 2,6" />
                                                        </svg>
                                                        <input
                                                            name="email"
                                                            id="email"
                                                            type="email"
                                                            className="ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                            placeholder="Email :"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <div className="text-start">
                                                    <label
                                                        htmlFor="comments"
                                                        className="font-semibold"
                                                    >
                                                        Your Comment:
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeWidth={2}
                                                            viewBox="0 0 24 24"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="w-4 h-4 absolute top-3 start-4"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                                        </svg>
                                                        <textarea
                                                            name="comments"
                                                            id="comments"
                                                            className="ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                            placeholder="Message :"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            id="submit"
                                            name="send"
                                            className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md w-full"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
