"use server";
import * as z from "zod";
import { BlogSchema } from "@/schemas/index";
import { db } from "../lib/db";
import { Blog } from "@/types/blog";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

//group of actions for the database operations: add blog, get blogs, remove blog, remove all blogs, get blog by id

export const addBlog = async (values: z.infer<typeof BlogSchema>, userId: string) => {
  const { title, content } = values;

  const existingBlog = await db.blog.findMany({
    where: {
      AND: [
        { title: title },
        { userId: userId },
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
      userId,
    },
  });

  return { success: "Your blog have been created!" };
};

export const getBlogs = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  return await db.blog.findMany({
    where: {
      userId
    }
  });
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

export const removeAllBlogs = async (userId: string) => {
  try {
    await db.blog.deleteMany({
      where: {
        userId
      },
    });
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
  values: z.infer<typeof BlogSchema>,
  userId: string
) => {

  const { title, content } = values;

  const existingBlog = await db.blog.findMany({
    where: {
      AND: [
        { title: title },
        { userId: userId },
      ],
    },
  });

  if (existingBlog.length != 1 || existingBlog[0].id != id) {
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
