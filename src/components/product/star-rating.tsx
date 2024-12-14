import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

export default function StarRating ({ rating, maxRating = 5 }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, i) => (
                <Star
                    key={i}
                    className={`size-4 ${
                        i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300"
                    } rounded-full`}
                ></Star>
            ))}
        </div>
    );
};
