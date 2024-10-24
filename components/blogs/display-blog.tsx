"use client";
import { Blog } from "@/types/blog";
import React, { useState, useTransition } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { MdOutlineUpdate } from "react-icons/md";
import { useRouter } from "next/navigation";
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
import BlogForm from "./blog-form";
import { useAppDispatch } from "@/lib/hooks";
import { deleteBlog } from "@/lib/blogs/createAsyncThunk";

type DisplayBlogProps = {
  blog: Blog;
};

const DisplayBlog = ({ blog }: DisplayBlogProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const content = blog.content.substring(0, 20);
  const bigger = blog.content.length > 20;
  const date = (new Date(blog.createdAt)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = (new Date(blog.createdAt)).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRemove = (id: string) => {
    setOpen(true);
    startTransition(async () => {
      dispatch(deleteBlog(blog))
    });
    setOpen(false);
  };

  return (
    <div className="border-[0.5px] drop-shadow-lg border-grey rounded-md max-w-[200px] min-w-[200px] sm:max-w-[400px] sm:min-w-[400px] flex flex-col bg-white space-y-10 m-6">
      <div className="mt-[10px] flex justify-between">
        <div className="ml-[10px]">
          {date} {time}
        </div>
        <div className="flex justify-end space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex justify-center w-4 h-6 hover:bg-slate-200">
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
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger className="">
              <HoverCard>
                <HoverCardTrigger>
                  <MdOutlineUpdate className="rounded-full w-6 h-6 hover:bg-slate-200" />
                </HoverCardTrigger>
                <HoverCardContent className="w-[46px] text-[10px] font-bold">
                  Update
                </HoverCardContent>
              </HoverCard>
            </DialogTrigger>
            <DialogContent className="sm:w-[400px] w-[250px]">
              <DialogHeader className="flex flex-col items-center space-y-6">
                <DialogTitle>Update your blog here</DialogTitle>
                <div className="w-full">
                  <BlogForm setOpenAdd={setOpenAdd} blog={blog} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <HoverCard>
            <HoverCardTrigger className="">
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
