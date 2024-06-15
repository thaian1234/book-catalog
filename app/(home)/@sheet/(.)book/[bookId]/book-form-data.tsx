import { notFound } from "next/navigation";

import { getBookById } from "@/services/book-services";

import { BookForm } from "@/components/book-form";
import { Spinner } from "@/components/ui/spinner";

interface BookFormDataProps {
  bookId: string;
}

export async function BookFormData({ bookId }: BookFormDataProps) {
  const book = await getBookById(bookId);

  if (!book) notFound();

  return <BookForm mode="update" initialBook={book} />;
}

export function BookFormDataSpinner() {
  return (
    <div className="flex h-[85%] items-center justify-center">
      <Spinner show size={"large"} />
    </div>
  );
}
