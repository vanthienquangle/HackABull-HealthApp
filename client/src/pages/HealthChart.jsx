import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

function HealthChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token JWT:", token);
    axios.get("http://localhost:5001/api/health/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      const data = res.data;
      const dates = data.map(d => d.date);
      const hba1c = data.map(d => d.hba1c);
      const glucose = data.map(d => d.glucose);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "HbA1c",
            data: hba1c,
            borderColor: "red",
            tension: 0.3
          },
          {
            label: "Glucose",
            data: glucose,
            borderColor: "blue",
            tension: 0.3
          }
        ]
      });
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu biểu đồ:", err);
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Biểu đồ chỉ số sức khỏe</h2>
      {chartData ? <Line data={chartData} /> : <p>Đang tải dữ liệu...</p>}
    </div>
  );
}

export default HealthChart;
