"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Token check
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      router.push("/login");
      return;
    }

    // Fetch user data (optional)
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <>
            <p className="text-lg mb-2">Welcome, <b>{user.name}</b></p>
            <p className="text-gray-600 mb-4">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-600 mb-4">Welcome back!</p>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
