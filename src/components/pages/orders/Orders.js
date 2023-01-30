import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'
import axios from '../../../api/axios';
import Order from './Order';

const Orders = (props) => {
    const authProvider = useOutletContext();
    const [carts, setCarts] = useState([]);
    const [role, setRole] = useState('')
    const [productShow, setProductShow] = useState([])

    useEffect(() => {
        const {auth} = authProvider;
        console.log(auth)
        setRole(auth.role)
    }, [])

    const productsSelector = (cart) => {
        if (role === 'chef') {
            const chefProducts = cart.products.filter(product => product?.category?.name !== 'drink')
            return chefProducts
        }else if (role === 'bartender') {
            const bartenderProducts = cart.products.filter(product => product?.category?.name === 'drink')
            return bartenderProducts
        }else if(role === 'admin') return cart.products 
    }

    useEffect(() => {
        handleGetCart();
    }, [role])
    
    
    const handleGetCart =  async () => {
        try {
            const { data } = await axios('/cart/allCarts');
            let activeCarts=[];
            if (role === 'admin') {
                activeCarts = data.allCarts.filter(cart => cart.cartStatus === 'bought' || cart.cartStatus === 'preparing')
                setCarts(activeCarts)
            } else if(role === 'chef' || role === 'bartender') {
                activeCarts = data.allCarts.filter(cart => cart.cartStatus === 'preparing')
                setCarts(activeCarts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                carts?.length? (
                    carts?.map((cart) => {
                        let productsShow = productsSelector(cart)
                        if (productsShow.length!==0) {
                            return (
                                <>
                                    <div>Owner: {cart?.owner?.username}</div>
                                    <Order
                                    productsShow = {productsShow}
                                    stat = {cart.cartStatus}
                                    id = {cart._id}
                                    role= {role}
                                    />  
                                </>
                            )
                        }else return <></> 
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
