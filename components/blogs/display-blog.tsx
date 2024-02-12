'use client';
import { Blog } from "@/types/blog";
import React, { useTransition } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { removeBlog } from "@/actions/blogs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";

type DisplayBlogProps = {
  blog: Blog;
};

const DisplayBlog = ({ blog }: DisplayBlogProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const content = blog.content.substring(0, 50);
  const bigger = blog.content.length > 50;
  const date = blog.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = blog.createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRemove = (id: string) => {
    startTransition(() => {
      removeBlog(id).then((res) => {
        if (res.success) {
          toast.success(res.success);
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <div className="max-w-[200px] min-w-[200px] sm:max-w-[400px] sm:min-w-[400px] flex flex-col bg-white space-y-10 m-6">
      <div className="mt-[10px] flex justify-between">
        <div className="ml-[10px]">
          {date} {time}
        </div>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="flex justify-center rounded-full w-6 h-6 hover:bg-slate-200">
              <HoverCard>
                <HoverCardTrigger>
                  <FaTrashAlt className="rounded-full w-4 h-6 hover:bg-slate-200" />
                </HoverCardTrigger>
                <HoverCardContent className="w-[46px] text-[10px] font-bold">
                  Delete
                </HoverCardContent>
              </HoverCard>
            </DialogTrigger>
            <DialogContent className="sm:w-auto w-[250px]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your blog and remove it from our servers.
                </DialogDescription>
              </DialogHeader>
              <span className="w-full flex justify-center items-center">
                <Button
                  onClick={() => handleRemove(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  disabled={isPending}
                >
                  Delete
                </Button>
              </span>
            </DialogContent>
          </Dialog>
          <HoverCard>
            <HoverCardTrigger>
              <HiOutlineArrowsExpand
                onClick={() => router.push(`/blog/${blog.id}`)}
                className="rounded-full w-6 h-6 mr-[10px] hover:bg-slate-200"
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-[46px] text-[10px] font-bold">
              Expand
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <h1 className="flex items-center justify-center text-[20px] md:text-[30px] font-bold">
        {blog.title}
      </h1>
      <p className="p-2 text-[15px] md:text-[20px] flex items-center justify-center">
        {bigger ? <div>{content}...</div> : <div>{content}</div>}
      </p>
    </div>
  );
};

export default DisplayBlog;
