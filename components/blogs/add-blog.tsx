import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlogForm from "./blog-form";

const AddBlog = () => {
  return (
    <div className="w-full flex justify-center">
      <Dialog >
        <DialogTrigger className="mt-[100px]">
          <Button className="rounded-full w-[180px] h-[60px] flex justify-center items-center space-x-2">
            <IoMdAddCircle className="w-10 h-10" />
            <span className="text-[20px] font-bold">Add Blog</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center space-y-6">
            <DialogTitle>Add your blog here</DialogTitle>
            <DialogDescription className="w-full">
              <BlogForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlog;
