"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import {
  AddBookType,
  UpdateBookType,
  addBookAction,
  addBookSchema,
  updateBookAction,
  updateBookSchema,
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
import { useUpdateBookStore } from "@/hooks/use-update-book";
import { type Book } from "@/types";

interface BookFormProps {
  initialBook?: Book;
  mode: "create" | "update";
}

const OPTIONS: Option[] = [
  { label: " Robert C. Martin", value: " Robert C. Martin" },
  { label: "Stephen Hawking", value: "Stephen Hawking" },
  { label: "Jason Schreier", value: "Jason Schreier" },
  { label: "Martin", value: "Martin" },
  { label: "Robert", value: "Robert" },
];

export function BookForm({ initialBook, mode = "create" }: BookFormProps) {
  const isCreateMode = mode === "create" || !initialBook;
  const form = useForm<AddBookType | UpdateBookType>({
    resolver: zodResolver(isCreateMode ? addBookSchema : updateBookSchema),
    defaultValues: initialBook,
  });
  const router = useRouter();
  const { onClose: onCloseAddBookSheet } = useAddBookStore();

  const successMsg = isCreateMode ? "Book created" : "Book updated";
  const action = isCreateMode ? addBookAction : updateBookAction;

  const defaultOptionsValue = initialBook?.authors.map((author) => {
    return {
      label: author,
      value: author,
    };
  });

  const handleCloseSheet = () => {
    if (isCreateMode) {
      onCloseAddBookSheet();
    } else {
      router.back();
    }
  };

  const { execute: onCreateOrUpdateBook, isPending } = useServerAction(action, {
    onError(args) {
      toast.error(args.err.message);
    },
    onSuccess() {
      toast.success(successMsg);
      form.reset();
      handleCloseSheet();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCreateOrUpdateBook)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the book</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="eg. John" {...field} />
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
                <Input
                  disabled={isPending}
                  placeholder="Rating"
                  type="number"
                  {...field}
                />
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
                <Input
                  disabled={isPending}
                  placeholder="ISBN code"
                  {...field}
                />
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
                  value={defaultOptionsValue}
                  placeholder="Select authors..."
                  creatable
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
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isPending={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
