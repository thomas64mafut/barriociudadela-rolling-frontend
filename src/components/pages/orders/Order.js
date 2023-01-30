import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import axios from '../../../api/axios';
import './order.css'

const Order = ({productsShow ,stat, id, role}) => {
    let idkey=0
    const [status, setStatus] = useState(stat)
    const [productstoShow, setProductstoShow] = useState([])



    const handleCancelCart = async(id) => {
        try {
            const { data } = await axios.patch('/cart/cancel/'+id)
            setStatus('cancelled')
        } catch (error) {
            console.log(error)
        } 
    }

    const handlePreparingCart = async(id) => {
        try {
            const { data } = await axios.patch('/cart/preparing/'+id)
            setStatus('preparing')
        } catch (error) {
            console.log(error)
        } 
    }
 
    const handledeliveredCart = async(id) => {
        try {
            const { data } = await axios.patch('/cart/delivered/'+id)
            setStatus('delivered')
        } catch (error) {
            console.log(error)
        } 
    }

    const buttonsForStatus = () => {
        if (status === 'bought') {
            return (
                <div>
                    <Button variant='secondary' onClick={()=>handlePreparingCart(id)}>Preparing</Button>
                    <Button variant='secondary'  onClick={()=>handleCancelCart(id)}>Cancel</Button>
                </div>)
        }
        if (status === 'preparing') {
            if (role=== 'admin' ) {
                return(
                    <div>
                        <Button variant='secondary' onClick={()=>handledeliveredCart(id)}>Delivered</Button>
                        <Button variant='secondary'  onClick={()=>handleCancelCart(id)}>Cancel</Button>
                    </div>
                )
            } /* else {
                return(
                    <div>
                        <Button variant='secondary' >to Deliver</Button>
                        <Button variant='secondary' >Cancel</Button>
                    </div>
                )
            } */
        }
        if (status === 'cancelled') {
            return(
                <p>This order was cancelled by the administrator</p>
            )
        }
        if (status === 'delivered') {
            <p>This order was delivered</p>
            
        }
    }
    
    return (
        <div className={status}>
            <div>Status: {status}</div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Preferences</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {     
                            productsShow?.map(product => {
                                idkey= idkey+1;
                                return(
                                    <tr key={idkey}>
                                        <td>{idkey}</td>
                                        <td>{product.name}</td>
                                        <td>size: {product.size} 
                                            {product.removed.length > 0 && <tr>to remove: {product.removed.map((i) => {return `-${i.name}`})}</tr>}
                                            {product.toppings.length > 0 && <tr>to topping: {product.toppings.map((i) => {return `-${i.name}`})}</tr>}
                                            {product.preferences && <tr>preferences: {product.preferences}</tr>}
                                        </td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                    
                                    )
                                })
                            }
                    </tbody>
                </Table>
                    {
                                    buttonsForStatus()
                    }
    </div>
  )
}

export default Order