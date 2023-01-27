import axios from '../../../api/axios';
import React, { useEffect, useState } from 'react'
import {Button, Spinner, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BuyModal from './cart modal/BuyModal';
import { Cart } from './Cart';

const Carts = () => {
    let navigate = useNavigate();
    const [carts, setCarts] = useState({})
    
    
    let idkey=0
    
    useEffect(() => {
        handleGetCart();
    }, [])

    const handleGetCart =  async () => {
        try {
            const { data } = await axios('/cart');
            console.log(data)
            const CartstoShow = data.ownCarts.filter(cart => cart.cartStatus === 'active' || cart.cartStatus === 'bought' || cart.cartStatus === 'preparing')
            setCarts(CartstoShow)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <div>
            {
            carts?.length? (
                carts?.map((cart) => {
                        return (
                            <>
                                <div>Cart_id: {cart?._id}</div>
                                <div>Status: {cart?.cartStatus}</div>
                                <Cart
                                cart = {cart}
                                />
                            </>
                        )
                }
                )
            ):
            (
                <Spinner className='spinnerLoading' animation="border" variant="success" />
            )
            
        }
        <Button variant='secondary' onClick={() => navigate('/menus')}>Back to menu</Button>
        </div>
    )
}

export default Carts
