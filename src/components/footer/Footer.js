import React from 'react'
import logo from '../../assets/img/logo-red.png'

const Footer = () => {
  return (
    <div className='bg-dark d-flex justify-content-center align-items-center'>
      <div>
        <div className='text-white'>FOLLOW US</div>
        <div>
          <a>
            <img/>
            <div className='text-white'>Instagram</div>
          </a>
        </div>
        <div>
          <a>
            <img/>
            <div className='text-white'>Twitter</div>
          </a>
        </div>
        <div>
          <a>
            <img/>
            <div className='text-white'>Facebook</div>
          </a>
        </div>
      </div>
      <div>
        <img className='logo' src={logo}/>
      </div>
      <div>
        <div className='text-white'>PAYMENT METHODS</div>
        <div>
          <img/>
          <img/>
          <img/>
          <img/>
        </div>
      </div>
    </div>
  )
}

export default Footer