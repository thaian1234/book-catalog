import { getAllBooks } from "@/services/book-services";

import { AddBookForm } from "./_components/add-book-form";

export default async function HomePage() {
  const books = await getAllBooks();

  console.log(books);
  return (
    <div>
      <div>
        {books.map((book) => (
          <div key={book.id}>{book.name}</div>
        ))}
      </div>
      <div className="max-w-xl">
        <AddBookForm />
        {/* <AddPostForm /> */}
      </div>
    </div>
  );
}
