import React, { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import BuyModal from './cart modal/BuyModal';
import './cart.css'


export const Cart = ({cart}) => {
    let navigate = useNavigate();
    const [buyModalShow, setBuyModalShow] = useState(false)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    let idkey=0;
    let totalPrice=0;

    useEffect(() => {
        console.log('cart en cart'+ cart)
        totalPrice=0;
        for (const product of cart?.products) {
            totalPrice = totalPrice+(product?.price*product?.quantity)
        }
        setCartTotalPrice(totalPrice)
    }, [])
    
    const handleDeleteCart = async() => {
        try {
            const { data } = await axios.patch('/cart/'+cart._id)
            navigate('/menus')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={cart.cartStatus}>
        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Preferences</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {    
                                        cart?.products?.map(product => {
                                            idkey= idkey+1;
                                            return(
                                                <tr key={idkey}>
                                                    <td>{idkey}</td>
                                                    <td>{product.name}</td>
                                                    <td>size: {product.size} 
                                                        {product.removed.length > 0 && <tr>to remove: {product.removed.map((i) => {return `-${i.name}`})}</tr>}
                                                        {product.toppings.length > 0 && <tr>to topping: {product.toppings.map((i) => {return `-${i.name}`})}</tr>}
                                                    </td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.quantity*product.price}</td>
                                                </tr>
                                                )
                                            })
                                    }
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td> $ {cartTotalPrice}</td>
                                </tbody>
                            </Table>
                            <div>
                                {
                                    cart.cartStatus==='active'? (
                                        <div>
                                            <Button variant='secondary' onClick={handleDeleteCart}>Delete Cart</Button>
                                            <Button variant='secondary' onClick={()=>setBuyModalShow(true)}>Buy now</Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                    
                                }
                            </div>
                            <BuyModal
                                show={buyModalShow}
                                setShow={setBuyModalShow}
                                cart={cart}
                            />
    </div>
  )
}
