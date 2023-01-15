import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Spinner, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    let navigate = useNavigate();
    const [cart, setCart] = useState({})
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    let idkey=0
    
    useEffect(() => {
        handleGetCart();
    }, [])
    
    
    const handleGetCart =  async () => {
        try {
            let totalPrice = 0;
            const {data} = await axios('http://localhost:4000/api/cart');
            setCart(data.ownCart)
            for (const product of data?.ownCart?.products) {
                totalPrice = totalPrice+(product?.price*product?.quantity)
            }
            setCartTotalPrice(totalPrice)
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
            <Button variant='secondary' onClick={() => navigate('/orders')}>Back to menu</Button>
        </div>
        </div>

    )
}

export default Cart
