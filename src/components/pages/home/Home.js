import React from 'react'
import './home.css'
import Carousel from './Carousel'
import Hambuno from '../../../assets/img/burguerDoble.jpeg'
import Hambdos from '../../../assets/img/burguerLechuga.jpeg'
import Hambtres from '../../../assets/img/burguerQueso.jpeg'
import Hambcuatro from '../../../assets/img/burguerXxl.jpeg'
import Hambcinco from '../../../assets/img/burguerChocloPalta.jpeg'
import Hambseis from '../../../assets/img/burguerQuesoDos.jpeg'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Carousel/>
      <div className='welcomeContainer'>
        <div className='text-white welcome'>WELCOME</div>
        <div className='text-white under-welcome'>To Barrio Ciudadela, our home in Tucuman.</div>
      </div>
      <div className='homeBack'>
        <div className='d-flex flex-column align-items-center'>
          <h2 className='mt-4 mb-3'>BARRIO CIUDADELA</h2>
          <p className='texto-home'>Welcome to Barrio Ciudadela, where we offer a one of a kind fine dining experience with the unique taste of San Miguel de Tucuman. Whether you are here for lunch or dinner, celebrating a special occasion, our menu offers something for everyone. You will be amazed by the taste and quality of our burguers, wich are made with the best patty meat of the region, the tastiest cheese, the freshest vegetables, and of course, with the amout of dedication and love required.</p> 
        </div>
        <div className='ps-5 pe-5 pb-4 '>
          <div className='row mb-3 imgContainer'>
            <img className='col-12 col-md-4 img-burguer' src={Hambuno}/>
            <img className='col-12 col-md-4 img-burguer' src={Hambdos}/>
            <img className='col-12 col-md-4 img-burguer' src={Hambtres}/>
          </div>
          <div className='row imgContainer'>
            <img className='col-12 col-md-4 img-burguer' src={Hambcuatro}/>
            <img className='col-12 col-md-4 img-burguer' src={Hambcinco}/>
            <img className='col-12 col-md-4 img-burguer' src={Hambseis}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home