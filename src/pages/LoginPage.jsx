import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is "admin"
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", role); // Save the selected role
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  // Animation variant for the image
  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-[#C1DCDC] flex items-center justify-center">
        <motion.img
          src="/public/login.svg"
          alt="Login Illustration"
          className="w-auto h-3/4 object-contain"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-[#333] mb-6">Login</h2>
          
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(""); // Clear error message on input change
              }}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errorMessage ? "border-red-500" : "border-gray-300"
              } focus:ring-[#C1DCDC] focus:border-[#C1DCDC]`}
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(""); // Clear error message on input change
              }}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errorMessage ? "border-red-500" : "border-gray-300"
              } focus:ring-[#C1DCDC] focus:border-[#C1DCDC]`}
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#C1DCDC] focus:border-[#C1DCDC]"
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#C1DCDC] text-white py-2 px-4 rounded-md hover:bg-[#A8C3C3] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
