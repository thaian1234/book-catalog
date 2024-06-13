import { getBookById } from "@/services/book-services";

import { BookForm } from "@/components/book-form";

interface BookIdPageProps {
  params: {
    bookId: string;
  };
}

export default async function BookIdPage({
  params: { bookId },
}: BookIdPageProps) {
  const book = await getBookById(bookId);

  if (!book) return <p>Book not found</p>;

  return <BookForm mode="update" book={book} />;
}
