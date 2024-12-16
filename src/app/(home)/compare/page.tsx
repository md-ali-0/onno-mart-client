"use client";

import Breadcumb from "@/components/shared/breadcumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { removeProduct } from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductComparisonDemo() {
    const compare = useAppSelector((state) => state.compare.compare);
    const dispatch = useAppDispatch();

    return (
        <>
            <Breadcumb />
            <div className="container mx-auto py-8 px-4">
                {compare.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <h2 className="text-2xl font-bold text-center">
                            No products in comparison
                        </h2>
                        <p className="text-gray-500 text-center">
                            Please add products to compare.
                        </p>
                        <Link href="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row">
                                <div className="sm:w-[200px]"></div>
                                <div
                                    className={`flex-1 grid grid-cols-1 ${
                                        compare.length > 2
                                            ? "md:grid-cols-3"
                                            : "md:grid-cols-2"
                                    } gap-6 mb-8`}
                                >
                                    {compare.map((product) => (
                                        <div
                                            key={product.id}
                                            className="relative flex flex-col items-center"
                                        >
                                            <div className="absolute right-2 top-3.5">
                                                <Button
                                                    className="bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white rounded-full"
                                                    onClick={() =>
                                                        dispatch(
                                                            removeProduct({
                                                                id: product.id,
                                                            })
                                                        )
                                                    }
                                                    size={"icon"}
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.name}
                                                width={200}
                                                height={200}
                                                className="rounded-lg mb-4"
                                            />
                                            <h2 className="text-xl font-semibold text-center mb-2">
                                                {product.name}
                                            </h2>
                                            <Badge
                                                variant="secondary"
                                                className="mb-2"
                                            >
                                                {product.brand.name}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">
                                            Feature
                                        </TableHead>
                                        {compare.map((product) => (
                                            <TableHead
                                                key={product.id}
                                                className="text-center"
                                            >
                                                {product.name}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Price
                                        </TableCell>
                                        {compare.map((product) => (
                                            <TableCell
                                                key={product.id}
                                                className="text-center"
                                            >
                                                ${product.price}
                                                {product.discount > 0 && (
                                                    <span className="text-green-600 ml-2">
                                                        ({product.discount}%
                                                        off)
                                                    </span>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Category
                                        </TableCell>
                                        {compare.map((product) => (
                                            <TableCell
                                                key={product.id}
                                                className="text-center"
                                            >
                                                {product.category.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Brand
                                        </TableCell>
                                        {compare.map((product) => (
                                            <TableCell
                                                key={product.id}
                                                className="text-center"
                                            >
                                                {product.brand.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Inventory
                                        </TableCell>
                                        {compare.map((product) => (
                                            <TableCell
                                                key={product.id}
                                                className="text-center"
                                            >
                                                {product.inventory}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Description
                                        </TableCell>
                                        {compare.map((product) => (
                                            <TableCell
                                                key={product.id}
                                                className="text-center"
                                            >
                                                {product.description}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
