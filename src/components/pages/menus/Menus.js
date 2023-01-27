import './menus.css'
import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios';
import Burgers from './Products/Burgers';
import Drinks from './Products/drink/Drinks';
import Snacks from './Products/snacks/Snacks';
import MessageModal from './modal/MessageModal';
import { useNavigate } from 'react-router-dom';
import Cart from '../../../assets/icons/dark/Cart';

const Menus = () => {
    let navigate = useNavigate();
    const [error, setError] = useState('')
    const [messageModalShow, setMessageModalShow] = useState(false)
    const [messageToShow, setMessageToShow] = useState('')
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    useEffect(() => {
        handleGetCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (messageModalShow) {
            setTimeout(() => {
                setError('')
                setMessageToShow('')
                setMessageModalShow(false)
                handleGetCart();
            }, 1000);
        }
    }, [messageModalShow])

    const handleGetCart = async () => {
        try {
            const { data } = await axios('/cart');
            let totalPrice = 0;
            const activeCart = data?.ownCarts?.find(cart => cart.cartStatus === 'active')
            for (const product of activeCart.products) {
                totalPrice = totalPrice + (product?.price * product?.quantity)
            }
            setCartTotalPrice(totalPrice)
        } catch (error) {
            console.log(error)
        }
    }

    const showCart = () => {
        navigate('/myCarts')
    }

    return (
        <div className='orders_container'>
            <div className='orders_header'>
                <h2>what do you want to eat today?</h2>
                <button className="btn-cart" onClick={showCart}>
                    <div className="icon-cart ">
                        <Cart />
                    </div>
                    <span>$ {cartTotalPrice}</span>
                </button>
            </div>
            <Burgers
                category={'Burgers'}
                defaultItem={"1 Patty"}
                item2={"2 Patties"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <Burgers
                category={'Sandwichs'}
                defaultItem={"1 steak"}
                item2={"Extra meet"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <Snacks
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <Drinks
                category={"Drink"}
                defaultItem={"1 lt"}
                item2={"500 cc"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <Drinks
                category={"Beer"}
                defaultItem={"Pinta"}
                item2={"1/2 Pinta"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <MessageModal
                show={messageModalShow}
                setShow={setMessageModalShow}
                error={error}
                messageToShow={messageToShow}
            />
        </div>
    )
}

export default Menus 