import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/config/firebase";

import { getAllBooks } from "@/services/book-services";

import { Button } from "@/components/ui/button";

import { AddPostForm } from "./_components/add-post-form";

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
        <AddPostForm />
      </div>
    </div>
  );
}
