import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HealthForm from "./pages/HealthForm";
import HealthChart from "./pages/HealthChart";
import StrokePredictChart from "./pages/StrokePredictChart";
import MealSuggestion from "./pages/MealSuggestion";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path="/home" element={<LandingPage />}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<HealthForm />} />
        <Route path="/history" element={<HealthChart />} />
        <Route path="/predict" element={<StrokePredictChart />} />
        {/* <Route path="/badges" element={<Badges />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
