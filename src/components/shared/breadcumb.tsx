"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Breadcumb: FC = () => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);
    const lastIndex = pathnames.length - 1;
    const title = pathnames[lastIndex].replace(/-/g, " ");
    return (
        <section className="relative table w-full py-5 lg:pb-10 bg-gray-100">
            <div className="container mx-auto px-4 lg:px-0 relative">
                <div className="grid grid-cols-1 mt-12">
                    <h3 className="text-3xl capitalize leading-normal font-semibold">
                        {title}
                    </h3>
                </div>
                <div className="relative mt-3 mb-8">
                    <ul className="tracking-[0.5px] mb-0 inline-block">
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500">
                            <Link href="/">Home</Link>
                        </li>

                        {pathnames.map((value, index) => {
                            const currentPath = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return isLast ? (
                                <>
                                    <li className="inline-block text-base text-slate-950  mx-0.5">
                                        <ChevronRight
                                            size={15}
                                            className="inline"
                                        />
                                    </li>
                                    <li
                                        key={index}
                                        className="inline-block uppercase text-[13px] font-bold text-orange-500"
                                        aria-current="page"
                                    >
                                        {value.replace(/-/g, " ")}
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="inline-block text-base text-slate-950  mx-0.5">
                                        <ChevronRight
                                            size={15}
                                            className="inline"
                                        />
                                    </li>
                                    <li
                                        key={index}
                                        className="inline-block uppercase text-[13px] font-bold text-orange-500"
                                        aria-current="page"
                                    >
                                        <Link href={currentPath}>
                                            {value.replace(/-/g, " ")}
                                        </Link>
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Breadcumb;
