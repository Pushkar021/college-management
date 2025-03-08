"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [useOTP, setUseOTP] = useState(false);

  // Toggle between OTP and Password login
  const toggleOTP = () => setUseOTP(!useOTP);

  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && ((useOTP && OTP.length === 5) || (!useOTP && password.length >= 8))) {
      router.push("/dashboard");
    } else {
      alert("Enter valid credentials.");
    }
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

          {/* OTP or Password Input */}
          <div className="mb-4">
            <label className="block font-medium">{useOTP ? "OTP" : "Password"}</label>
            <input
              type={useOTP ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder={useOTP ? "Enter OTP" : "Enter Password"}
              value={useOTP ? OTP : password}
              onChange={(e) => {
                if (useOTP) {
                  let regex = /^\d+$/;
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setOTP(e.target.value);
                  }
                } else {
                  setPassword(e.target.value);
                }
              }}
              maxLength={useOTP ? 5 : 16}
              minLength={useOTP ? undefined : 8}
              required
            />
          </div>

          {/* Toggle between Password & OTP */}
          <p className="text-sm text-blue-500 cursor-pointer" onClick={toggleOTP}>
            {useOTP ? "Use Password Instead" : "Use OTP Instead"}
          </p>

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
