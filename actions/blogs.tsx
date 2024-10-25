"use server";
import * as z from "zod";
import { BlogSchema } from "@/schemas/index";
import { db } from "../lib/db";
import { auth } from "@/auth";

export const addBlogAction = async (values: z.infer<typeof BlogSchema>) => {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a blog" };
  }
  const { title, content } = values;

  const existingBlog = await db.blog.findMany({
    where: {
      AND: [
        { title: title },
        { userId: session.user.id },
      ],
    },
  });

  if (existingBlog.length > 0) {
    return { error: "title already in use" };
  }

  await db.blog.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });

  return { success: "Your blog have been created!" };
};

export const getBlogs = async () => {
  const session = await auth()
  if (!session?.user?.id) {
    return [];
  }

  return await db.blog.findMany({
    where: {
      userId: session?.user?.id
    }
  });
};

export const removeBlogAction = async (id: string) => {
  try {
    await db.blog.delete({
      where: {
        id,
      },
    });
    return { success: "Blog removed" };
  } catch (error) {
    return { error: "Error removing blog" };
  }
};

export const removeAllBlogs = async () => {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "You must be logged in to delete all blogs" };
    }
    await db.blog.deleteMany({
      where: {
        userId: session.user.id,
      },
    });
    return { success: "All blogs removed" };
  } catch (error) {
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

export const updateBlogAction = async (
  id: string,
  values: z.infer<typeof BlogSchema>,
) => {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "You must be logged in to update a blog" };
  }
  const { title, content } = values;

  const existingBlog = await db.blog.findMany({
    where: {
      AND: [
        { title: title },
        { userId: session.user.id },
      ],
    },
  });

  if (existingBlog.length > 0 && existingBlog[0].id != id) {
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
