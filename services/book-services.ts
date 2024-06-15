import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import { converter } from "@/lib/converter";

import { Book } from "@/types";

const convertFirestoreData = (id: string, data: any): Book => {
  return {
    ...data,
    id,
    publicationYear: data?.publicationYear
      ? data?.publicationYear?.toDate()
      : undefined, // Chuyển đổi Timestamp thành Date
  };
};

export async function getAllBooks() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());
  const bookSnapshot = await getDocs(bookRef);

  const books = bookSnapshot.docs.map((doc) => doc.data());

  return books;
}

export async function getBookById(bookId: string) {
  const bookRef = doc(db, "books", bookId).withConverter(converter<Book>());
  const snapshot = await getDoc(bookRef);

  if (!snapshot.exists()) return null;

  const { id, ...values } = snapshot.data();

  const bookConverted = convertFirestoreData(snapshot.id, values);

  return bookConverted;
}

export async function getBooksByYear() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());

  const q = query(bookRef, orderBy("publicationYear", "desc"), orderBy("name"));

  type BookWithYear = Record<string, Array<Book>>;
  const bookSnapshots = await getDocs(q);

  const booksByYear: BookWithYear = {};

  bookSnapshots.docs.forEach((snapshot) => {
    const { id, ...book } = snapshot.data();

    const bookConverted = convertFirestoreData(snapshot.id, book);

    const year = book.publicationYear
      ? bookConverted.publicationYear?.getFullYear()
      : null;

    if (year) {
      if (!booksByYear[year]) {
        booksByYear[year] = [];
      }

      booksByYear[year].push(bookConverted);
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
    const { id, ...book } = snapshot.data();

    const bookConverted = convertFirestoreData(snapshot.id, book);

    if (!book?.publicationYear) {
      bookWithoutYear.push(bookConverted);
    }
  });

  return bookWithoutYear;
}

export async function getRecommendedBook() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());

  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const q = query(
    bookRef,
    where("publicationYear", ">=", Timestamp.fromDate(threeYearsAgo)),
    orderBy("rating", "desc"),
    limit(1),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const topRatedBook = snapshot.docs.map((doc) => {
    const { id, ...book } = doc.data();
    const bookConverted = convertFirestoreData(doc.id, book);

    return bookConverted;
  });
  const randomIndex = Math.floor(Math.random() * topRatedBook.length);

  return topRatedBook[randomIndex];
}
