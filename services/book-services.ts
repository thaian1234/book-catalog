import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
