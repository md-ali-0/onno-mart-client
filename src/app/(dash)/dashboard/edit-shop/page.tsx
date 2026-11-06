import ShopForm from "@/components/dash-form/shop-from";
import BreadcrumbDash from "@/components/shared/breadcumb-dash";

export default function EditShop() {
    return (
        <div>
            <BreadcrumbDash />
            <div className="rounded-lg border bg-card mt-5">
                <div className="flex justify-between items-center border-b px-7 py-4">
                    <h3 className="font-medium text-foreground">
                        Edit My Shop
                    </h3>
                </div>
                <div className="p-7">
                    <ShopForm />
                </div>
            </div>
        </div>
    );
}
