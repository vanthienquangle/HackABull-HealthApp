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
    recommendedNutrients: {},
    foodRecommendations: []
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    // Nếu chưa có username, chưa gọi
    if (!token || !username) return;
  
    axios
      .get(
        "http://localhost:5001/api/meal/meal-suggestion",
        // {
        //   age: 25,
        //   sex: 1,
        //   bmi: 22.5,
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((nutritionRes) => {
        console.log("✅ Nutrition data:", nutritionRes.data);
        const nutrients = nutritionRes.data.nutrition;
        const genMeal = nutritionRes.data.meals;

        setUserData((prevData) => ({
          ...prevData,
          recommendedNutrients: {
            protein: `${nutrients.protein}g daily`,
            fiber: `${nutrients.fiber}g daily`,
            fat: `${nutrients.fat}g daily`,
            carb: `${nutrients.carb}g daily`,
          },
          foodRecommendations : [
            {
              name: genMeal[0][0],
              nut: "P: "+genMeal[0][1]+", F: "+genMeal[0][2]+", Ft: "+genMeal[0][3]+", C: "+genMeal[0][4]
            },
            {
              name: genMeal[1][0],
              nut: "P: "+genMeal[1][1]+", F: "+genMeal[1][2]+", Ft: "+genMeal[1][3]+", C: "+genMeal[1][4]
            },
            {
              name: genMeal[2][0],
              nut: "P: "+genMeal[2][1]+", F: "+genMeal[2][2]+", Ft: "+genMeal[2][3]+", C: "+genMeal[2][4]
            }
          ]
        }));
        console.log(nutritionRes.data.meals);
        console.log("bombardio crocodilo");
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi gọi meal-suggestion:", err);
        setLoading(false);
      });
  }, [username]); // ✅ Chỉ chạy khi username có giá trị

  useEffect(() => {
    // Set current date
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
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
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-teal-600 text-2xl mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <h1 className="text-teal-600 text-xl font-bold">BeteTheStroke</h1>
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
            New Assessment
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
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hello, {username || "Admin"}</h2>
              <p className="text-gray-600">{currentDate}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Personalized Healthcare Profile
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stroke Risk Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 text-lg font-medium">Stroke Prediction</h3>
              <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                userData.strokeRisk < 3 ? 'bg-green-100 text-green-800' : 
                userData.strokeRisk < 15 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {userData.strokeRisk < 3 ? 'Low' : 
                 userData.strokeRisk < 15 ? 'Mid' : 
                 'High'}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-gray-800">{userData.strokeRisk}%</div>
              <div className="ml-2 text-sm text-gray-500">chance of getting a stroke</div>
            </div>
            <p className="text-gray-600 text-sm mb-4"></p>
            <span className="text-gray-600 text-sm mb-4">
              {userData.strokeRisk < 3 ? "Low chance - Let's keep this up!" : 
                 userData.strokeRisk < 15 ? "Be careful! Follow the guidelines!" : 
                 'High chance - Follow strictly to the guidelines!'}
            </span>
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
              <HealthTable/>
            </div>
          </div>

          {/* Recommended Nutrients Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Suggested Nutrition Intake</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Personalized
              </span>
            </div>
            <div className="space-y-4">
              {Object.entries(userData.recommendedNutrients).map(([nutrient, value]) => (
                <div key={nutrient} className="flex justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                      {nutrient === "protein" ? "P" : 
                       nutrient === "fiber" ? "F" : 
                       nutrient === "fat" ? "Ft" : 
                       nutrient === "carb" ? "C" : ""}
                    </div>
                    <span className="font-medium capitalize">{nutrient}</span>
                  </div>
                  <span className="font-bold text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Food Recommendations Card */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-700 text-lg font-medium">Suggested Meals Plan</h3>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
              Today
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.foodRecommendations.map((food, index) => (
              <div key={index} className="flex p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
                  {food.image}
                </div>
                <div className="ml-4">
                  {console.log(food)}
                  <h4 className="text-teal-600 font-medium mb-1">{food["name"]}</h4>
                  <p className="text-gray-600 text-sm">{food["nut"]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .get(
                    "http://localhost:5001/api/meal/meal-suggestion",
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((nutritionRes) => {
                    console.log("✅ Nutrition data:", nutritionRes.data);
                    const nutrients = nutritionRes.data.nutrition;
                    const genMeal = nutritionRes.data.meals;

                    setUserData((prevData) => ({
                      ...prevData,
                      recommendedNutrients: {
                        protein: `${nutrients.protein}g daily`,
                        fiber: `${nutrients.fiber}g daily`,
                        fat: `${nutrients.fat}g daily`,
                        carb: `${nutrients.carb}g daily`,
                      },
                      foodRecommendations : [
                        {
                          name: genMeal[0][0],
                          nut: "P: "+genMeal[0][1]+", F: "+genMeal[0][2]+", Ft: "+genMeal[0][3]+", C: "+genMeal[0][4]
                        },
                        {
                          name: genMeal[1][0],
                          nut: "P: "+genMeal[1][1]+", F: "+genMeal[1][2]+", Ft: "+genMeal[1][3]+", C: "+genMeal[1][4]
                        },
                        {
                          name: genMeal[2][0],
                          nut: "P: "+genMeal[2][1]+", F: "+genMeal[2][2]+", Ft: "+genMeal[2][3]+", C: "+genMeal[2][4]
                        }
                      ]
                    }));
                    console.log(nutritionRes.data.meals);
                    console.log("bombardio crocodilo");
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.error("❌ Lỗi khi gọi meal-suggestion:", err);
                    setLoading(false);
                  });
              }}>
              Get Other Meals Plan
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
              <h1 className="text-teal-600 text-lg font-bold">BeteTheStroke</h1>
            </div>
            <div className="flex space-x-4">
              <span className="inline-flex items-center text-sm font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">© 2025 BeteTheStroke - Your Trustworthy AI Healthcare</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;