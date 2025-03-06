"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){

    const router = useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [OTP,setOTP]=useState("");
    const [useOTP,setuseOTP]=useState(false);

    //Logged in redirect function 

    // Login function
    const handleLogin=(e: React.FormEvent)=>{
        e.preventDefault();
        if (email && (password || OTP)) {
          router.push("/dashboard");
        } else {
          alert("Enter valid credentials.");
        }
    }

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 mt-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <h1 className="font-medium text-2xl">Login</h1>
                <form onSubmit={handleLogin}>

                    {/* Email input */}
                    <div className="mb-4 mt-4">
                        <label className="">Email</label>
                        <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    {/* OTP or password input */}
                    {!useOTP? (
                        <div className="mb-4">
                        <label className="">Password</label>
                        <input
                            type="password"
                            minLength={8} 
                            maxLength={16}
                            title="Password must be 8-16 characters long"
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                    ) : (
                        <div className="mb-4">
                        <label className="">OTP</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter OTP"
                            value={OTP}
                            onChange={(e) => {
                                let regex=/^\d+$/;
                                if(regex.test(e.target.value)){
                                    setOTP(e.target.value);
                                }
                            }}
                            maxLength={5}
                            required
                        />
                        </div>
                    )}

                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => setuseOTP(!useOTP)}>
                        {OTP ? "Use Password Instead" : "Use OTP Instead"}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition">
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
}