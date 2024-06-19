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

const convertFirestoreData = (snapshot: any) => {
  const data = snapshot.data();

  const publicationYear: Date = data?.publicationYear
    ? data?.publicationYear.toDate()
    : null;

  return {
    ...data,
    id: snapshot.id,
    publicationYear,
  } as Book;
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

  const bookConverted = convertFirestoreData(snapshot);

  return bookConverted;
}

export async function getBooksByYear() {
  const bookRef = collection(db, "books").withConverter(converter<Book>());

  const q = query(bookRef, orderBy("publicationYear", "desc"), orderBy("name"));

  type BookWithYear = Record<string, Array<Book>>;
  const bookSnapshots = await getDocs(q);

  const booksByYear: BookWithYear = {};

  bookSnapshots.docs.forEach((snapshot) => {
    const bookConverted = convertFirestoreData(snapshot);

    const year = bookConverted?.publicationYear
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
    const bookConverted = convertFirestoreData(snapshot);

    if (!bookConverted?.publicationYear) {
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
    where("publicationYear", "<=", threeYearsAgo),
    orderBy("publicationYear", "desc"),
    orderBy("rating", "desc"),
  );

  type BookWithYear = Record<string, Book>;
  const bookSnapshots = await getDocs(q);

  const recommendedBook: BookWithYear = {};

  bookSnapshots.docs.forEach((snapshot) => {
    const bookConverted = convertFirestoreData(snapshot);

    const year = bookConverted?.publicationYear
      ? bookConverted.publicationYear?.getFullYear()
      : null;

    if (year) {
      if (!recommendedBook[year]) {
        recommendedBook[year] = bookConverted;
      } else if (bookConverted.rating === recommendedBook[year].rating) {
        const randomChoice =
          Math.random() < 0.5 ? bookConverted : recommendedBook[year];
        recommendedBook[year] = randomChoice;
      }
    }
  });

  return recommendedBook;
}
