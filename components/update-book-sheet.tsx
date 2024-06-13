"use client";

import { BookForm } from "@/components/book-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useIsClient } from "@/hooks/use-is-client";
import { useUpdateBookStore } from "@/hooks/use-update-book";
import { Book } from "@/types";

interface UpdateBookSheetProps {
  children?: React.ReactNode;
  book?: Book;
}

export function UpdateBookSheet({ children, book }: UpdateBookSheetProps) {
  const isClient = useIsClient();
  const { isOpen, onClose } = useUpdateBookStore();

  if (!isClient) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {children}
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl">Update Book</SheetTitle>
          <SheetDescription>Update book information.</SheetDescription>
        </SheetHeader>
        <BookForm mode="update" book={book} />
      </SheetContent>
    </Sheet>
  );
}
