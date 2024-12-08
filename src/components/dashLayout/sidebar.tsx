// import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import SideBarMenuItem from "./sidebar-menu-item";
import SidebarSubMenu from "./sidebar-submenu";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <aside>
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-gray-900 border-r border-gray-800 min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen
                        ? "translate-x-0 ease-out"
                        : "-translate-x-full ease-in"
                }`}
            >
                <div className="flex items-center justify-center border-b border-gray-800 py-3 h-16">
                    <Link href="/" className="text-white">
                        {/* <Image
                            src={logo}
                            alt=""
                            width={112}
                            height={50}
                            className="invert w-28"
                        /> */}
                        MobInfo
                    </Link>
                </div>
                <div className="overflow-y-auto custom-scroll">
                    <nav className="mt-5 px-3">
                        <ul>
                            <h4 className="text-gray-400 font-semibold text-xs mb-1">
                                Main
                            </h4>

                            <SideBarMenuItem
                                menu={{
                                    name: "Dashboard",
                                    icon: "LayoutDashboard",
                                    path: "/dashboard",
                                }}
                                setSidebarOpen={setSidebarOpen}
                            />
                            <SidebarSubMenu
                                menu={{
                                    name: "Brand",
                                    icon: "Hexagon",
                                }}
                                subMenu={[
                                    {
                                        name: "Create Brand",
                                        path: "/dashboard/create-brand",
                                    },
                                    {
                                        name: "All Brands",
                                        path: "/dashboard/brands",
                                    },
                                ]}
                                setSidebarOpen={setSidebarOpen}
                            ></SidebarSubMenu>
                            <SidebarSubMenu
                                menu={{
                                    name: "Category",
                                    icon: "SquareSlash",
                                }}
                                subMenu={[
                                    {
                                        name: "Create Category",
                                        path: "/dashboard/create-category",
                                    },
                                    {
                                        name: "All Categories",
                                        path: "/dashboard/categories",
                                    },
                                ]}
                                setSidebarOpen={setSidebarOpen}
                            ></SidebarSubMenu>
                            <SidebarSubMenu
                                menu={{
                                    name: "Product",
                                    icon: "ShoppingBasket",
                                }}
                                subMenu={[
                                    {
                                        name: "Create Product",
                                        path: "/dashboard/create-product",
                                    },
                                    {
                                        name: "All Products",
                                        path: "/dashboard/products",
                                    },
                                ]}
                                setSidebarOpen={setSidebarOpen}
                            ></SidebarSubMenu>
                            <SideBarMenuItem
                                menu={{
                                    name: "Ratings",
                                    icon: "StarHalf",
                                    path: "/dashboard/ratings",
                                }}
                                setSidebarOpen={setSidebarOpen}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Users",
                                    icon: "Users",
                                    path: "/dashboard/all-users",
                                }}
                                setSidebarOpen={setSidebarOpen}
                            />

                            <h4 className="text-gray-400 font-semibold text-xs mt-2">
                                Settings
                            </h4>
                            <SideBarMenuItem
                                menu={{
                                    name: "Settings",
                                    icon: "Settings",
                                    path: "/dashboard/settings",
                                }}
                                setSidebarOpen={setSidebarOpen}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Back to Home",
                                    icon: "House",
                                    path: "/",
                                }}
                                setSidebarOpen={setSidebarOpen}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
