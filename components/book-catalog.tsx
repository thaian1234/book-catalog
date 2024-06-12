import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

import { getAllBooks } from "@/services/book-services";

import { GroupedBook } from "@/components/grouped-book";
import { ListBook } from "@/components/list-book";
import { Button } from "@/components/ui/button";

import { NonGroupedBook } from "./non-grouped-book";

export async function BookCatalog() {
  const books = await getAllBooks();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Book Catalog</h1>
        <Button variant="outline" size="sm">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* <ListBook books={books} title="Recomended book" /> */}

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
