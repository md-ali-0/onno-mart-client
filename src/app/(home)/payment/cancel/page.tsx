import Link from "next/link";

export default function Cancel() {
    return (
        <div className="flex items-center justify-center py-20 md:py-24 bg-yellow-50">
            <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-yellow-600">
                    Payment Cancelled
                </h1>
                <p className="mt-4 text-gray-600">
                    Your payment process was cancelled. You can try again or
                    return to the homepage.
                </p>
                <Link
                    href="/"
                    className="inline-block px-4 py-2 mt-6 text-white bg-yellow-600 rounded hover:bg-yellow-700"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
