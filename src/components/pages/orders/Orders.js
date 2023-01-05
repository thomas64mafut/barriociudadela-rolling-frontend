import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import ProductModal from './modal/ProductModal';
import './orders.css'

const Orders = () => {
    const [productModalShow, setProductModalShow] = useState(false)
    const [productToAdd, setProductToAdd] = useState({})
    const [products, setProducts] = useState([])


    useEffect(() => {
        handleGetProducts();
    }, [])
    


    const handleGetProducts = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/products');
            setProducts(data.products);
            console.log(data.products)
        } catch (error) {
            Alert('Productos no encontrados')   
        }

    }

    /* const products = [
        {
            _id: '1', 
            name: 'Ciudadela',
            ingredients: [
                'Homemade bun', 
                'Patty', 
                'Cheddar cheese', 
                'Bacon', 
                'Caramelized onion'
            ],
            price: 1200,
            image: 'https://img.freepik.com/foto-gratis/vista-frontal-hamburguesa-stand_141793-15542.jpg?w=740&t=st=1672705885~exp=1672706485~hmac=65b129f7c6864ce9986e6c049febd924fa6886b56effd81a59c2784a7dede656',
        },
        {
            _id: '2',
            name: 'Crispy',
            ingredients: [
                'Homemade bun', 
                'Patty', 
                'Cheddar cheese', 
                'Bacon', 
                'Caramelized onion'
            ],
            price: 1350,
            image: 'https://img.freepik.com/foto-gratis/vista-frontal-hamburguesa-stand_141793-15542.jpg?w=740&t=st=1672705885~exp=1672706485~hmac=65b129f7c6864ce9986e6c049febd924fa6886b56effd81a59c2784a7dede656',
        },
        {
            _id: '3',
            name: 'Bacon',
            ingredients: [
                'Homemade bun', 
                'Patty', 
                'Cheddar cheese', 
                'Bacon', 
                'Caramelized onion'
            ],
            price: 1250,
            image: 'https://img.freepik.com/foto-gratis/vista-frontal-hamburguesa-stand_141793-15542.jpg?w=740&t=st=1672705885~exp=1672706485~hmac=65b129f7c6864ce9986e6c049febd924fa6886b56effd81a59c2784a7dede656',
        },
        {
            _id: '4',
            name: 'Vieja confiable',
            ingredients: [
                'Homemade bun', 
                'Patty', 
                'Cheddar cheese', 
                'Bacon', 
                'Caramelized onion'
            ],
            price: 1100,
            image: 'https://img.freepik.com/foto-gratis/vista-frontal-hamburguesa-stand_141793-15542.jpg?w=740&t=st=1672705885~exp=1672706485~hmac=65b129f7c6864ce9986e6c049febd924fa6886b56effd81a59c2784a7dede656',
        }
    ]; */

    

    const openModal = (product) => {
        setProductModalShow(true); 
        setProductToAdd(product)
    }

  return (
    <div className='orders_container'>
        <div className='orders_header'>
            <h3>What do you want to eat today?</h3>
            <Button variant='primary'>Cart</Button>
        </div>
        <div className='cards_container'>
        {
            products.length ? (
                products?.map((product) => (
                    <Card key={product._id} className='card' style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                        <Card.Title ><b className='title'>{product.name}</b> <div className='price'>price:${product.price}</div></Card.Title>
                        <div>Ingredients: {product.ingredients.join(', ')}</div>
                        {<Button variant='secondary' onClick={()=>openModal(product)}>Options</Button>}
                        
                        </Card.Body>
                    </Card>
            ))
            ) : (
                <Spinner className='spinnerLoading' animation="border" variant="success" />      
                )
            }
        </div>
    
        <ProductModal 
            show={productModalShow} 
            setShow={setProductModalShow}
            product={productToAdd}
        />    
    </div>
    )
}

export default Orders