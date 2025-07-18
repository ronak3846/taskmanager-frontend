import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/api"; // ✅ Replace axios with centralized instance
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData); // ✅ Use API instance
      toast.success("Registration successful! Please login.", {
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed" ,  {
        position: "top-right",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#ebe7fb]">
      <ToastContainer />


      {/* Branding Panel (top on mobile, side on desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-600 py-8 md:py-0">
        <div className="flex flex-col items-center">
          <img
            src="/logosimple.png"
            alt="Register Illustration"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full object-cover"
          />
          <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl mt-4 text-center">
            TaskSuite
          </h1>
          <h3 className="text-white mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl text-center px-4">
            Your Complete Suite for Task Management.
          </h3>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 sm:px-6 md:px-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6 sm:mb-8">
            Join us to manage your tasks better!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="Your Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm text-purple-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition text-sm sm:text-base"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

}

export default Register;
