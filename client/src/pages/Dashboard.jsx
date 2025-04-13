import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HealthTable from "../components/HealthTable";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Mock data - replace with API calls in production
  const [userData, setUserData] = useState({
    strokeRisk: 15,
    weeklyProgress: 5,
    nutritionScore: 87,
    recommendedNutrients: {
      protein: "75g daily",
      fiber: "28g daily",
      magnesium: "320mg daily",
      potassium: "3500mg daily"
    },
    foodRecommendations: [
      {
        name: "Quinoa Salad",
        nutrients: "Protein: 12g, Fiber: 5g, Mg: 118mg",
        image: "🥗"
      },
      {
        name: "Lentil Soup",
        nutrients: "Protein: 18g, Fiber: 16g, K: 730mg",
        image: "🍲"
      },
      {
        name: "Avocado Toast",
        nutrients: "Protein: 7g, Fiber: 10g, Mg: 58mg, K: 485mg",
        image: "🥑"
      }
    ]
  });

  useEffect(() => {
    // Set current date
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('vi-VN', options));
    
    // Authentication logic
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
          // backend returns: { "user": "username" }
          setUsername(res.data.user);
          
          // In a real app, you would fetch user health data here
          // setUserData(res.data.healthData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("🔒 Token expired or invalid:", err);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Progress bar component
  const ProgressBar = ({ value, max, color, showText = false }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        />
        {showText && (
          <div className="text-xs text-gray-500 mt-1 text-right">
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <HealthTable />
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-teal-600 text-2xl mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <h1 className="text-teal-600 text-xl font-bold">NeuroSure</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/health")}
            className="bg-teal-50 text-teal-600 hover:bg-teal-100 px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Đánh giá mới
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Xin chào, {username || "Admin"}</h2>
              <p className="text-gray-600">{currentDate}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Hồ sơ cá nhân hóa
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stroke Risk Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Nguy cơ đột quỵ</h3>
              <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                userData.strokeRisk < 5 ? 'bg-green-100 text-green-800' : 
                userData.strokeRisk < 15 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {userData.strokeRisk < 5 ? 'Thấp' : 
                 userData.strokeRisk < 15 ? 'Trung bình' : 
                 'Cao'}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-gray-800">{userData.strokeRisk}%</div>
              <div className="ml-2 text-sm text-gray-500">nguy cơ</div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Nguy cơ thấp - Hãy tiếp tục duy trì!</p>
            <ProgressBar 
              value={userData.strokeRisk} 
              max={100} 
              color={
                userData.strokeRisk < 5 ? '#4ADE80' : 
                userData.strokeRisk < 15 ? '#FBBF24' : 
                '#F87171'
              } 
            />
          </div>

          {/* Weekly Progress Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Tiến độ tuần</h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                Theo dõi
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-gray-800">{userData.weeklyProgress}/7</div>
              <div className="ml-2 text-sm text-gray-500">ngày</div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Sắp đạt được huy hiệu tiếp theo!</p>
            <ProgressBar value={userData.weeklyProgress} max={7} color="#60A5FA" />
          </div>

          {/* Nutrition Score Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Điểm dinh dưỡng</h3>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                Tuyệt vời
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-gray-800">{userData.nutritionScore}</div>
              <div className="ml-2 text-sm text-gray-500">/100</div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Làm tốt lắm! Tiếp tục theo khuyến nghị</p>
            <ProgressBar value={userData.nutritionScore} max={100} color="#4ADE80" />
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Health Chart */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Theo dõi sức khỏe</h3>
              <div className="flex space-x-2">
                <button className="bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1 rounded-md text-sm transition-colors">
                  Tuần
                </button>
                <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-md text-sm transition-colors">
                  Tháng
                </button>
                <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-md text-sm transition-colors">
                  Năm
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Nutrients Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Khuyến nghị dinh dưỡng</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Cá nhân hóa
              </span>
            </div>
            <div className="space-y-4">
              {Object.entries(userData.recommendedNutrients).map(([nutrient, value]) => (
                <div key={nutrient} className="flex justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                      {nutrient === "protein" ? "P" : 
                       nutrient === "fiber" ? "F" : 
                       nutrient === "magnesium" ? "Mg" : 
                       nutrient === "potassium" ? "K" : ""}
                    </div>
                    <span className="font-medium capitalize">{nutrient}</span>
                  </div>
                  <span className="font-bold text-gray-700">{value}</span>
                </div>
              ))}
              <div className="pt-4">
                <button className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 py-2 rounded-md transition-colors text-sm font-medium flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Xem thêm chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Food Recommendations Card */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-700 text-lg font-medium">Khuyến nghị thực phẩm</h3>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
              Hôm nay
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.foodRecommendations.map((food, index) => (
              <div key={index} className="flex p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
                  {food.image}
                </div>
                <div className="ml-4">
                  <h4 className="text-teal-600 font-medium mb-1">{food.name}</h4>
                  <p className="text-gray-600 text-sm">{food.nutrients}</p>
                  <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Xem công thức
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
              Tùy chỉnh kế hoạch dinh dưỡng
            </button>
          </div>
        </div>

        {/* Daily Plan Card */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-700 text-lg font-medium">Kế hoạch hàng ngày</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Còn 4 nhiệm vụ
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-md">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="ml-3 font-medium text-green-800 line-through">Uống 2 ly nước</h4>
              </div>
              <p className="ml-9 mt-1 text-sm text-green-700">Đã hoàn thành lúc 08:15</p>
            </div>
            
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="ml-3 font-medium text-blue-800">Đi bộ 30 phút</h4>
              </div>
              <p className="ml-9 mt-1 text-sm text-blue-700">Đề xuất: 17:00 - 17:30</p>
            </div>
            
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="ml-3 font-medium text-blue-800">Thêm rau xanh vào bữa tối</h4>
              </div>
              <p className="ml-9 mt-1 text-sm text-blue-700">Giảm nguy cơ đột quỵ: ↓3%</p>
            </div>
            
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h4 className="ml-3 font-medium text-blue-800">Đo huyết áp buổi tối</h4>
              </div>
              <p className="ml-9 mt-1 text-sm text-blue-700">Đề xuất: 20:00 - 21:00</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Xem lịch tuần
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Thêm nhiệm vụ mới
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-teal-600 text-xl mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </span>
              <h1 className="text-teal-600 text-lg font-bold">NeuroSure</h1>
            </div>
            <div className="flex space-x-4">
              <span className="inline-flex items-center text-sm font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Độ chính xác 99%
              </span>
              <span className="inline-flex items-center text-sm font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                HIPAA Compliant
              </span>
              <span className="inline-flex items-center text-sm font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Hỗ trợ 24/7
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">© 2025 NeuroSure - AI dự đoán và phòng ngừa đột quỵ</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;