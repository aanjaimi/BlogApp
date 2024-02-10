import * as z from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "content is required" }),
});