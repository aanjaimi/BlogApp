"use client";
import React from "react";
import AddBlog from "@/components/blogs/add-blog";
import BlogList from "@/components/blogs/blog-list";
import LoadingPage from "@/components/loading-page";
import { useAppDispatch } from "@/lib/hooks";
import { fetchBlogs } from "@/lib/blogs/createAsyncThunk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogs } from "@/actions/blogs";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["blogs"], queryFn: async () => {
    dispatch(fetchBlogs());
    return await getBlogs()
  }});

  if (query.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="body w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-100 w-[90%] h-[90%] drop-shadow-md flex flex-col border border-grey rounded-lg">
        <AddBlog />
        <BlogList blogs={query.data} />
      </div>
    </div>
  );
};

export default Homepage;
