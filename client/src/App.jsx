import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HealthForm from "./pages/HealthForm";
import HealthChart from "./pages/HealthChart";
import StrokePredictChart from "./pages/StrokePredictChart";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<HealthForm />} />
        <Route path="/history" element={<HealthChart />} />
        <Route path="/predict" element={<StrokePredictChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
