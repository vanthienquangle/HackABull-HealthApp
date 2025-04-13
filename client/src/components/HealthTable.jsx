import { useEffect, useState } from "react";
import axios from "axios";

function HealthTable() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("📦 Token:", token); // test thử
    axios
      .get("http://localhost:5001/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecords(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải dữ liệu lịch sử:", err);
      });
  }, []);

  return (
    <div className="p-4 mt-8 w-full max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Lịch sử sức khỏe</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Sex</th>
              <th className="px-4 py-2 border">BMI</th>
              <th className="px-4 py-2 border">HighBP</th>
              <th className="px-4 py-2 border">Diabetes</th>
              <th className="px-4 py-2 border">HeartDisease</th>
              <th className="px-4 py-2 border">PhysActivity</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx} className="text-center">
                <td className="px-4 py-2 border">{r.Age}</td>
                <td className="px-4 py-2 border">{r.Sex === 1 ? "Nam" : "Nữ"}</td>
                <td className="px-4 py-2 border">{r.BMI}</td>
                <td className="px-4 py-2 border">{r.HighBP}</td>
                <td className="px-4 py-2 border">{r.Diabetes}</td>
                <td className="px-4 py-2 border">{r.HeartDiseaseorAttack}</td>
                <td className="px-4 py-2 border">{r.PhysActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HealthTable;
