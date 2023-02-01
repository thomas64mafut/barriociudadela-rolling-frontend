import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Home from '../components/pages/home/Home'
import Login from '../components/pages/login/Login'
import Register from '../components/pages/register/Register'
import Admin from '../components/pages/admin/Admin';
import Missing from '../components/pages/404/Missing';
import RequireAuth from './../components/requireAuthorization/RequireAuth';
import Unauthorized from '../components/pages/unauthorized/Unauthorized'
import Carts from '../components/pages/cart/Carts'
import UserProfile from '../components/pages/userProfile/UserProfile'
import Menus from '../components/pages/menus/Menus';
import Orders from '../components/pages/orders/Orders'

const Router = (props) => {
    return (
        <BrowserRouter >
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='unauthorized' element={<Unauthorized />} />

                    <Route element={<RequireAuth {...props} />}>
                        <Route path='/profile' element={<UserProfile />} />
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/menus' element={<Menus />} />
                        <Route path='/myCarts' element={<Carts />} />
                        <Route path='/orders' element={<Orders />} />
                    </Route>

                    <Route path="*" element={<Missing />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default Router
