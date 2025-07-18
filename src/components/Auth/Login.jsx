import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added loading state

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true); // ✅ show loader
    try {
      const user = await login(email, password);
      if (user) {
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "employee") navigate("/employee/dashboard");
      } else {
        toast.error("Invalid Details", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#ebe7fb]">
      <ToastContainer />
      {loading && <Loader />}

      {/* Right Panel (on top in mobile) */}

      {/* Left Panel (login form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 sm:px-6 md:px-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-fuchsia-800 mb-2">
            LOGIN
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6 sm:mb-8">
            Welcome to TaskManager
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="on"
                name="email"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
                className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm text-purple-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition text-sm sm:text-base"
            >
              Login Now
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

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
    </div>
  );
}

export default Login;
