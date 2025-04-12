import { useState } from "react";
import axios from "axios";

function HealthForm() {
  const [form, setForm] = useState({
    hba1c: "",
    glucose: "",
    date: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5001/api/health", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg("Đã lưu thành công!");
      setForm({ hba1c: "", glucose: "", date: "" });
    } catch (err) {
      setMsg("Lỗi khi gửi dữ liệu");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Nhập chỉ số sức khỏe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input type="number" step="0.1" name="hba1c" value={form.hba1c} onChange={handleChange} placeholder="HbA1c (%)" className="p-2 border rounded" />
        <input type="number" name="glucose" value={form.glucose} onChange={handleChange} placeholder="Glucose (mg/dL)" className="p-2 border rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Gửi
        </button>
        <p className="text-center text-green-600">{msg}</p>
      </form>
    </div>
  );
}

export default HealthForm;
