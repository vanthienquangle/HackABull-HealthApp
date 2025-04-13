import { useEffect, useState } from "react";
import axios from "axios";

function HealthTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    
    axios
      .get("http://localhost:5001/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading health history:", err);
        setError("Unable to load your health data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to interpret binary/numeric values
  const formatValue = (key, value) => {
    if (key === "Sex") return value === 1 ? "Male" : "Female";
    if (key === "HighBP" || key === "Diabetes" || key === "HeartDiseaseorAttack" || key === "PhysActivity") {
      return value === 1 ? "Yes" : "No";
    }
    return value;
  };

  if (loading) {
    return (
      <div className="p-6 mt-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-40">
          <div className="text-teal-500">Loading your health records...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Health History</h2>
      <p className="text-gray-600 mb-4">Track your health metrics over time to see your progress</p>
      
      {records.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No health records found. Start your health journey by completing an assessment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-teal-50">
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Date</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Age</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Sex</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">BMI</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">High BP</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Diabetes</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Heart Disease</th>
                <th className="px-4 py-3 border-b border-teal-100 text-left text-sm font-medium text-teal-700">Physical Activity</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx) => (
                <tr 
                  key={idx} 
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">
                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">{record.Age}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">{formatValue("Sex", record.Sex)}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">{record.BMI}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">
                    <span className={record.HighBP === 1 ? "text-red-500 font-medium" : "text-green-500"}>
                      {formatValue("HighBP", record.HighBP)}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">
                    <span className={record.Diabetes === 1 ? "text-red-500 font-medium" : "text-green-500"}>
                      {formatValue("Diabetes", record.Diabetes)}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">
                    <span className={record.HeartDiseaseorAttack === 1 ? "text-red-500 font-medium" : "text-green-500"}>
                      {formatValue("HeartDiseaseorAttack", record.HeartDiseaseorAttack)}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700">
                    <span className={record.PhysActivity === 1 ? "text-green-500 font-medium" : "text-yellow-500"}>
                      {formatValue("PhysActivity", record.PhysActivity)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {records.length} health records found
        </div>
        <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
          New Assessment
        </button>
      </div>
    </div>
  );
}

export default HealthTable;