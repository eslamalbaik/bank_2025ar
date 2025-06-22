import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Subs from "./pages/Subs";
import Forget from "./pages/Forget";
import OTPVerification from "./pages/OTP";
import Bankloans from "./pages/Bankloans";
import Card from "./pages/Card";
import LoginL from "./pages/Loginl";

function App() {
  return (
    <div className="bg-[#fff] ">
         
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginL />} />
        <Route path="/subs" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/bankloans" element={<LoginL />} /> 
  {/* <Route path="/card" element={<Card />} /> */}

      </Routes>
    </div>
  )
}

export default App
