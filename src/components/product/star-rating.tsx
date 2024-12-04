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
                        i < rating ? "text-yellow-400" : "text-gray-200"
                    } rounded-full`}
                ></Star>
            ))}
        </div>
    );
};
