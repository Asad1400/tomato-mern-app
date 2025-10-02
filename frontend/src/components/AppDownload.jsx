import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='flex flex-col items-center gap-4 mt-4'>
      <p className='text-4xl font-medium text-center'>For Better Experience Download <br /> Tomato App</p>
      <div className='flex gap-4 flex-col sm:flex-row'>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
