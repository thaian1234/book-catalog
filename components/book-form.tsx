"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import {
  AddBookType,
  addBookAction,
  addBookSchema,
  updateBookAction,
} from "@/actions/book";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

import { useAddBookStore } from "@/hooks/use-add-book";
import { Book } from "@/types";

interface BookFormProps {
  book?: Book;
  mode: "create" | "update";
}

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Thai An", value: "Thai An" },
];

export function BookForm({ book, mode = "create" }: BookFormProps) {
  const form = useForm<AddBookType>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      authors: book?.authors,
      isbn: book?.isbn,
      name: book?.name,
      rating: book?.rating,
    },
  });
  const { onClose } = useAddBookStore();

  const isCreateMode = mode === "create" && !book;

  const successMsg = isCreateMode ? "Book created" : "Book updated";
  const action = isCreateMode
    ? addBookAction
    : updateBookAction.bind(null, {
        id: book?.id || "",
      });

  const { execute, isPending } = useServerAction(action, {
    onError(args) {
      toast.error(args.err.message);
    },
    onSuccess() {
      toast.success(successMsg);
      onClose();
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the book</FormLabel>
              <FormControl>
                <Input placeholder="eg. John" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Year</FormLabel>
              <FormControl>
                <DateTimePicker
                  jsDate={field.value}
                  onJsDateChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="Rating" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="ISBN code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select authors</FormLabel>
              <FormControl>
                <MultipleSelector
                  defaultOptions={OPTIONS}
                  placeholder="Select authors..."
                  emptyIndicator={
                    <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  onChange={(selectedOption) => {
                    const selectedAuthorIds = selectedOption.map(
                      (option) => option.value,
                    );
                    form.setValue("authors", selectedAuthorIds);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}