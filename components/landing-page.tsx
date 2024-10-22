"use client";
import React from "react";
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
    router.push("/home");
  };

  return (
    <div className="body relative w-full h-full flex items-center justify-center shadow-lg p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-opacity-40 bg-orange-400 flex flex-col items-center justify-center">
          <div
            className={cn(
              "flex text-[40px] sm:text-[120px] text-white font-bold",
              Poppinsfont.className
            )}
          >
            BLOG APP
          </div>
          <div
            className={cn(
              "flex text-[20px] sm:text-[30px] text-white font-bold",
              Cairofont.className
            )}
          >
            Go deeper into the world of blogs
          </div>
          <div>
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-[30px]"
              onClick={handleRedirect}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
