import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ ĐÃ THÊM DÒNG NÀY

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard"); // Giờ sẽ hoạt động!
      setMsg("Đăng nhập thành công!");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input name="username" onChange={handleChange} placeholder="Username" className="p-2 border rounded" />
        <input name="password" onChange={handleChange} type="password" placeholder="Password" className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
      <p className="text-blue-600 mt-4">{msg}</p>
    </div>
  );
}

export default Login;
