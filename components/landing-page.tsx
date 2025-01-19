"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FortyTwoSignIn, GoogleSignIn } from "@/actions/signin";
import { Button } from "./ui/button";
import Image from "next/image";

const Poppinsfont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Cairofont = Cairo({
  weight: "600",
  subsets: ["latin"],
});

const LandingPage = () => {
  const [isDisabled, setIsDisabled] = React.useState(false);

  return (
    <div className="body relative w-full h-full flex items-center justify-center shadow-lg p-4">
      <div className="h-full w-full absolute bg-gray-700 opacity-80"></div>
      <div className="z-10 flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div
            className={cn(
              "flex text-[40px] sm:text-[120px] text-white drop-shadow-lg font-bold",
              Poppinsfont.className
            )}
          >
            BLOG APP
          </div>
          <div
            className={cn(
              "flex text-[20px] mb-6 md:-mt-5 sm:text-[30px] text-white font-bold",
              Cairofont.className
            )}
          >
            Go deeper into the world of blogs
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 mt-[30px]">
            <Button
              disabled={isDisabled}
              className="p-6 w-64 text-md flex justify-start"
              onClick={() => {
                setIsDisabled(true);
                FortyTwoSignIn()
              }}
            >
              <Image src="/42.svg" alt="42" width={20} height={20} />
              <span className="ml-4">Continue with 42</span>
            </Button>
            <div className="flex items-center justify-center text-white text-md">
              or
            </div>
            <Button
              disabled={isDisabled}
              className="p-6 w-64 text-md flex justify-start"
              onClick={() => {
                setIsDisabled(true);
                GoogleSignIn()
              }}
              >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span className="ml-4">Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
