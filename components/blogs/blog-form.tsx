"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { BlogSchema } from "../../schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { addBlog } from "@/actions/blogs";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useRouter } from "next/navigation";

const BlogForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof BlogSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addBlog(data)
        .then((res) => {
          if (res.error)
            setError(res.error);
          if (res.success)
            setSuccess(res.success);
          form.reset();
          router.push("/home");
        })
        .catch((err) => {
          setError(err.error);
        });
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl {...field}>
                  <Input
                    {...field}
                    type="text"
                    disabled={isPending}
                    placeholder="title"
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content</FormLabel>
                <FormControl {...field}>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="content..."
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-[4px] space-y-4">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
