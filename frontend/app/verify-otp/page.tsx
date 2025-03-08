"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTP() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email"); 

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (otp.length !== 6) {
            setError("Enter a valid 6-digit OTP.");
            return;
        }

        router.push("/dashboard"); 

        // API call to verify OTP

                // const res = await fetch("/api/verify-otp", {
                //     method: "POST",
                //     body: JSON.stringify({ email, otp }),
                //     headers: { "Content-Type": "application/json" },
                // });

                // if (res.ok) {
                //     router.push("/dashboard"); 
                // } else {
                //     setError("Invalid OTP. Try again.");
                // }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-medium">Verify OTP</h1>
                <p className="text-gray-500 text-sm">OTP sent to {email}</p>

                <form onSubmit={handleVerifyOTP} className="mt-4">
                    <input
                        type="text"
                        maxLength={6}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
