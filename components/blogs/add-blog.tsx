import React, { useState, useTransition } from "react";
import { IoMdAddCircle, IoIosCloseCircle } from "react-icons/io";
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
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpeDelete] = useState(false);

  // this function for removing all blogs
  const handleRemoveAll = () => {
    setOpeDelete(true);
    startTransition(async () => {
      removeAllBlogs().then((res) => {
        if (res.success) {
          toast.success(res.success);
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
    setOpeDelete(false);
  };

  return (
    <div className="border-b border-b-black w-full h-[80px] sm:h-[60px] flex justify-center sm:justify-end">
      {/* dialog for the delete all button */}
      <Dialog open={openDelete} onOpenChange={setOpeDelete}>
        <DialogTrigger className="mx-[10px]">
          <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-fit h-fit p-1 flex justify-center items-center space-x-1">
            <IoIosCloseCircle className="w-8 h-8" />
            <span className="text-[15px] pr-1 font-bold">Delete all</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:w-[400px] w-[250px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete all
              your blogs and remove them from our servers.
            </DialogDescription>
          </DialogHeader>
          {/* this for the button of delete all */}
          <span className="w-full flex justify-center items-center">
            <Button
              onClick={() => handleRemoveAll()}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              disabled={isPending}
            >
              Delete all
            </Button>
          </span>
        </DialogContent>
      </Dialog>
      {/* dialog for add blog button */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogTrigger className="mx-[20px]">
          <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-fit h-fit p-1 flex justify-center items-center space-x-1">
            <IoMdAddCircle className="w-8 h-8" />
            <span className="text-[15px] pr-1 font-bold">Add Blog</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:w-[400px] w-[250px]">
          <DialogHeader className="flex flex-col items-center space-y-6">
            <DialogTitle>Add your blog here</DialogTitle>
            {/* this is the blog form in dialog content */}
            <div className="w-full">
              <BlogForm setOpenAdd={setOpenAdd} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlog;
