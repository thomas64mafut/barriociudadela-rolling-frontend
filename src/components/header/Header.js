import React from 'react'
import './header.css'
import logo from '../../assets/img/logo-red.png'

const Header = () => {
  return (
    <div className='headerContainer'>
      <div className='navHome d-flex justify-content-around align-items-center'>
        <div>
          <a className='navOptions boton1'>ABOUT US</a>
          <a className='navOptions boton1'>MENUS</a>
          <a className='navOptions boton1'>FOLLOW US</a>
        </div>
        <div>
          <img className='logo' src={logo} alt=''/>
        </div>
        <div>
          <a className='navOptions boton1'>CONTACT US</a>
          <a className='navOptions boton1'>LOGIN</a>
          <a className='navOptions boton1'>REGISTER</a>
        </div>
      </div>
    </div>
  )
}

export default Header