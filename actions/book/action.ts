"use server";

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

import { db } from "@/config/firebase";

import { converter } from "@/lib/converter";

import { AddBookType, addBookSchema, updateBookSchema } from "./schema";

export const addBookAction = createServerAction()
  .input(addBookSchema)
  .handler(async ({ input }) => {
    const validatedFields = addBookSchema.safeParse(input);

    if (validatedFields.error) {
      throw "Missing some fields";
    }

    const values = validatedFields.data;

    const collectionRef = collection(db, "books").withConverter(
      converter<AddBookType>(),
    );
    await addDoc(collectionRef, values).catch(() => {
      throw "Failed to add book";
    });

    revalidatePath("/");
  });

export const updateBookAction = createServerAction()
  .input(updateBookSchema)
  .handler(async ({ input }) => {
    const validatedFields = updateBookSchema.safeParse(input);

    if (validatedFields.error) {
      throw "Missing some fields";
    }

    const { id, ...values } = validatedFields.data;
    const bookRef = doc(db, "books", id);

    await updateDoc(bookRef, values).catch(() => {
      throw "Failed to update book";
    });

    revalidatePath("/");
  });
