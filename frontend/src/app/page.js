// src/app/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Agar user login nahi hai, login page par redirect karo
    router.push("/login");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Redirecting to Login...</h1>
    </div>
  );
}
