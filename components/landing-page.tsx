"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CustomSignIn } from "@/actions/signin";
import { Button } from "./ui/button";

const Poppinsfont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Cairofont = Cairo({
  weight: "600",
  subsets: ["latin"],
});

const LandingPage = () => {

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
              "flex text-[20px] md:-mt-5 sm:text-[30px] text-white font-bold",
              Cairofont.className
            )}
          >
            Go deeper into the world of blogs
          </div>
          <div>
          <form
            action={() => CustomSignIn()}
          >
            <Button
              className="px-10 text-md py-6 mt-[30px]"
            >
              Get Started with 42
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
