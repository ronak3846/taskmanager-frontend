import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    const user = await login(email, password);
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "employee") navigate("/employee");
    } else {
      alert("Invalid credentials");
    }
  };return (
    <div className="w-full min-h-screen bg-[#ebe7fb]">
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left Panel */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-6 md:p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-fuchsia-800 mb-2">
              LOGIN
            </h2>
            <p className="text-sm  text-gray-500 text-center mb-8">
              Welcome to TaskManager
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
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

        {/* Right Panel */}
        <div className="w-full md:w-1/2 h-64 md:h-screen">
          <img
            src="https://images.unsplash.com/photo-1618044619888-009e412ff12a?q=80&w=1171&auto=format&fit=crop"
            alt="login-img"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
  
};

export default Login;
