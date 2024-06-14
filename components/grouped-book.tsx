import { getBooksByYear } from "@/services/book-services";

import { Book } from "@/components/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function GroupedBook() {
  const booksByYear = await getBooksByYear();

  const sortedYears = Object.keys(booksByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  return (
    <ScrollArea className="h-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Books With Year</CardTitle>
        </CardHeader>
        <CardContent className="grid">
          {sortedYears.map((year) => (
            <div key={year}>
              <h3 className="mb-2 text-xl font-semibold">{year}</h3>
              {booksByYear[year].map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
