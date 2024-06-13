import { getBooksWithoutYear } from "@/services/book-services";

import { Book } from "@/components/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function NonGroupedBook() {
  const booksWithoutYear = await getBooksWithoutYear();

  return (
    <ScrollArea className="h-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Books Without Year</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {booksWithoutYear.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
