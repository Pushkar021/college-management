"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
      //login logic
      router.push("/dashboard");
      // temp
      localStorage.setItem("role", "student"); 
    
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="font-semibold text-2xl text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="mt-4">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 mt-4">
                <label className="">Password</label>
                <input
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Set a Password "
                title="Password must be 8-16 characters long and include at least one letter, one number, and one special character."
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                  
            </div>


          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition">
            Login
          </button>

          {/* Sign-up Link */}
          <p className="mt-4 text-center text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}