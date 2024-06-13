"use client";

import { DeleteIcon, Edit2, MoreHorizontal, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import { deleteBookById } from "@/actions/book";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useIsClient } from "@/hooks/use-is-client";
import { useUpdateBookStore } from "@/hooks/use-update-book";

interface BookActionsProps {
  bookId: string;
}

export function BookActions({ bookId }: BookActionsProps) {
  const { execute: deleteBook, isPending } = useServerAction(deleteBookById, {
    onSuccess() {
      toast.success("Book deleted");
    },
    onError(args) {
      toast.error(args.err.message);
    },
  });

  const onDelete = () => {
    deleteBook({ id: bookId });
  };

  return (
    <>
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} disabled={isPending}>
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <Link
              href={{
                pathname: bookId,
              }}
              prefetch={false}
            >
              <DropdownMenuItem>
                <Edit2 className="mr-2 size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-500" onClick={onDelete}>
              <TrashIcon className="mr-2 size-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
