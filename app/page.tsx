"use client";
import React from "react";
import LandingPage from "@/components/landing-page";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.data && session.data.user) router.push('/home');
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LandingPage />
    </div>
  );
}
