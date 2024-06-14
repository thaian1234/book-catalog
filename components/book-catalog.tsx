import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

import { AddBookSheet } from "@/components/add-book-sheet";
import { GroupedBook } from "@/components/grouped-book";
import { NonGroupedBook } from "@/components/non-grouped-book";
import { RecommendedBook } from "@/components/recommended-book";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Suspense fallback={<BookCatalogSkeleton />}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <RecommendedBook />
          <GroupedBook />
          <NonGroupedBook />
        </div>
      </Suspense>
    </div>
  );
}

export function BookCatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[750px]" />
      ))}
    </div>
  );
}
