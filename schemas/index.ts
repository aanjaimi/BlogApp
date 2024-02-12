import * as z from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, { message: "title is required" }).max(15, {message: "title should be at most 20 characters long"}),
  content: z.string().min(1, { message: "content is required" }),
});