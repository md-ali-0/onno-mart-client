"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Breadcumb: FC = () => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);
    const lastIndex = pathnames.length - 1;
    const title = pathnames[lastIndex].replace(/-/g, " ")
    return (
        <div className="bg-white dark:bg-gray-900 border-b">
            <div className="container mx-auto px-5 sm:px-8 py-5 flex justify-between items-center">
                <h1 className="text-xl capitalize font-semibold">{title}</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li className="flex items-center space-x-2">
                            <Link
                                href="/"
                                className="text-slate-950 dark:text-gray-100 hover:underline"
                            >
                                Home
                            </Link>
                        </li>
                       
                        {pathnames.map((value, index) => {
                            const currentPath = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return isLast ? (
                                <li
                                    key={index}
                                    className="flex items-center text-gray-600 dark:text-gray-200 space-x-2"
                                >
                                    <span>/</span>
                                    <span className="capitalize">
                                        {value.replace(/-/g, " ")}
                                    </span>
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className="flex items-center space-x-2"
                                >
                                     <span>/</span>
                                    <Link
                                        href={currentPath}
                                        className="text-slate-950 dark:text-gray-100 hover:underline capitalize"
                                    >
                                        {value.replace(/-/g, " ")}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Breadcumb;
