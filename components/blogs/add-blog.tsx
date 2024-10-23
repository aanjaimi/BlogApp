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
import { removeAllBlogs } from "@/actions/blogs";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { capitalizeFirstLetters } from "@/lib/utils";
import { CustomSignOut } from "@/actions/signin";

const AddBlog = () => {
  const [isPending, startTransition] = useTransition();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpeDelete] = useState(false);
  const session = useSession();


  // this function for removing all blogs
  const handleRemoveAll = () => {
    setOpeDelete(true);
    startTransition(async () => {
      removeAllBlogs(session.data?.user?.id as string).then((res) => {
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

  console.log("USER: ", session.data?.user)

  if (!session.data || !session.data.user) return null

  return (
    <div className="flex border-b border-b-black">
      <div className="w-full h-[80px] sm:h-[60px] flex justify-start sm:justify-start">
        {/* dialog for add blog button */}
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger className="mx-[10px]">
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
