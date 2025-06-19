import React from 'react'

const Button = ({text_btn,link_btn}) => {
  return (
    <a href={link_btn} className="w-1/2">
<button className='bg-[#70c1b2] cursor-pointer font-bold text-[17px] text-white rounded-xl w-full py-3 pt-2 hover:shadow-lg hover:shadow-[#70c1b2] transition-all duration-300 ease-in-out '>
  {text_btn}
</button>  
  </a>
  )
}

export default Button