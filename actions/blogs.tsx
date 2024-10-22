"use server";
import * as z from "zod";
import { BlogSchema } from "../schemas";
import { db } from "../lib/db";

//group of actions for the database operations: add blog, get blogs, remove blog, remove all blogs, get blog by id

export const addBlog = async (values: z.infer<typeof BlogSchema>) => {
  const validate = BlogSchema.safeParse(values);

  if (!validate.success) {
    return { error: "Invalid blog data" };
  }

  const { title, content } = validate.data;

  const existingBlog = await db.blog.findUnique({
    where: {
      title: title,
    },
  });

  if (existingBlog) {
    return { error: "title already in use" };
  }

  await db.blog.create({
    data: {
      title,
      content,
    },
  });

  return { success: "Your blog have been created!" };
};

export const getBlogs = async () => {
  return await db.blog.findMany();
};

export const removeBlog = async (id: string) => {
  try {
    await db.blog.delete({
      where: {
        id,
      },
    });
    return { success: "Blog removed" };
  } catch (error) {
    console.error(error);
    return { error: "Error removing blog" };
  }
};

export const removeAllBlogs = async () => {
  try {
    await db.blog.deleteMany({});
    return { success: "All blogs removed" };
  } catch (error) {
    console.error(error);
    return { error: "Error removing blogs" };
  }
};

export const getBlog = async (id: string) => {
  return await db.blog.findUnique({
    where: {
      id,
    },
  });
};

export const updateBlog = async (
  id: string,
  values: z.infer<typeof BlogSchema>
) => {
  const validate = BlogSchema.safeParse(values);

  if (!validate.success) {
    return { error: "Invalid blog data" };
  }

  const { title, content } = validate.data;

  const existingBlog = await db.blog.findUnique({
    where: {
      title: title,
    },
  });

  if (existingBlog && existingBlog.id !== id) {
    return { error: "title already in use" };
  }

  await db.blog.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  return { success: "Blog updated" };
};
