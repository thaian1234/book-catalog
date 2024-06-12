import { Suspense } from "react";

import { BookCatalog } from "@/components/book-catalog";

import { AddBookForm } from "./_components/add-book-form";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<p>Loading books...</p>}>
        <BookCatalog />
      </Suspense>
      <div className="max-w-xl">
        <AddBookForm />
        {/* <AddPostForm /> */}
      </div>
    </div>
  );
}
