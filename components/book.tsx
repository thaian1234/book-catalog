import { BookA } from "lucide-react";

import { StarRating } from "@/components/star-rating";

import { BookActions } from "./book-actions";
import { type Book } from "@/types";

interface BookProps {
  book: Book;
}

export function Book({ book }: BookProps) {
  return (
    <div className="grid gap-2">
      <div className="flex gap-4">
        <BookA width={64} height={120} />
        <div>
          <h4 className="font-medium">{book.name}</h4>
          <p className="text-gray-500">{book.authors.join(", ")}</p>
          <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
          <StarRating rating={book.rating || 0} />
        </div>
        <div className="ml-auto">
          <BookActions bookId={book.id} />
        </div>
      </div>
    </div>
  );
}
