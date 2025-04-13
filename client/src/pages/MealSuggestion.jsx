// src/pages/MealSuggestion.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function MealSuggestion() {
  const [meals, setMeals] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5001/api/meal-suggestion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMeals(res.data.meals);
        setNutrition(res.data.nutrition);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy gợi ý món ăn:", err);
        setError("Không thể lấy gợi ý món ăn từ hệ thống.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Gợi ý món ăn từ AI</h2>

      {loading && <p className="text-center text-gray-600">Đang tải món ăn gợi ý...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && nutrition && (
        <div className="bg-gray-50 border p-4 rounded mb-4">
          <h3 className="text-lg font-semibold mb-2">Nhu cầu dinh dưỡng được gợi ý:</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Protein: {nutrition.protein}g</li>
            <li>Carb: {nutrition.carb}g</li>
            <li>Fiber: {nutrition.fiber}g</li>
            <li>Fat: {nutrition.fat}g</li>
          </ul>
        </div>
      )}

      {!loading && meals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Danh sách món ăn được đề xuất:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {meals.map((meal, idx) => (
              <li key={idx}>{meal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MealSuggestion;
