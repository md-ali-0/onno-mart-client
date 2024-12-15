export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen m-0 bg-gray-100 font-sans">
            <div className="relative w-24 h-24">
                <svg
                    className="cart-animation w-full h-full text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                </svg>
                <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 font-medium text-primary whitespace-nowrap">
                    Loading...
                </div>
            </div>
        </div>
    );
}
