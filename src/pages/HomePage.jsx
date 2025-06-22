import React from 'react'
// import wave from '../assets/images/wave.png';
import Header from '../Components/Header';
import Services from '../Components/Services';
import {  Globe} from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-[#fff] min-h-[1000px] relative">
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
              <br /><br />
    <Header/>
    <Services/>
    {/* <img src={wave} alt="wave" className="w-full" /> */}
    </div>
  )
}

export default HomePage