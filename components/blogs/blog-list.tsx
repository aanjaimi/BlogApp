"use client";
import React from "react";
import type { Blog } from "@/types/blog";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DisplayBlog from "./display-blog";

type BlogListProps = {
  blogs: Blog[];
};

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-[12px]">
      {blogs.length ? (
        <Carousel>
          <CarouselContent className="flex w-[310px] h-[310px]">
            {blogs.map((blog) => (
              <DisplayBlog key={blog.id} blog={blog} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  );
};

export default BlogList;
