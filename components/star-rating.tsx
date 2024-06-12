import { StarIcon } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const filledStars = Math.round(rating / 2);
  const emptyStars = 5 - filledStars; // Calculate empty stars

  return (
    <div className="mt-2 flex items-center gap-1">
      {Array.from({ length: filledStars }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 fill-primary" />
      ))}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarIcon
          key={i}
          className="h-4 w-4 fill-muted stroke-muted-foreground"
        />
      ))}
      {`(${rating})`}
    </div>
  );
}
