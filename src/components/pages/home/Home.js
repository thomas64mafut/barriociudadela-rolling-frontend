import React from 'react'
import './home.css'
import Carousel from './Carousel'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Carousel/>
      <div className='welcomeContainer'>
        <div className='text-white welcome'>WELCOME</div>
        <div className='text-white under-welcome'>To Barrio Ciudadela, our home in Tucuman.</div>
      </div>
      <div className='homeBack'>

      </div>
    </div>
  )
}

export default Home