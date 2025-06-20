// src/layout/EmployeeLayout.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, LayoutDashboard, Menu } from "lucide-react";

function EmployeeLayout({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "admin" ? "/admin" : "/employee/dashboard";

    const profilePath =
      user?.role === "admin" ? "/admin/profile" : "/employee/profile";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-white shadow-md w-60 hidden md:flex flex-col justify-between`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600 mb-8">Task Manager</h1>
          <nav className="flex flex-col space-y-4">
            <Link
              to={dashboardPath}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              to={profilePath}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
            >
              <User size={20} />
              Profile
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar for mobile */}
      <div className="md:hidden">
        <button
          className="absolute top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold text-blue-600 mb-8">
                  Task Manager
                </h1>
                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/employee/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <Link
                    to="/employee/profile"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                </nav>
              </div>
              <div className="pt-6 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
            <div
              className="flex-1 bg-black opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 w-full">{children}</main>
    </div>
  );
}

export default EmployeeLayout;
