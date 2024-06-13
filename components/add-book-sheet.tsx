"use client";

import { BookForm } from "@/components/book-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Skeleton } from "./ui/skeleton";
import { useAddBookStore } from "@/hooks/use-add-book";
import { useIsClient } from "@/hooks/use-is-client";

interface AddBookSheetProps {
  children?: React.ReactNode;
}

export function AddBookSheet({ children }: AddBookSheetProps) {
  const isClient = useIsClient();
  const { isOpen, onClose, onOpen } = useAddBookStore();

  if (!isClient) return <Skeleton className="h-10 w-24" />;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <div onClick={onOpen} role="button">
        {children}
      </div>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl">Add Book</SheetTitle>
          <SheetDescription>Create new book.</SheetDescription>
        </SheetHeader>
        <BookForm mode="create" />
      </SheetContent>
    </Sheet>
  );
}
