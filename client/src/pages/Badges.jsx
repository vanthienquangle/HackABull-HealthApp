// src/pages/Badges.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Badges() {
  const [streak, setStreak] = useState(0);
  const [lastCheckin, setLastCheckin] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5001/api/badges/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setStreak(res.data.streak);
      setLastCheckin(res.data.lastCheckin);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const handleCheckin = () => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5001/api/badges", {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setStreak(res.data.streak);
      setLastCheckin(res.data.lastCheckin);
      setMessage("Check-in thành công!");
    })
    .catch(() => {
      setMessage("Đã check-in hôm nay hoặc có lỗi!");
    });
  };

  const getActiveBadge = () => {
    if (streak >= 365) return "year";
    if (streak >= 30) return "month";
    if (streak >= 14) return "2weeks";
    if (streak >= 7) return "week";
    return null;
  };

  const badgeImages = [
    { name: "week", label: "1 Tuần", src: "../public/week.png" },
    { name: "2weeks", label: "2 Tuần", src: "../public/2weeks.png" },
    { name: "month", label: "1 Tháng", src: "../public/month.png" },
    { name: "year", label: "1 Năm", src: "../public/year.png" },
  ];

  return (
    <div className="min-h-screen bg-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🏅 Huy hiệu chăm sóc sức khỏe</h1>
      {loading ? <p>Đang tải...</p> : (
        <>
          <p className="mb-2">Chuỗi ngày liên tục: <strong>{streak}</strong></p>
          <button
            onClick={handleCheckin}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 mb-4"
          >
            Check-in hôm nay
          </button>
          {message && <p className="text-gray-600 mb-4">{message}</p>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {badgeImages.map(badge => (
              <div key={badge.name} className="text-center">
                <img
                  src={badge.src}
                  alt={badge.label}
                  className={`w-24 h-24 mx-auto mb-2 ${getActiveBadge() === badge.name ? 'ring-4 ring-emerald-500 rounded-full' : 'opacity-60'}`}
                />
                <p className="text-sm font-medium text-gray-700">{badge.label}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Badges;
