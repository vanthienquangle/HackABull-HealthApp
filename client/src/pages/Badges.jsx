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
    axios.post("http://localhost:5001/api/badges/checkin", {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setStreak(res.data.streak);
      setLastCheckin(res.data.lastCheckin);
      setMessage("Check-in successful!");
      setTimeout(() => setMessage(""), 3000);
    })
    .catch(() => {
      setMessage("You've already checked in today or there was an error.");
      setTimeout(() => setMessage(""), 3000);
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
    { name: "week", label: "1 Week", src: "/week.png", requirement: "7 days" },
    { name: "2weeks", label: "2 Weeks", src: "/2weeks.png", requirement: "14 days" },
    { name: "month", label: "1 Month", src: "/month.png", requirement: "30 days" },
    { name: "year", label: "1 Year", src: "/year.png", requirement: "365 days" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Journey</h1>
          <p className="text-lg text-gray-600">Track your progress and earn badges by maintaining your daily health routines</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between flex-wrap">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Current Streak</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-4xl font-bold text-emerald-600">{streak}</span>
                      <span className="text-lg ml-2 text-gray-600">days</span>
                    </div>
                    {lastCheckin && (
                      <p className="text-sm text-gray-500 mt-1">
                        Last check-in: {new Date(lastCheckin).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      onClick={handleCheckin}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Daily Check-in
                    </button>
                    {message && (
                      <div className="mt-2 text-sm font-medium text-center">
                        <span className={message.includes("successful") ? "text-emerald-600" : "text-red-600"}>
                          {message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievement Badges</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badgeImages.map(badge => {
                const isActive = getActiveBadge() === badge.name || 
                  (badge.name === "week" && streak >= 7) ||
                  (badge.name === "2weeks" && streak >= 14) ||
                  (badge.name === "month" && streak >= 30) ||
                  (badge.name === "year" && streak >= 365);
                
                return (
                  <div key={badge.name} className="relative">
                    <div className={`bg-white rounded-lg p-4 shadow-md ${isActive ? 'ring-2 ring-emerald-500' : ''}`}>
                      <div className={`relative rounded-full overflow-hidden mx-auto mb-3 w-24 h-24 ${!isActive ? 'blur-sm' : ''}`}>
                        <img
                          src={badge.src}
                          alt={badge.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{badge.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">Streak: {badge.requirement}</p>
                      {isActive && (
                        <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Unlocked
                        </span>
                      )}
                      {!isActive && (
                        <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                          </svg>
                          {streak > 0 ? `${streak}/${badge.requirement.split(' ')[0]}` : 'Locked'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-medium text-emerald-800 mb-2">Consistency Is Key</h3>
              <p className="text-emerald-700">
                Regular check-ins help track your health habits and can reduce stroke risk by up to 87%. 
                Keep your streak going to unlock all badges and improve your health outcomes!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Badges;