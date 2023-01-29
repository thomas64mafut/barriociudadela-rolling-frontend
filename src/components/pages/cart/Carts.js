import axios from '../../../api/axios';
import React, { useEffect, useState } from 'react'
import {Accordion, Button, Spinner, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BuyModal from './cart modal/BuyModal';
import { Cart } from './Cart';
import './cart.css'

const Carts = () => {
    let navigate = useNavigate();
    const [carts, setCarts] = useState({})
    const [activeCart, setActiveCart] = useState({})   
    
    let idkey=0
    
    useEffect(() => {
        handleGetCart();
    }, [])

    const handleGetCart =  async () => {
        try {
            const { data } = await axios('/cart');
            const activeCart = data.ownCarts.find(cart => cart.cartStatus === 'active')
            console.log(activeCart)
            const cartstoShow = data.ownCarts.filter(cart => cart.cartStatus === 'bought' || cart.cartStatus === 'cancelled' || cart.cartStatus === 'delivered' || cart.cartStatus === 'preparing' )
            setActiveCart(activeCart)
            setCarts(cartstoShow.reverse())
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <div>
            {
                activeCart?._id? (
                    <>
                                    <h3>Your active Cart</h3>
                                    <div>Cart_id: {activeCart._id}</div>
                                    <div>Status: {activeCart.cartStatus}</div>
                                    <Cart
                                    cart = {activeCart}
                                    />
                    
                    </>
                ):(
                    <h4>You don't have active Cart</h4>
                )
            }
            <Accordion defaultActiveKey="0">
                    <Accordion.Header>Your last Carts</Accordion.Header>
                    <Accordion.Body>
                        {
                            carts?.length? (
                                carts?.map((cart) => {
                                        return (
                                            <>
                                                <div>Cart_id: {cart?._id}</div>
                                                <div>Status: {cart?.cartStatus}</div>
                                                {
                                                    cart?.cartStatus === 'bought'? (<div>Bought on {new Date(cart?.boughtAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</div>):(<></>)
                                                }
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
                    </Accordion.Body>
            </Accordion>
          
            
        <Button variant='secondary' onClick={() => navigate('/menus')}>Back to menu</Button>
        </div>
    )
}

export default Carts
