import { getBookById } from "@/services/book-services";

import { BookForm } from "@/components/book-form";
import { UpdateBookSheet } from "@/components/update-book-sheet";

interface BookModalPageProps {
  params: {
    bookId: string;
  };
}

export default async function BookModalPage({
  params: { bookId },
}: BookModalPageProps) {
  const book = await getBookById(bookId);

  if (!book)
    return (
      <UpdateBookSheet>
        <BookForm mode="create" />
      </UpdateBookSheet>
    );

  return (
    <UpdateBookSheet>
      <BookForm book={book} mode="update" />
    </UpdateBookSheet>
  );
}
