import { getRecommendedBook } from "@/services/book-services";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Book } from "./book";

export async function RecommendedBook() {
  const recommendedBook = await getRecommendedBook();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recommended Book</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {recommendedBook ? (
            <Book book={recommendedBook} />
          ) : (
            <p>No recommended book</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
