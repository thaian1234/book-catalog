"use client";

import { useRouter } from "next/navigation";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface UpdateBookSheetProps {
  children?: React.ReactNode;
}

export function UpdateBookSheet({ children }: UpdateBookSheetProps) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Sheet onOpenChange={handleOpenChange} defaultOpen={true} open={true}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl">Update Book</SheetTitle>
          <SheetDescription>Update book information.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
