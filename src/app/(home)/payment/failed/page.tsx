import Link from "next/link";

export default function Failed() {
  return (
    <div className="flex items-center justify-center py-20 md:py-24 bg-red-50">
      <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>
        <p className="mt-4 text-gray-600">
          Oops! Something went wrong. Please try again or contact support.
        </p>
        <Link href="/checkout" className="inline-block px-4 py-2 mt-6 text-white bg-red-600 rounded hover:bg-red-700">
            Try Again
        </Link>
      </div>
    </div>
  );
}
