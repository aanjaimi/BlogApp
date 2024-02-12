import React, { useTransition } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlogForm from "./blog-form";
import { Button } from "../ui/button";
import { removeAllBlogs } from "@/actions/blogs";
import { toast } from "sonner";

const AddBlog = () => {
  const [isPending, startTransition] = useTransition();

  const handleRemoveAll = () => {
    startTransition(() => {
      removeAllBlogs().then((res) => {
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
    <div className="border-b border-b-black w-full h-[80px] sm:h-[60px] flex justify-center sm:justify-end">
      <Dialog>
        <DialogTrigger className="mx-[20px]">
          <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-fit h-fit p-1 flex justify-center items-center space-x-2">
            <TiDelete className="w-[33px] h-[33px]" />
            <span className="text-[15px] pr-1 font-bold">Delete all</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:w-[400px] w-[250px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete all your
              blogs and remove them from our servers.
            </DialogDescription>
          </DialogHeader>
          <span className="w-full flex justify-center items-center">
            <Button
              onClick={handleRemoveAll}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              disabled={isPending}
            >
              Delete all
            </Button>
          </span>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="mx-[20px]">
          <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-fit h-fit p-1 flex justify-center items-center space-x-2">
            <IoMdAddCircle className="w-8 h-8" />
            <span className="text-[15px] pr-1 font-bold">Add Blog</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:w-[400px] w-[250px]">
          <DialogHeader className="flex flex-col items-center space-y-6">
            <DialogTitle>Add your blog here</DialogTitle>
            <div className="w-full">
              <BlogForm />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlog;
