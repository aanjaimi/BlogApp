"use client"
import React from "react";
import { Button } from "./ui/button";
import { Poppins } from "next/font/google";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Poppinsfont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Cairofont = Cairo({
  weight: "600",
  subsets: ["latin"],
});

const LandingPage = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/blogs");
  }

  return (
    <div className="body relative w-full h-full flex items-center justify-center shadow-lg p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-opacity-40 bg-orange-400 flex flex-col items-center justify-center">
          <div
            className={cn(
              "flex text-[120px] text-white font-bold",
              Poppinsfont.className
            )}
          >
            BLOG APP
          </div>
          <div
            className={cn(
              "flex text-[30px] text-white font-bold",
              Cairofont.className
            )}
          >
            Go deeper into the world of blogs
          </div>
          <div>
            <Button variant="default" size="lg" className="mt-[30px]" onClick={handleRedirect}>Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
