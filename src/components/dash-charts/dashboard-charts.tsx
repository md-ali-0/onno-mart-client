"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
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

type BarPoint = { month: string; totalSales: number };
type PiePoint = { name: string; value: number };

export type DashboardChartData = {
    barChartData?: BarPoint[];
    pieChartData?: PiePoint[];
};

const STATUS_COLORS: Record<string, string> = {
    CANCELED: "#FF6B6B",
    FAILED: "#FF9F43",
    PENDING: "#54A0FF",
    COMPLETED: "#5ED5A8",
};

/**
 * Recharts plus the shadcn chart wrapper is the heaviest dependency in the
 * dashboard (~106 kB). This island is loaded on demand so the rest of the
 * dashboard — stat cards and tables — paints immediately.
 */
export default function DashboardCharts({
    charts,
}: {
    charts?: DashboardChartData;
}) {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="sm:col-span-4">
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
                        className="sm:h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={charts?.barChartData ?? []}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Bar dataKey="totalSales" fill="#4CAF50" />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="sm:col-span-3">
                <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ChartContainer
                        config={{
                            CANCELED: { label: "Canceled", color: STATUS_COLORS.CANCELED },
                            FAILED: { label: "Failed", color: STATUS_COLORS.FAILED },
                            PENDING: { label: "Pending", color: STATUS_COLORS.PENDING },
                            COMPLETED: { label: "Completed", color: STATUS_COLORS.COMPLETED },
                        }}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={charts?.pieChartData ?? []}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {(charts?.pieChartData ?? []).map(
                                    (entry: PiePoint, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={STATUS_COLORS[String(entry.name)]}
                                        />
                                    )
                                )}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
