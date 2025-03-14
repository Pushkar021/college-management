"use client";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = ["/", "/signup", "/verify-otp"].includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar only if hideLayout is false */}
      {!hideLayout && (
        <nav className="w-full bg-blue-600 p-4 text-white text-lg font-bold text-center">
          {/* Navbar components */}
        </nav>
      )}

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Show Footer only if hideLayout is false */}
      {!hideLayout && (
        <footer className="bg-gray-800 text-white text-center p-4 w-full">
          Copyright © {new Date().getFullYear()} Smart College Management
        </footer>
      )}
    </div>
  );
}
