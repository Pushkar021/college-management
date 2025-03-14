"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUp(){

    const router= useRouter();
    const [userName,setUserName]= useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [role,setRole]=useState("");
    const [enrollment, setEnrollment] = useState("");
    const [error, setError] = useState("");

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    //check if username exists

    //password validation function
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setError(regex.test(value) ? "" : "Password must be 8-16 characters and include at least one letter, number, and special character.");
      };

     // signup function
     const handleSignUp=async(e: React.FormEvent)=>{
        e.preventDefault();

        if(!regex.test(password)){

        }

        if (password !== confirmPassword) {
            setError("Confirm Password!");
            return;
        }
        if (role === "Student" && !/^\d{12}$/.test(enrollment)) {
            setError("Enter a valid 12-digit enrollment number.");
            return;
        }

        // Check if enrollment number already exists

        setError("");
          // Send signup request to backend
                // const res = await fetch("/api/signup", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({ userName, email, password, role, enrollment }),
                // });

                // if (res.ok) {
                //     
                //     router.push(`/verify-otp?email=${email}`);
                // } else {
                //     setError("Signup failed. Try again.");
                // }

        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    };

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 mt-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <h1 className="font-medium text-2xl">Sign Up</h1>
                <form onSubmit={handleSignUp}>

                    {/* Username input */}
                    <div className="mb-4 mt-4">
                        <label className="">Username</label>
                        <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        placeholder="Enter a username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        />
                    </div>

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

                    {/*Password and confirmation*/}
                    <div className="mb-4 mt-4">
                        <label className="">Password</label>
                        <input
                        type="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        placeholder="Set a Password "
                        title="Password must be 8-16 characters long and include at least one letter, one number, and one special character."
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        />
                         
                    </div>
                    <div className="mb-4 mt-4">
                        <label className="">Password Confirmation</label>
                        <input
                        type="password"
                        name="confirmPassword"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        placeholder="Set a Password "
                        title="Password must be 8-16 characters long and include at least one letter, one number, and one special character."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4 mt-4">
                        <label className="">Role</label>
                        <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        required
                        >
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        </select>
                    </div>

                    {role === "Student" && (
                        <div className="mb-4 mt-4">
                        <label className="">Enrollment Number</label>
                        <input
                            type="text"
                            value={enrollment}
                            onChange={(e) => setEnrollment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                        </div>
                    )}

                     {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition">
                        Sign Up
                    </button>
                    <p className="mt-4 text-center text-sm">
                        Already have an account? <a href="/" className="text-blue-500">Login</a>
                    </p>
                </form>
            </div>
        </div>
    )
}