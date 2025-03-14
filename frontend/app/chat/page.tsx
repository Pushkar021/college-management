"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Chat(){
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const userRole = localStorage.getItem("role");
      if (!userRole) {
        console.log("Role not found...redirecting to login");
        router.push("/");
      } else {
          setRole(userRole);
      }

      setLoading(false);
    }, []);

    if (loading) {
      return (
          <div className="h-screen flex items-center justify-center">
              <p className="text-lg font-semibold">Loading...</p>
          </div>
      );
    }

    return(
        <></>
    )
    
}