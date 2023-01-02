import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AboutUs from '../components/pages/about us/AboutUs'
import Home from '../components/pages/home/Home'
import Login from '../components/pages/login/Login'
import Orders from '../components/pages/orders/Orders'
import Register from '../components/pages/register/Register'

const Router = () => {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/aboutUs' element={<AboutUs/>}/>
            </Routes>
        </Layout>
    </BrowserRouter>
  )
}

export default Router