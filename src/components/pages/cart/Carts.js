import './cart.css';
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';

import { Cart } from './Cart';
import BuyModal from './cart modal/BuyModal';

const Carts = () => {
    let navigate = useNavigate();
    const [carts, setCarts] = useState({})
    const [activeCart, setActiveCart] = useState({})
    const [buyModalShow, setBuyModalShow] = useState(false)

    useEffect(() => {
        handleGetCart();
    }, [])

    const handleGetCart = async () => {
        try {
            const { data } = await axios('/cart');
            const activeCart = data.ownCarts.find(cart => cart.cartStatus === 'active')
            const cartstoShow = data.ownCarts.filter(cart => cart.cartStatus === 'bought' || cart.cartStatus === 'cancelled' || cart.cartStatus === 'delivered' || cart.cartStatus === 'preparing')
            setActiveCart(activeCart)
            setCarts(cartstoShow.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCart = async () => {
        try {
            const { data } = await axios.patch('/cart/' + activeCart._id)
            navigate('/menus')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='main-container'>
            {
                activeCart?._id ? (
                    <div>
                        <h3>Your active Cart</h3>
                        <div className='p-3 active-cart-container'>
                            <div className='overflow-table-container'>
                                <div className='ps-2'>
                                    <div>Cart_id: {activeCart._id}</div>
                                    <div className='mb-3'>Status: {activeCart.cartStatus}</div>
                                </div>
                                <Cart
                                    cart={activeCart}
                                />
                            </div>
                        </div>
                        <div className='w-100'>
                            {
                                activeCart.cartStatus === 'active' &&
                                <div className='w-100 mb-3 button-buy-cart-container flex-column flex-sm-row'>
                                    <Button
                                        variant='danger'
                                        onClick={handleDeleteCart}
                                    >
                                        Delete Cart
                                    </Button>
                                    <Button
                                        variant='success'
                                        onClick={() => setBuyModalShow(true)}
                                    >
                                        Buy now
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                ) : (
                    <div className='w-100 text-center my-5 active-cart-container'>
                        <h2>You don't have active Cart</h2>
                    </div>
                )
            }
            <Accordion defaultActiveKey="0" >
                <Accordion.Header className='orders-title'>your last carts</Accordion.Header>
                <Accordion.Body>
                    {
                        carts?.length ? (
                            carts?.map((cart, index) => {
                                return (
                                    <div className={'order-container ' + cart?.cartStatus} key={index}>
                                        <div className='w-100 py-2'>
                                            <div className='w-100 overflow-table-container'>
                                                <div className='ps-3'>
                                                    <div>Cart id: {cart?._id}</div>
                                                    <div className='mb-2'>Status: {cart?.cartStatus}</div>
                                                    {
                                                        cart?.cartStatus === 'bought' &&
                                                        <div>
                                                            Bought on {
                                                                new Date(cart?.boughtAt).toLocaleDateString('en-us', {
                                                                    weekday: "long",
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric"
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                                <Cart
                                                    cart={cart}
                                                    className='w-100'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        ) :
                            (
                                <Spinner className='spinnerLoading' animation="border" variant="success" />
                            )
                    }
                </Accordion.Body>
            </Accordion>

            <div className='w-100 text-center mb-3 button-buy-cart-container'>
                <Button
                    variant='secondary'
                    onClick={() => navigate('/menus')}
                >
                    Back to menu
                </Button>
            </div>

            <BuyModal
                show={buyModalShow}
                setShow={setBuyModalShow}
                cart={activeCart}
            />
        </div>
    )
}

export default Carts
