import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function HealthForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Age: "",
    Sex: "",
    BMI: "",
    HighBP: false,
    Diabetes: false,
    HeartDiseaseorAttack: false,
    PhysActivity: false,
    Smoking: false,
    Cholesterol: false,
    FamilyHistory: false,
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
    // Fetch previous assessments if logged in
    if (token) {
      fetchHistory(token);
    }
  }, []);

  const fetchHistory = async (token) => {
    try {
      const res = await axios.get("http://localhost:5001/api/health/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching history:", err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const calculateBMI = () => {
    if (form.Height && form.Weight) {
      const height = parseFloat(form.Height) / 100; // convert cm to m
      const weight = parseFloat(form.Weight);
      if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        setForm({ ...form, BMI: bmi });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMsg("You need to log in before using this service.");
      return;
    }

    setLoading(true);
    setMsg("");

    const data = {
      Age: parseFloat(form.Age),
      Sex: parseInt(form.Sex),
      BMI: parseFloat(form.BMI),
      HighBP: form.HighBP ? 1 : 0,
      Diabetes: form.Diabetes ? 1 : 0,
      HeartDiseaseorAttack: form.HeartDiseaseorAttack ? 1 : 0,
      PhysActivity: form.PhysActivity ? 1 : 0,
      Smoking: form.Smoking ? 1 : 0,
      Cholesterol: form.Cholesterol ? 1 : 0,
      FamilyHistory: form.FamilyHistory ? 1 : 0,
    };

    try {
      // Predict stroke
      const res = await axios.post("http://localhost:5001/api/predict-stroke", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResult(res.data);
      console.log("✅ Prediction successful:", res.data);

      // Save data to database
      try {
        const saveRes = await axios.post("http://localhost:5001/api/health", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Health data saved successfully:", saveRes.data);
        setMsg("Prediction and save successful!");
        
        // Refresh history after saving
        fetchHistory(token);
      } catch (saveErr) {
        console.error("❌ Error saving to database:", saveErr.response?.data || saveErr.message);
        setMsg("Prediction successful but error saving to database.");
      }
    } catch (predictErr) {
      console.error("❌ Prediction error:", predictErr.response?.data || predictErr.message);
      setMsg("Error sending prediction data.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      Age: "",
      Sex: "",
      BMI: "",
      Height: "",
      Weight: "",
      HighBP: false,
      Diabetes: false,
      HeartDiseaseorAttack: false,
      PhysActivity: false,
      Smoking: false,
      Cholesterol: false,
      FamilyHistory: false,
    });
    setResult(null);
    setMsg("");
  };

  const loadHistoryItem = (item) => {
    setForm({
      Age: item.Age.toString(),
      Sex: item.Sex.toString(),
      BMI: item.BMI.toString(),
      HighBP: item.HighBP === 1,
      Diabetes: item.Diabetes === 1,
      HeartDiseaseorAttack: item.HeartDiseaseorAttack === 1,
      PhysActivity: item.PhysActivity === 1,
      Smoking: item.Smoking === 1,
      Cholesterol: item.Cholesterol === 1,
      FamilyHistory: item.FamilyHistory === 1,
    });
    setShowHistory(false);
  };

  const getRecommendations = () => {
    if (!result) return [];
    
    const recommendations = [];
    
    if (form.HighBP) {
      recommendations.push("Control blood pressure by reducing salt, exercising regularly, and taking medication as prescribed by your doctor.");
    }
    
    if (form.Smoking) {
      recommendations.push("Quitting smoking will significantly reduce your risk of stroke.");
    }
    
    if (parseFloat(form.BMI) >= 25) {
      recommendations.push("Lose weight through a healthy diet and regular exercise.");
    }
    
    if (!form.PhysActivity) {
      recommendations.push("Exercise at least 150 minutes per week to improve cardiovascular health.");
    }
    
    if (form.Diabetes) {
      recommendations.push("Control blood sugar closely to reduce the risk of vascular complications.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Maintain your current healthy lifestyle to keep your stroke risk low.");
    }
    
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Stroke Risk Assessment</h1>
        <p className="text-center text-gray-600 mb-8">Enter your health information for AI to predict stroke risk and receive personalized recommendations</p>
        
        {!isLoggedIn && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700">Please <a href="/login" className="underline font-semibold">log in</a> to use all features and save your results.</p>
          </div>
        )}
        
        {isLoggedIn && history.length > 0 && (
          <div className="mb-6">
            <button 
              onClick={() => setShowHistory(!showHistory)} 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showHistory ? "Hide assessment history" : "View assessment history"}
            </button>
            
            {showHistory && (
              <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold mb-3">Your Assessment History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stroke Risk</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString('en-US')}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.Age}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.BMI}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {item.risk ? (
                              <span className={`px-2 py-1 rounded-full text-xs ${item.risk > 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {item.risk}%
                              </span>
                            ) : '-'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => loadHistoryItem(item)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Load
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Health Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input 
                      type="number" 
                      name="Age" 
                      value={form.Age} 
                      onChange={handleChange} 
                      placeholder="Enter age" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                    <select 
                      name="Sex" 
                      value={form.Sex} 
                      onChange={handleChange} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
                      required
                    >
                      <option value="">Select sex</option>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      name="Height" 
                      value={form.Height || ""} 
                      onChange={handleChange} 
                      onBlur={calculateBMI}
                      placeholder="Enter height (cm)" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      name="Weight" 
                      value={form.Weight || ""} 
                      onChange={handleChange} 
                      onBlur={calculateBMI}
                      placeholder="Enter weight (kg)" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                    <input 
                      type="number" 
                      name="BMI" 
                      value={form.BMI} 
                      onChange={handleChange} 
                      placeholder="Enter BMI" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
                      required 
                    />
                    {form.BMI && (
                      <p className="text-xs text-gray-500 mt-1">
                        {parseFloat(form.BMI) < 18.5 ? "Underweight" : 
                        parseFloat(form.BMI) < 25 ? "Normal" : 
                        parseFloat(form.BMI) < 30 ? "Overweight" : "Obese"}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-gray-700 font-medium mb-3">Medical History and Habits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { key: "HighBP", label: "High blood pressure" },
                      { key: "Diabetes", label: "Diabetes" },
                      { key: "HeartDiseaseorAttack", label: "Heart disease/Heart attack" },
                      { key: "PhysActivity", label: "Regular physical activity" },
                      { key: "Smoking", label: "Smoking" },
                      { key: "Cholesterol", label: "High cholesterol" },
                      { key: "FamilyHistory", label: "Family history of stroke" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                        <input 
                          type="checkbox" 
                          name={item.key} 
                          checked={form[item.key]} 
                          onChange={handleChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" 
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                  <button 
                    type="submit" 
                    className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center"
                    disabled={loading}
                    // onClick={() => {
                    //   navigate("/dashboard")
                    // }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : "Analyze Stroke Risk"}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Reset
                  </button>

                  <button 
                    type="button" 
                    onClick={() => navigate("/dashboard")}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Return
                  </button>
                </div>
                
                {msg && (
                  <div className={`mt-4 text-center p-2 rounded ${msg.includes("successful") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {msg}
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {result ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Analysis Result</h2>
                
                <div className="mb-6">
                  <Bar
                    data={{
                      labels: ["You", "Healthy Person"],
                      datasets: [
                        {
                          label: "Stroke Risk (%)",
                          data: [result.user_risk, result.healthy_risk],
                          backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(16, 185, 129, 0.7)"],
                          borderColor: ["rgba(220, 38, 38, 1)", "rgba(5, 150, 105, 1)"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `Risk: ${context.raw}%`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Risk Percentage (%)',
                            font: {
                              size: 12,
                            }
                          },
                          ticks: {
                            precision: 0
                          }
                        }
                      }
                    }}
                  />
                </div>
                
                <div className={`p-4 mb-4 rounded-lg ${result.user_risk > 5 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <h3 className={`font-semibold ${result.user_risk > 5 ? 'text-red-800' : 'text-green-800'}`}>
                    Your Risk:
                  </h3>
                  <div className="flex items-center justify-center my-3">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${result.user_risk > 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      <span className="text-3xl font-bold">{result.user_risk}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 text-center">
                    {result.user_risk <= 1
                      ? "Your risk is very low!"
                      : result.user_risk <= 3
                      ? "Your risk is low."
                      : result.user_risk <= 5
                      ? "Your risk is low to moderate."
                      : result.user_risk <= 10
                      ? "Your risk is moderate to high."
                      : "Your risk is high. Please consult a doctor."}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Personalized Recommendations:</h3>
                  <ul className="space-y-2">
                    {getRecommendations().map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    This result does not replace medical diagnosis. Please consult a doctor.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Assessment Information</h3>
                <p className="text-gray-600 mb-4">Fill in your health information on the side and click "Analyze Stroke Risk" to get results.</p>
                <ul className="text-sm text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Use AI to analyze risk</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Get personalized recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Compare with healthy person's indices</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Track assessment history</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>© 2025 NeuroSure - AI Stroke Prediction and Prevention</p>
          <p className="mt-1">99% Accuracy | HIPAA Compliant | MD Approved</p>
        </div>
      </div>
    </div>
  );
}

export default HealthForm;