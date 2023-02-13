import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const Order = ({ productsShow, cartStatus, role }) => {
    const [price, setPrice] = useState([])
    let totalPrice = 0;

    useEffect(() => {
        handleSetTotalPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSetTotalPrice = () => {
        for (const product of productsShow) {
            totalPrice = totalPrice + (product?.price * product?.quantity)
        }
        setPrice(totalPrice)
    }

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
                                        {
                                            product.isVegan &&
                                            <tr>
                                                Vegan option
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td className='total-price'>
                                    total
                                </td>
                                <td className='total-price'> $ {price}</td>
                            </tr>) : (
                            <>
                            </>)
                    }


                </tbody>
            </Table>

        </div>
    )
}

export default Order
