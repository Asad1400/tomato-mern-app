import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between py-2 px-[4%] items-center'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Admin Forever Logo" />
      <img src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
