"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBestSellingProductsQuery, useGetTopRatedProductsQuery } from "@/redux/features/product/productApi";
import { useGetDashboardStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { Product } from "@/types";
import { useEffect } from "react";
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { toast } from "sonner";

export default function Dashboard() {
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
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Total Sales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        totalSales: {
                                            label: "Total Sales",
                                            color: "#4CAF50",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={
                                                data?.data?.charts?.barChartData
                                            }
                                        >
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Bar
                                                dataKey="totalSales"
                                                fill="#4CAF50"
                                            />
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent />
                                                }
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Order Status Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ChartContainer
                                    config={{
                                        CANCELED: {
                                            label: "Canceled",
                                            color: "#FF6B6B",
                                        },
                                        FAILED: {
                                            label: "Failed",
                                            color: "#FF9F43",
                                        },
                                        PENDING: {
                                            label: "Pending",
                                            color: "#54A0FF",
                                        },
                                        COMPLETED: {
                                            label: "Completed",
                                            color: "#5ED5A8",
                                        },
                                    }}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={
                                                <ChartTooltipContent
                                                    hideLabel
                                                />
                                            }
                                        />
                                        <Pie
                                            data={
                                                data?.data?.charts?.pieChartData
                                            }
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            dataKey="value"
                                            label={({ name, percent }) =>
                                                `${name} ${(
                                                    percent * 100
                                                ).toFixed(0)}%`
                                            }
                                        >
                                            {data?.data?.charts?.pieChartData.map(
                                                (
                                                    entry: {
                                                        name: string | number;
                                                    },
                                                    index: number
                                                ) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            {
                                                                CANCELED:
                                                                    "#FF6B6B",
                                                                FAILED: "#FF9F43",
                                                                PENDING:
                                                                    "#54A0FF",
                                                                COMPLETED:
                                                                    "#5ED5A8",
                                                            }[entry.name]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Best Selling Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isBestSellingLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Sold</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(bestSellingProducts as { data: Product[] })?.data?.map(
                                                (product: Product) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell>
                                                            {product?.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${product?.price}
                                                        </TableCell>
                                                        <TableCell>
                                                            {product?.OrderItem?.length || 0}
                                                            
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
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
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Rating</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(topRatedProducts as { data: Product[] })?.data?.map((product: Product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        ${product.price}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.rating}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
