import React from 'react'
// import wave from '../assets/images/wave.png';
import Header from '../Components/Header';
import Services from '../Components/Services';

const HomePage = () => {
  return (
    <div className="bg-[#fff] min-h-[1000px]">
    <Header/>
    <Services/>
    {/* <img src={wave} alt="wave" className="w-full" /> */}
    </div>
  )
}

export default HomePage