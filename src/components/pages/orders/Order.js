import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import axios from '../../../api/axios';
import './order.css'

const Order = ({ productsShow, cartStatus, setCartStatus, id, role }) => {
    const [price, setPrice] = useState([])
    let totalPrice

    useEffect(() => {
        totalPrice = 0;
        for (const product of productsShow) {
            totalPrice = totalPrice + (product?.price * product?.quantity)
        }
        setPrice(totalPrice)
    }, [])

   

    return (
        <div className={cartStatus}>
            <Table bordered className='text-white order-container'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>product name</th>
                        <th>preferences</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsShow?.map((product, index) => {
                            return (
                                <tr key={index} className=''>
                                    <td>{index}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        size: {product.size}
                                        {
                                            product.removed.length > 0 &&
                                            <tr>to remove:
                                                {
                                                    product.removed.map((i) => {
                                                        return `-${i.name}`
                                                    })
                                                }
                                            </tr>
                                        }
                                        {
                                            product.toppings.length > 0 &&
                                            <tr>to topping:
                                                {
                                                    product.toppings.map((i) => {
                                                        return `-${i.name}`
                                                    })
                                                }
                                            </tr>
                                        }
                                        {
                                            product.preferences &&
                                            <tr>preferences:
                                                {
                                                    product.preferences
                                                }
                                            </tr>
                                        }
                                    </td>
                                    <td>{product.quantity}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        role === 'admin' ? (
                            <>
                                <td></td>
                                <td></td>
                                <td className='total-price'>
                                    total
                                </td>
                                <td className='total-price'> $ {price}</td>
                            </>) : (
                            <>
                            </>)
                    }


                </tbody>
            </Table>

        </div>
    )
}

export default Order