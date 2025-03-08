export default function Dashboard(){
    let newDate = new Date()
    let year = newDate.getFullYear();
  return (
    <div className="min-h-screen">
      <nav className="w-full bg-blue-600 p-4 text-white text-lg font-bold text-center">
          {/* navbar components */}
      </nav>
        
            {/* main page here  */}

      <footer className="bg-gray-800 text-white text-center p-4 w-full fixed bottom-0">
        Copyright © {new Date().getFullYear()} Smart College Management
      </footer>
    </div>
  );
}