"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import { AddPostType, addPostAction, addPostSchema } from "@/actions/post";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function AddPostForm() {
  const form = useForm<AddPostType>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
    },
  });
  const { execute: addPost, isPending } = useServerAction(addPostAction, {
    onSuccess() {
      toast.success("Post added");
      form.reset();
    },
    onError(args) {
      toast.error(args.err.message);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addPost)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="eg.New post"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
