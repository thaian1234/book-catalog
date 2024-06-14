import { Suspense } from "react";

import { UpdateBookSheet } from "@/components/update-book-sheet";

import { BookFormData, BookFormDataSpinner } from "./book-form-data";

interface BookModalPageProps {
  params: {
    bookId: string;
  };
}

export default function BookModalPage({
  params: { bookId },
}: BookModalPageProps) {
  return (
    <UpdateBookSheet>
      <Suspense fallback={<BookFormDataSpinner />}>
        <BookFormData bookId={bookId} />
      </Suspense>
    </UpdateBookSheet>
  );
}
