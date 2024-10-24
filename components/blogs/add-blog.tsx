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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import BlogForm from "./blog-form";
import { useSession } from "next-auth/react";
import { capitalizeFirstLetters } from "@/lib/utils";
import { CustomSignOut } from "@/actions/signin";
import { useAppDispatch } from "@/lib/hooks";
import { deleteAllBlogs } from "@/lib/blogs/createAsyncThunk";

const AddBlog = () => {
  const [isPending, startTransition] = useTransition();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const session = useSession();
  const dispatch = useAppDispatch();


  // this function for removing all blogs
  const handleRemoveAll = () => {
    setOpenDelete(true);
    startTransition(async () => {
      dispatch(deleteAllBlogs(session.data?.user?.id as string))
    });
    setOpenDelete(false);
  };

  if (!session.data || !session.data.user) return null

  return (
    <div className="flex border-b border-grey">
      <div className="w-full h-[80px] sm:h-[60px] flex justify-start sm:justify-start">
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger className="mx-[10px]">
            <Button className="bg-gray-700 gap-1 text-primary-foreground hover:bg-primary/90 rounded-lg w-fit h-fit flex justify-center items-center space-x-1">
              <IoMdAddCircle className="size-5" />
              <span className="">Add Blog</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:w-[400px] w-[250px]">
            <DialogHeader className="flex flex-col items-center space-y-6">
              <DialogTitle>Add your blog here</DialogTitle>
              <div className="w-full">
                <BlogForm setOpenAdd={setOpenAdd} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger className="mx-[10px]">
            <Button className="bg-gray-700 gap-1 text-primary-foreground hover:bg-primary/90 rounded-lg w-fit h-fit flex justify-center items-center space-x-1">
              <IoIosCloseCircle className="size-5" />
              <span className="">Delete All</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:w-[400px] w-[250px]">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete all
                your blogs and remove them from our servers.
              </DialogDescription>
            </DialogHeader>
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
      </div>
      <div>
        
      </div>
      <div className="flex justify-center items-center mr-[10px]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.data.user.image || ''} alt="avatar" />
              <AvatarFallback>{capitalizeFirstLetters(session.data.user.name || '')}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex justify-center">
              <Button variant="ghost" className="hover:bg-transparent" onClick={() => {
                  CustomSignOut()
                }}>
                Logout
              </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AddBlog;
