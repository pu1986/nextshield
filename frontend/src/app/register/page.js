"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register(){
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange  = (e) => setFormData({...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            alert(res.data.msg);
            router.push("/login");
        }catch (err) {
            setError(err.response?.data?.msg || "Something went wrong");
        }
        setLoading(false);
    }
    
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                    />
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                </form>
            </div>
        </>
    );
}
