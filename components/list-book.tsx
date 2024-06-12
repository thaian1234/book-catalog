import { BookA } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { type Book } from "@/types";

interface ListBookProps {
  title: string;
  books: Book[];
  publicationYear?: string;
}

export function ListBook({
  books,
  title,
  publicationYear = "2022",
}: ListBookProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <h3 className="mb-2 font-semibold">{publicationYear}</h3> */}
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4">
            <BookA className="size-8" />
            <div>
              <h3 className="font-semibold">{book.name}</h3>
              <p className="text-gray-500">{book.authors.join(", ")}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
