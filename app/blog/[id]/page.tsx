"use client";
import React, { useEffect, useState } from "react";
import { getBlog } from "@/actions/blogs";
import { Blog } from "@/types/blog";
import LoadingPage from "@/components/loading-page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const resp = getBlog(params.id);
    resp.then((res) => {
      setBlog(res);
    });
  }, [params.id]);

  if (!blog) {
    return <LoadingPage />;
  }

  const { createdAt } = blog;
  const date = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="body w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <div className="w-[80%] h-[5%] flex justify-center">
        <Button onClick={() => router.push("/home")}>Back to Blogs</Button>
      </div>
      <div className="w-[90%] h-[90%] flex flex-col items-center justify-between">
        <h1 className="text-[30px] sm:text-[50px] w-full h-[100px] bg-white bg-opacity-60 py-1 sm:py-5 font-bold flex items-center justify-center">
          {blog.title}
        </h1>
        <ScrollArea className="p-2 bg-white w-full h-full bg-opacity-40 text-[15px] sm:text-[20px] flex items-center justify-center">
          {blog.content}
        </ScrollArea>
        <div className="text-[15px] sm:text-[20px] bg-white bg-opacity-60 w-full h-[100px] py-1 sm:py-5 flex items-center justify-center">
          <span>
            {date} {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
