import React from 'react'
import bankLogo from '../assets/images/logo.png';

const Header = () => {
  return (
    <nav className='flex items-center px-4 bg-[#fff]  justify-between '>
<img src={bankLogo} alt="bank-of-jordan" width={200} />
<h3 className='text-black underline  '>English</h3>
    </nav>
  )
}

export default Header