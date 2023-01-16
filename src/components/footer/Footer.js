import React from 'react'
import './footer.css'
import logo from '../../assets/img/logo-red.png'
import Facebook from '../../assets/icons/light/Facebook'
import Twitter from '../../assets/icons/light/Twitter'
import Instagram from '../../assets/icons/light/Instagram'
import American from '../../assets/img/american-express.webp'
import Mastercard from '../../assets/img/mastercard.webp'
import Naranja from '../../assets/img/naranja-x.webp'
import Visa from '../../assets/img/visa.webp'

const Footer = () => {
  return (
    <div className='bg-dark d-flex justify-content-center align-items-center row homeFooter'>
      <div className='text-white col-12 col-md-4 d-flex flex-column align-items-center'>
        <div className='fw-bold'>FOLLOW US</div>
        <div>
          <a className='d-flex socialAs'>
            <Instagram/>
            <div className='text-white boton'>Instagram</div>
          </a>
        </div>
        <div>
          <a className='d-flex socialAs me-3'>
            <Twitter/>
            <div className='text-white boton'>Twitter</div>
          </a>
        </div>
        <div>
          <a className='d-flex socialAs me-2'>
            <Facebook/>
            <div className='text-white boton'>Facebook</div>
          </a>
        </div>
      </div>
      <div className='col-12 col-md-4 d-flex flex-column align-items-center '>
        <img className='logo' src={logo}/>
        <div className='text-white'>© 2023 Barrio Ciudadela — All rights reserved</div>
      </div>
      <div className='col-12 col-md-4 d-flex flex-column align-items-center'>
        <div className='text-white fw-bold'>PAYMENT METHODS</div>
        <div className='d-flex flex-column'>
          <img className='tarjetas' src={American}/>
          <img className='tarjetas' src={Mastercard}/>
          <img className='tarjetas' src={Naranja}/>
          <img className='tarjetas' src={Visa}/>
        </div>
      </div>
    </div>
  )
}

export default Footer