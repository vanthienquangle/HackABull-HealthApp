import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Lock, User, BrainCircuit } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
      setMsg("Đăng nhập thành công!");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Left panel with background image/pattern */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-600 justify-center items-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center mb-8">
            <h1 className="text-4xl font-bold">BeteTheStroke</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Proactive Stroke Prevention with Intelligent Health Tools</h2>
          <p className="text-lg opacity-90">
            AI that helps prevent strokes — before they happen.
            From personalized advice to daily nudges, BeteTheStroke guides you every step of the way.
          </p>
        </div>
      </div>

      {/* Right panel with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <BrainCircuit size={32} className="text-teal-600 mr-2" />
              <h1 className="text-2xl font-bold text-teal-600">BeteTheStroke</h1>
            </div>
            
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
              Welcome Back to <span className="text-teal-600">BeteTheStroke</span>
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Sign in to access your BeteTheStroke dashboard
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
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 rounded-lg hover:shadow-lg transition duration-300 font-medium flex items-center justify-center"
              >
                Log In
              </button>
            </form>

            {msg && (
              <p className={`text-center text-sm mt-4 ${msg === "Đăng nhập thành công!" ? "text-green-500" : "text-red-500"}`}>
                {msg}
              </p>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-teal-600 hover:text-teal-500">
                  Register Now
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                By signing in, you agree to BeteTheStroke's Terms of Service and Privacy Policy.
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