"use client";
import React, { useEffect, useState } from "react";
import { getBlog } from "@/actions/blogs";
import { Blog } from "@/types/blog";
import LoadingPage from "@/components/loading-page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    <div className="body w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[80%] h-[5%] flex justify-center">
        <Button onClick={() => router.push('/home') }>Back to Blogs</Button>
      </div>
      <div className="bg-slate-500 bg-opacity-20 w-[90%] h-[90%] flex flex-col items-center justify-between">
        <h1 className="text-[100px] font-bold">{blog.title}</h1>
        <p className="p-2 text-[20px]">{blog.content}</p>
        <div className="text-[20px]">
          {date} {time}
        </div>
      </div>
      <></>
    </div>
  );
};

export default Page;
