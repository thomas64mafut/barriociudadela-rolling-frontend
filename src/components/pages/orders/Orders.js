import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'
import axios from '../../../api/axios';
import Order from './Order';

const Orders = (props) => {
    const authProvider = useOutletContext();
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const {auth} = authProvider;
        console.log(auth)
    }, [])
    
    useEffect(() => {
        handleGetCart();
    }, [])
    
    
    const handleGetCart =  async () => {
        try {
            const { data } = await axios('/cart/allCarts');
            const activeCarts = data.allCarts.filter(cart => cart.cartStatus === 'bought' || cart.cartStatus === 'preparing')
            setCarts(activeCarts)
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
                                <div>Owner: {cart?.owner?.username}</div>
                                <Order
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
    </div>
  )
}

export default Orders
