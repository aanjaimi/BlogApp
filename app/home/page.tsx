"use client";
import React, { useEffect, useState } from "react";
import AddBlog from "@/components/blogs/add-blog";
import BlogList from "@/components/blogs/blog-list";
import { Blog } from "@/types/blog";
import { getBlogs } from "@/actions/blogs";
import LoadingPage from "@/components/loading-page";
import { useSession } from "next-auth/react";

const Homepage = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const session = useSession();

  // fetch form blogs
  useEffect(() => {
    if (!session.data?.user?.id) return
    const resp = getBlogs(session.data?.user?.id);
    resp.then((res) => {
      setBlogs(res);
    });
  }, [session.data?.user?.id]);

  if (!blogs) {
    return <LoadingPage />;
  }

  return (
    // home page
    <div className="body w-screen h-screen flex items-center justify-center">
      <div className="bg-opacity-70 bg-orange-200 w-[90%] h-[90%] flex flex-col">
        <AddBlog />
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Homepage;
