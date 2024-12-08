import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DollarSign,
    Package
} from "lucide-react";

const recentOrders = [
    {
        id: "4cLj1731227674",
        date: "10 Nov 2024",
        total: "3,372.92",
        status: "Pending",
    },
    {
        id: "iCgF1730884803",
        date: "06 Nov 2024",
        total: "328.79",
        status: "Pending",
    },
    {
        id: "dimD1730783020",
        date: "05 Nov 2024",
        total: "778.61",
        status: "Pending",
    },
    {
        id: "X3VC1730714783",
        date: "04 Nov 2024",
        total: "403.66",
        status: "Pending",
    },
    {
        id: "zJ9F1730289762",
        date: "30 Oct 2024",
        total: "122.40",
        status: "Pending",
    },
    {
        id: "ABO7173028941",
        date: "30 Oct 2024",
        total: "295.80",
        status: "Pending",
    },
];

export default function DashboardPage() {
    return (
        <>
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-blue-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">13</p>
                            <p className="text-sm text-gray-600">
                                Total Orders
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-emerald-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-500 p-3 rounded-lg">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">13</p>
                            <p className="text-sm text-gray-600">
                                Pending Orders
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-orange-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-500 p-3 rounded-lg">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">3,994.43$</p>
                            <p className="text-sm text-gray-600">
                                Affiliate Bonus
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border rounded-xl">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                </div>
                <Table className="table table-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-blue-500">
                                #Order
                            </TableHead>
                            <TableHead className="text-blue-500">
                                Date
                            </TableHead>
                            <TableHead className="text-blue-500">
                                Order Total
                            </TableHead>
                            <TableHead className="text-blue-500">
                                Order Status
                            </TableHead>
                            <TableHead className="text-blue-500">
                                View
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.total}$</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-700 border-yellow-200"
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-black text-white hover:bg-gray-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
