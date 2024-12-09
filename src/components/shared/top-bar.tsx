"use client";

import { ChevronDown } from "lucide-react";
import { FC } from "react";

const TopBar: FC = () => {
    return (
        <div className="hidden border-b border-stroke bg-primary text-white sm:block">
            <div className="container mx-auto px-5 sm:px-8 py-2">
                <div className="flex flex-wrap justify-between items-center">
                    <ul className="-mx-3 flex items-center gap-3.5">
                        <li>
                            <a
                                href="#"
                                className="inline-block text-sm font-medium text-body-color hover:text-primary dark:text-dark-6"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="inline-block text-sm font-medium text-body-color hover:text-primary dark:text-dark-6"
                            >
                                Order Tracking
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="inline-block text-sm font-medium text-body-color hover:text-primary dark:text-dark-6"
                            >
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="inline-block text-sm font-medium text-body-color hover:text-primary dark:text-dark-6"
                            >
                                FAQs
                            </a>
                        </li>
                    </ul>
                    <div className="hidden items-center justify-end md:flex">
                        <div>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-lg bg-transparent pl-3 pr-5 text-sm font-medium text-body-color outline-none transition dark:text-dark-6">
                                    <option value="" className="text-black dark:bg-dark-2">
                                        English
                                    </option>
                                    <option value="" className="text-black dark:bg-dark-2">
                                        Urdu
                                    </option>
                                    <option value="" className="text-black dark:bg-dark-2">
                                        Hindi
                                    </option>
                                </select>
                                <ChevronDown
                                    size={15}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-body-color dark:text-dark-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-lg bg-transparent pl-3 pr-5 text-sm font-medium text-body-color outline-none transition dark:text-dark-6">
                                    <option value="" className="text-black dark:bg-dark-2">
                                        USD
                                    </option>
                                    <option value="" className="text-black dark:bg-dark-2">
                                        INR
                                    </option>
                                    <option value="" className="text-black dark:bg-dark-2">
                                        ERU
                                    </option>
                                </select>
                                <ChevronDown
                                    size={15}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-body-color dark:text-dark-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
