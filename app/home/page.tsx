"use client";
import React, { useEffect, useState } from "react";
import AddBlog from "@/components/blogs/add-blog";
import BlogList from "@/components/blogs/blog-list";
import { Blog } from "@/types/blog";
import { getBlogs } from "@/actions/blogs";
import LoadingPage from "@/components/loading-page";

const Homepage = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    const resp = getBlogs();
    resp.then((res) => {
      setBlogs(res);
    });
  }, [blogs]);

  if (!blogs) {
    return <LoadingPage />;
  }

  return (
    <div className="body w-screen h-screen flex items-center justify-center">
      <div className="bg-opacity-70 bg-orange-200 w-[90%] h-[90%] flex flex-col">
        <AddBlog />
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Homepage;
