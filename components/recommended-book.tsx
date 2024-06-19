import { getRecommendedBook } from "@/services/book-services";

import { Book } from "@/components/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function RecommendedBook() {
  const recommendedBook = await getRecommendedBook();

  const sortedYears = Object.keys(recommendedBook).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const noRecommendedBook = sortedYears.length === 0;

  return (
    <ScrollArea className="h-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Recommended Books</CardTitle>
        </CardHeader>
        <CardContent className="grid">
          {noRecommendedBook && <p>No recommended book</p>}

          {sortedYears.map((year) => (
            <div key={year}>
              <h3 className="mb-2 text-xl font-semibold">{year}</h3>
              <Book
                key={recommendedBook[year].id}
                book={recommendedBook[year]}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
