import Image from "next/image";

export default function HeroBanner() {
    return (
        <section className="bg-primary/10">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
                    <p className="text-gray-700 text-lg">
                        SAVE NOW. STRESS LESS.
                    </p>
                    <h1 className="text-6xl font-bold text-gray-900 mt-2">
                        30-50%
                        <span className="text-primary">OFF</span>
                    </h1>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">
                        PRETTY MUCH EVERYTHING
                    </p>
                    <p className="text-gray-600 mt-4">Limited Time Only</p>
                    <button className="mt-6 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded">
                        Shop Now
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-10 md:w-1/2">
                    <Image
                        alt="Person posing in stylish outfit"
                        className="rounded-lg -rotate-6 shadow-lg"
                        height="150"
                        src="https://storage.googleapis.com/a1aa/image/9IbNTUrLwi7qPVUGXbNz3t8G6Kq6FHtaceoNxev0ldsLjD3TA.jpg"
                        width="250"
                    />
                    <Image
                        alt="Person holding shopping bags"
                        className="rounded-lg rotate-6 shadow-lg"
                        height="150"
                        src="https://storage.googleapis.com/a1aa/image/ZnUHQadoylpSNRxfPAyAqy4RDw53ARX33fS0HN41deqSGHunA.jpg"
                        width="250"
                    />
                    <Image
                        alt="Person holding orange slices in front of eyes"
                        className="rounded-lg rotate-6 shadow-lg"
                        height="150"
                        src="https://storage.googleapis.com/a1aa/image/Vf35TGSTufgmep7q16tx7xqh21SjMlcmccNfkJzSCau4MOcPB.jpg"
                        width="250"
                    />
                    <Image
                        alt="Person wearing white sunglasses"
                        className="rounded-lg -rotate-6 shadow-lg"
                        height="150"
                        src="https://storage.googleapis.com/a1aa/image/b0CFjrF7UIr0JBkqITdwHGbWGQfluh6uxp8NtKiHLaPmxh7JA.jpg"
                        width="250"
                    />
                </div>
            </div>
        </section>
    );
}
