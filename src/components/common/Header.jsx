import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Profile/UserProfile";

function Header({ name }) {
  const { user, setUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Welcome, {name}
      </h1>

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 text-gray-800 dark:text-white focus:outline-none"
        >
          <span className="hidden sm:inline">{user?.firstname}</span>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.firstname}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50">
            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/profile");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              👤 Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      {showProfile && (
        <UserProfile user={user} onClose={() => setShowProfile(false)} />
      )}
    </header>
  );
}

export default Header;
