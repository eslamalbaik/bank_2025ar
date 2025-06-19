import React from 'react'
import bankLogo from '../assets/images/logo (1).png';

const Header = () => {
  return (
    <nav className='flex items-center px-4 bg-[#fff]  justify-between '>
<h3 className='text-black underline  '>English</h3>
<img src={bankLogo} alt="bank-of-jordan" width={200} />
    </nav>
  )
}

export default Header