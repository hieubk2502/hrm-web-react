import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">HRM System</h1>
        </div>
      </header>
      
      <main className="flex-1 bg-gray-50 p-6">
        <div className="container mx-auto">
          {/* Outlet is where the child routes will be rendered */}
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        &copy; {new Date().getFullYear()} HRM System. All rights reserved.
      </footer>
    </div>
  );
}
