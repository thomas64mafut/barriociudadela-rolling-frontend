import axios from '../../../api/axios';
import React, { useEffect, useState } from 'react'
import {Button, Spinner, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BuyModal from './cart modal/BuyModal';

const Cart = () => {
    let navigate = useNavigate();
    const [cart, setCart] = useState({})
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    const [buyModalShow, setBuyModalShow] = useState(false)
    let idkey=0
    
    useEffect(() => {
        handleGetCart();
    }, [])
    
    
    const handleGetCart =  async () => {
        try {
            let totalPrice = 0;
            const { data } = await axios('/cart');
            console.log(data.ownCart._id)
            setCart(data.ownCart)
            for (const product of data?.ownCart?.products) {
                totalPrice = totalPrice+(product?.price*product?.quantity)
            }
            setCartTotalPrice(totalPrice)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleDeleteCart = async() => {
        try {
            const { data } = await axios.patch('/cart/'+cart._id)
            navigate('/menus')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
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
                    cart?.products?.length ? (
                        cart?.products?.map((product) => {
                            idkey= idkey+1;
                            return (
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
                        ) : (
                            <Spinner className='spinnerLoading' animation="border" variant="success" />      
                            )
                        }
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td>{cartTotalPrice}</td>
            
            </tbody>
        </Table>
        <div>
            {
                cart._id? (
                    <div>
                        <Button variant='secondary' onClick={() => navigate('/orders')}>Back to menu</Button>
                        <Button variant='secondary' onClick={handleDeleteCart}>Delete Cart</Button>
                        <Button variant='secondary' onClick={()=>setBuyModalShow(true)}>Buy now</Button>
                    </div>
                ) : (
                    <Button variant='secondary' onClick={() => navigate('/menus')}>Back to menu</Button>
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

export default Cart
