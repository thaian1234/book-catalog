"use server";

import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

import { db } from "@/config/firebase";

import { addPostSchema } from "./schema";

export const addPostAction = createServerAction()
  .input(addPostSchema)
  .handler(async ({ input }) => {
    try {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, input);

      revalidatePath("/");
    } catch (error) {
      throw "Failed to add post";
    }
  });
