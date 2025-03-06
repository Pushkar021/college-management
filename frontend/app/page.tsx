import Link from "next/link";

export default function Home() {
    let newDate = new Date()
    let year = newDate.getFullYear();
  return (
    <div className="min-h-screen">
      <nav className="w-full bg-blue-600 p-4 text-white text-lg font-bold text-center">
          {/* navbar components */}
      </nav>
      <main className="flex flex-col gap-8 row-start-2 items-center md:items-center lg:items-center sm:items-start xs:items-start">
      <h1 className="text-4xl font-bold text-gray-800"></h1>
        {/* main page components */}


        {/* login and signup */}
        <div className="mt-6 space-x-4">
          <a href="/login" className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition">
            Login
          </a>
          <a href="/signup" className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition">
            Sign Up
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-5 mb-0">
        Copyright © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
