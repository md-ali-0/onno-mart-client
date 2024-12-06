import CategoryForm from "@/components/dash-form/category-from";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateCategoryPage() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-sm border bg-white dark:bg-gray-900 mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                        Create New Category
                    </h3>
                    <Button asChild variant={"default"} size={"sm"}>
                        <Link href={"/dashboard/categories"}>Manage Categories</Link>
                    </Button>
                </div>
                <div className="p-7">
                    <CategoryForm />
                </div>
            </div>
        </div>
    );
}
