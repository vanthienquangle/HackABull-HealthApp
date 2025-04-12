import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HealthChart from "./HealthChart";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // backend trả: { "user": "username" }
          setUsername(res.data.user);
        })
        .catch((err) => {
          console.error("🔒 Token lỗi hoặc hết hạn:", err);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
  
      {/* ✅ Biểu đồ sức khỏe */}
      <div className="mt-8 w-full px-4">
        <HealthChart />
      </div>
    </div>
  );  
}

export default Dashboard;
