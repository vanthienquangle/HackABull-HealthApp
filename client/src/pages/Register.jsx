import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Lock, User, BrainCircuit, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Simple validation for password matching
    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    
    // Submit only username and password to match your original logic
    const submitData = { username: form.username, password: form.password };
    
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", submitData);
      setMsg(res.data.msg || "Registration successful!");
    } catch (err) {
      console.error("Register error:", err);
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Left panel with background image/pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-600 justify-center items-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center mb-8">
            <h1 className="text-4xl font-bold">NeuroSure</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Smarter Stroke Prevention Starts Here</h2>
          <p className="text-lg opacity-90">
          Because preventing strokes should be smart, simple, and personal.
          </p>
        </div>
      </div>

      {/* Right panel with registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <BrainCircuit size={32} className="text-teal-600 mr-2" />
              <h1 className="text-2xl font-bold text-teal-600">NeuroSure</h1>
            </div>
            
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
              Create Your <span className="text-teal-600">NeuroSure</span> Account
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Register to access our neural health analytics platform
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-teal-600 hover:text-teal-500">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-500">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 rounded-lg hover:shadow-lg transition duration-300 font-medium flex items-center justify-center mt-2"
              >
                Create Account
              </button>
            </form>

            {msg && (
              <p className={`text-center text-sm mt-4 ${msg.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                {msg}
              </p>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                By creating an account, you acknowledge NeuroSure's Terms of Service and Privacy Policy.
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Help Center</span>
                  <span className="text-xs">Help</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Privacy</span>
                  <span className="text-xs">Privacy</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Terms</span>
                  <span className="text-xs">Terms</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;