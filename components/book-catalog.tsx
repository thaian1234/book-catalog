import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

import { GroupedBook } from "@/components/grouped-book";
import { NonGroupedBook } from "@/components/non-grouped-book";
import { RecommendedBook } from "@/components/recommended-book";
import { Button } from "@/components/ui/button";

import { AddBookSheet } from "./add-book-sheet";

export function BookCatalog() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Book Catalog</h1>
        <AddBookSheet>
          <Button variant="outline" size="sm">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </AddBookSheet>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<p>Loading recommended book...</p>}>
          <RecommendedBook />
        </Suspense>

        <Suspense fallback={<p>Loading grouped book...</p>}>
          <GroupedBook />
        </Suspense>

        <Suspense fallback={<p>Loading non grouped book ...</p>}>
          <NonGroupedBook />
        </Suspense>
      </div>
    </div>
  );
}
