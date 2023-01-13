import React from 'react'
import './header.css'
import logo from '../../assets/img/logo-red.png'

const Header = () => {
  return (
    <div className='headerContainer'>
      <div className='navHome d-flex justify-content-around align-items-center'>
        <div>
          <a className='navOptions boton1'>about us</a>
          <a className='navOptions boton1'>menu</a>
          <a className='navOptions boton1'>follow us</a>
        </div>
        <div>
          <img className='logo' src={logo} alt=''/>
        </div>
        <div>
          <a className='navOptions boton1'>contact us</a>
          <a className='navOptions boton1'>login</a>
          <a className='navOptions boton1'>register</a>
        </div>
      </div>
    </div>
  )
}

export default Header