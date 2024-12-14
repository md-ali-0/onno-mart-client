import Link from "next/link";

export default function Success() {
    return (
        <div className="flex items-center justify-center py-20 md:py-24 bg-green-50">
            <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-green-600">
                    Payment Successful!
                </h1>
                <p className="mt-4 text-gray-600">
                    Thank you for your purchase. Your payment has been processed
                    successfully.
                </p>
                <Link
                    href="/"
                    className="inline-block px-4 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
