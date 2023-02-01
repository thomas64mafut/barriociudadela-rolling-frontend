import './footer.css'
import React from 'react'

import logo from '../../assets/img/logo-red.png'
import Facebook from '../../assets/icons/Facebook'
import Twitter from '../../assets/icons/Twitter'
import Instagram from '../../assets/icons/Instagram'
import American from '../../assets/img/american-express.webp'
import Mastercard from '../../assets/img/mastercard.webp'
import Naranja from '../../assets/img/naranja-x.webp'
import Visa from '../../assets/img/visa.webp'

const Footer = () => {
    return (
        <div className='bg-dark d-flex justify-content-center align-items-center row homeFooter g-0 w-100'>
            <div className='text-white col-12 col-md-4 d-flex flex-column align-items-center my-4'>
                <div className='fw-bold' id='followUs'>FOLLOW US</div>
                <div>
                    <a className='d-flex socialAs' href='https://instagram.com'>
                        <Instagram />
                        Instagram
                    </a>
                </div>
                <div>
                    <a className='d-flex socialAs me-3' href='https://twitter.com/'>
                        <Twitter />
                        <div className='text-white boton'>Twitter</div>
                    </a>
                </div>
                <div>
                    <a className='d-flex socialAs me-2' href='https://www.facebook.com/'>
                        <Facebook />
                        <div className='text-white boton'>Facebook</div>
                    </a>
                </div>
            </div>
            <div className='col-12 col-md-4 d-flex flex-column align-items-center p-3'>
                <img className='logo mb-3' src={logo} alt='page logo'/>
                <div className='text-white'>© 2023 Barrio Ciudadela — All rights reserved</div>
            </div>
            <div className='col-12 col-md-4 d-flex flex-column align-items-center my-4'>
                <div className='text-white fw-bold'>PAYMENT METHODS</div>
                <div className='d-flex flex-column'>
                    <img className='tarjetas' src={American} alt='card payment'/>
                    <img className='tarjetas' src={Mastercard} alt='card payment'/>
                    <img className='tarjetas' src={Naranja} alt='card payment'/>
                    <img className='tarjetas' src={Visa} alt='card payment'/>
                </div>
            </div>
        </div>
    )
}

export default Footer
