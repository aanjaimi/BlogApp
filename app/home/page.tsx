"use client";
import React, { useEffect } from "react";
import AddBlog from "@/components/blogs/add-blog";
import BlogList from "@/components/blogs/blog-list";
import LoadingPage from "@/components/loading-page";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBlogs } from "@/lib/blogs/createAsyncThunk";

const Homepage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogReducer.blogs);

  // fetch form blogs
  useEffect(() => {
    if (!session.data?.user?.id) return
    dispatch(fetchBlogs(session.data?.user?.id));
    // eslint-disable-next-line
  }, [session.data?.user?.id]);

  if (!blogs) {
    return <LoadingPage />;
  }

  return (
    // home page
    <div className="body w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-100 w-[90%] h-[90%] drop-shadow-md flex flex-col border border-grey rounded-lg">
        <AddBlog />
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Homepage;
