import { Blog } from "@/types/blog";
import React, { useTransition } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { FaMinus } from "react-icons/fa";
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
import { Button } from "../ui/button";
import { start } from "repl";

type DisplayBlogProps = {
  blog: Blog;
};

const DisplayBlog = ({ blog }: DisplayBlogProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const content = blog.content.substring(0, 10);
  const bigger = blog.content.length > 10;
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
          toast(res.success);
        }
        if (res.error) {
          toast(res.error);
        }
      });
    });
  };

  return (
    <CarouselItem className="flex flex-col bg-white space-y-10" key={blog.id}>
      <div className="flex justify-between">
        <div className="ml-[10px] mt-[10px]">
          {date} {time}
        </div>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger>
              <FaMinus className="rounded-full w-6 h-6 mr-[10px] mt-[10px] hover:bg-slate-200" />
            </DialogTrigger>
            <DialogContent>
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
          <HiOutlineArrowsExpand
            onClick={() => router.push(`/blog/${blog.id}`)}
            className="rounded-full w-6 h-6 mr-[10px] mt-[10px] hover:bg-slate-200"
          />
        </div>
      </div>
      <h1 className="flex justify-center text-[30px] font-bold">
        {blog.title}
      </h1>
      <p className="text-[20px] flex justify-center">
        {content}
        {bigger && <span>...</span>}
      </p>
    </CarouselItem>
  );
};

export default DisplayBlog;
