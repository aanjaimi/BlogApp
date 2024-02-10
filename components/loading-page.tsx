import React from "react";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image src="/loading.gif" alt="loading" width={1000} height={1000} />
      <p className="text-[100px] font-bold">Loading</p>
    </div>
  );
};

export default LoadingPage;
