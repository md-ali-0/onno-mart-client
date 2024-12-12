import CartDetails from "@/components/cart/cart-details";
import Breadcumb from "@/components/shared/breadcumb";

export default function CartPage() {
    return (
        <>
            <Breadcumb />
            <section className="container relative px-4 lg:px-0 py-5">
                <CartDetails />
            </section>
        </>
    );
}
