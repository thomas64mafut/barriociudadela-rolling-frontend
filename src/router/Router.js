import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../components/pages/home/Home'
import Login from '../components/pages/login/Login'
import Orders from '../components/pages/orders/Orders'
import Register from '../components/pages/register/Register'
import Admin from '../components/pages/admin/Admin';
import RequireAuth from './../components/requireAuthorization/RequireAuth';
import Unauthorized from '../components/pages/Unauthorized'
import Missing from '../components/pages/Missing'

/*const ROLES = {
  'User': '63b750d9df706678b4bf105c',
  'Admin': '63b36e00cf1222d30f57dcff',
};*/

const Router = (props) => {
  return (
    <BrowserRouter >
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          <Route element={<RequireAuth { ...props} />}>
            <Route path='/orders' element={<Orders />} />
          </Route>
          <Route element={<RequireAuth { ...props } />}>
            <Route path='/admin' element={<Admin />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router