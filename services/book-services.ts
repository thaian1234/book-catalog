import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import { converter } from "@/lib/converter";

import { Book } from "@/types";

export async function getAllBooks() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());
  const bookSnapshot = await getDocs(bookRef);

  const books = bookSnapshot.docs.map((doc) => doc.data());

  return books;
}

export async function getBookById(id: string) {
  const collectionRef = doc(db, "books", id).withConverter(converter<Book>());
  const docRef = await getDoc(collectionRef);

  if (!docRef.exists()) return null;

  return docRef.data();
}

export async function getBooksByYear() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());

  const q = query(bookRef, orderBy("publicationYear", "desc"), orderBy("name"));

  type BookWithYear = Record<string, Array<Book>>;
  const bookSnapshots = await getDocs(q);

  const booksByYear: BookWithYear = {};

  bookSnapshots.docs.forEach((snapshot) => {
    const book = snapshot.data();

    const year = book.publicationYear
      ? book.publicationYear.toDate().getFullYear()
      : null;

    if (year) {
      if (!booksByYear[year]) {
        booksByYear[year] = [];
      }

      booksByYear[year].push(book);
    }
  });

  return booksByYear;
}

export async function getBooksWithoutYear() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());

  const q = query(bookRef, orderBy("name"));

  const bookSnapshots = await getDocs(q);
  const bookWithoutYear: Book[] = [];

  bookSnapshots.docs.forEach((snapshot) => {
    const book = snapshot.data();

    if (!book?.publicationYear) bookWithoutYear.push(book);
  });

  return bookWithoutYear;
}
