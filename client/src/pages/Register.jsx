import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", form);
      setMsg(res.data.msg);
    } catch (err) {
      console.error("Register error:", err);
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input name="username" onChange={handleChange} placeholder="Username" className="p-2 border rounded" />
        <input name="password" onChange={handleChange} type="password" placeholder="Password" className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
      <p className="text-green-600 mt-4">{msg}</p>
    </div>
  );
}

export default Register;
