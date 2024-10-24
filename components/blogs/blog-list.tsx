"use client";
import React from "react";
import type { Blog } from "@/types/blog";
import DisplayBlog from "./display-blog";
import { ScrollArea } from "../ui/scroll-area";

type BlogListProps = {
  blogs: Blog[];
};

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <>
      {blogs.length ? (
        <ScrollArea className="flex-1 w-full h-[90%] flex items-center justify-center">
          <section className="w-full sm:w-[97%] h-full flex flex-wrap justify-center sm:m-6">
            {blogs.map((blog) => (
              // display one blog
              <DisplayBlog key={blog.id} blog={blog} />
            ))}
          </section>
        </ScrollArea>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>No blogs to display</p>
        </div>
      )}
    </>
  );
};

export default BlogList;
