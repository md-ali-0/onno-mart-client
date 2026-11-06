"use client";

import { formatPrice } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useGetBestSellingProductsQuery,
    useGetTopRatedProductsQuery,
} from "@/redux/features/product/productApi";
import { useGetDashboardStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { revalidateCatalogue } from "@/actions/revalidate";
import { Boxes, Plus, RefreshCw, Ticket, Truck } from "lucide-react";
import Link from "next/link";

const DashboardCharts = dynamic(
    () => import("@/components/dash-charts/dashboard-charts"),
    {
        ssr: false,
        loading: () => (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <div className="skeleton h-[340px] sm:col-span-4" />
                <div className="skeleton h-[340px] sm:col-span-3" />
            </div>
        ),
    }
);

const QUICK_ACTIONS = [
    { href: "/dashboard/create-product", label: "New product", icon: Plus },
    { href: "/dashboard/create-category", label: "New category", icon: Boxes },
    { href: "/dashboard/create-coupon", label: "New coupon", icon: Ticket },
    { href: "/dashboard/order-history", label: "Orders", icon: Truck },
] as const;

export default function Dashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        const result = await revalidateCatalogue([
            "products",
            "categories",
            "brands",
            "shops",
        ]);
        setIsRefreshing(false);
        if (result.ok) {
            toast.success("Storefront cache refreshed");
        } else {
            toast.error("You are not allowed to do that");
        }
    };

    const { data, isError, isLoading, isSuccess, error } =
        useGetDashboardStatisticsQuery(undefined);

    const { data: bestSellingProducts = [], isLoading: isBestSellingLoading } =
        useGetBestSellingProductsQuery([{ name: "limit", value: 4 }]);
    const { data: topRatedProducts = [], isLoading: isTopRatedLoading } =
        useGetTopRatedProductsQuery([{ name: "limit", value: 4 }]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);
    if (isLoading) {
    }
    return (
        <div className="flex-col md:flex">
            <div className="flex-1 space-y-4 sm:p-8 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-[26px] font-bold tracking-tight">
                            Dashboard
                        </h2>
                        <p className="mt-0.5 text-[13px] text-muted-foreground">
                            Catalogue, orders and shops at a glance.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-primary/30 px-3.5 text-[13px] font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
                    >
                        <RefreshCw
                            className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                            aria-hidden
                        />
                        {isRefreshing ? "Refreshing" : "Refresh storefront"}
                    </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-2.5 rounded-lg border bg-card px-4 py-3 text-[13px] font-medium transition-colors hover:border-primary/40 hover:text-primary"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-primary">
                                <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            {label}
                        </Link>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Products
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {data?.data?.statistics?.totalProducts}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Orders
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {data?.data?.statistics?.totalOrders}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Shops
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="5"
                                        rx="2"
                                    />
                                    <path d="M2 10h20" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {data?.data?.statistics?.totalShops}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Reviews
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {data?.data?.statistics?.totalReviews}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <DashboardCharts charts={data?.data?.charts} />
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Best Selling Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isBestSellingLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table className="sm:min-w-full overflow-x-auto">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>Sold</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {(
                                                    bestSellingProducts as {
                                                        data: Product[];
                                                    }
                                                )?.data?.map(
                                                    (product: Product) => (
                                                        <TableRow
                                                            key={product.id}
                                                        >
                                                            <TableCell>
                                                                {product?.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatPrice(product?.price ?? 0)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {product
                                                                    ?.OrderItem
                                                                    ?.length ||
                                                                    0}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Rated Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isTopRatedLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table className="sm:min-w-full overflow-x-auto">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>
                                                        Rating
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {(
                                                    topRatedProducts as {
                                                        data: Product[];
                                                    }
                                                )?.data?.map(
                                                    (product: Product) => (
                                                        <TableRow
                                                            key={product.id}
                                                        >
                                                            <TableCell>
                                                                {product.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {formatPrice(product.price)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {product.rating}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
