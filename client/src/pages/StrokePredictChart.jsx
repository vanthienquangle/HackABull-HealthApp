// StrokePredictChart.jsx (Form đầu tiên cũng dự đoán luôn)
import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StrokePredictChart() {
  const [form, setForm] = useState({
    Age: "",
    Sex: "",
    BMI: "",
    HighBP: false,
    Diabetes: false,
    HeartDiseaseorAttack: false,
    PhysActivity: false,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = {
      Age: parseFloat(form.Age),
      Sex: parseInt(form.Sex),
      BMI: parseFloat(form.BMI),
      HighBP: form.HighBP ? 1 : 0,
      Diabetes: form.Diabetes ? 1 : 0,
      HeartDiseaseorAttack: form.HeartDiseaseorAttack ? 1 : 0,
      PhysActivity: form.PhysActivity ? 1 : 0,
    };

    try {
      const res = await axios.post("http://localhost:5001/api/predict-stroke", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Lỗi khi dự đoán:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dự đoán nguy cơ đột quỵ</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <input type="number" name="Age" value={form.Age} onChange={handleChange} placeholder="Tuổi" className="p-2 border rounded" required />

        <select name="Sex" value={form.Sex} onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Chọn giới tính</option>
          <option value="1">Nam</option>
          <option value="0">Nữ</option>
        </select>

        <input type="number" name="BMI" value={form.BMI} onChange={handleChange} placeholder="BMI" className="p-2 border rounded" required />

        {[
          "HighBP",
          "Diabetes",
          "HeartDiseaseorAttack",
          "PhysActivity",
        ].map((field) => (
          <label key={field} className="flex items-center gap-2">
            <input type="checkbox" name={field} checked={form[field]} onChange={handleChange} />
            {field}
          </label>
        ))}

        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Gửi và dự đoán
        </button>
      </form>

      {result && (
        <div className="mt-8 max-w-2xl mx-auto">
          <Bar
            data={{
              labels: ["Bạn", "Người khỏe mạnh"],
              datasets: [
                {
                  label: "Tỉ lệ đột quỵ (%)",
                  data: [result.user_risk, result.healthy_risk],
                  backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
                },
              ],
            }}
          />
          <p className="text-center mt-4 text-lg font-semibold">
            Nguy cơ của bạn: {result.user_risk}% — Trung bình người khỏe mạnh: {result.healthy_risk}%
          </p>
        </div>
      )}
    </div>
  );
}

export default StrokePredictChart;