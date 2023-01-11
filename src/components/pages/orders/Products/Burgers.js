import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import ProductModal from '../modal/ProductModal';
import './burgers.css'

const Burgers = ({category, defaultItem, item2 }) => {
    const [productModalShow, setProductModalShow] = useState(false)
    const [productToAdd, setProductToAdd] = useState({})
    const [products, setProducts] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [itemsToRemove, setItemsToRemove] = useState([])
    const [toppings, setToppings] = useState([])
    const [principalIngredientPricePrice, setPrincipalIngredientPrice] = useState()


    useEffect(() => {
        handleGetProducts();
        handleGetIngredients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    


    const handleGetProducts = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/products/burger');
            const productFiltered = data.burgers?.filter((product) => product.category === category)
            setProducts(productFiltered);
        } catch (error) {
            Alert('Products not found')   
        }
    }

    const handleGetIngredients = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/ingredients');
            setIngredients(data.ingredients);
        } catch (error) {
            Alert('Ingredients not found')
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

    

    const openModal = (product, ingredients) => {
        let toppingsToShow= ingredients.filter(i => ingredients.category !== 'Burgers&Sandwich');
        setItemsToRemove(product?.ingredients?.filter(i => i._id !== product.ingredients[0]._id && i._id !== product.ingredients[1]._id))
        for (const productIngredient of product.ingredients) {
            toppingsToShow = toppingsToShow.filter(item => item._id !== productIngredient._id)
        }
        setToppings(toppingsToShow)
        setProductToAdd(product)
        setPrincipalIngredientPrice(product.ingredients[1].price)
        setProductModalShow(true); 
    }

    return (
            <div>
                <h4 className='tittleSection'>{category}</h4>
                <div className='cards_container'>
                {
                    products.length ? (
                        products?.map((product) => {
                            return (
                            <Card key={product._id} className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                <Card.Title ><b className='title'>{product.name}</b> <div className='price'>price:${product.price}</div></Card.Title>
                                <div>Ingredients: {product.ingredients.map((ingredient) => (<div className='ingredients_list' key={ingredient._id}>-{ingredient.name} </div>))}</div>
                                {<Button variant='secondary' onClick={()=>openModal(product, ingredients)}>Options</Button>}
                                
                                </Card.Body>
                            </Card>
                        )
                    })
                    ) : (
                        <Spinner className='spinnerLoading' animation="border" variant="success" />      
                        )
                    }
                    <ProductModal 
                        show={productModalShow} 
                        setShow={setProductModalShow}
                        product={productToAdd}
                        itemsToRemove={itemsToRemove}
                        toppings={toppings}
                        principalIngredientPricePrice={principalIngredientPricePrice}
                        defaultItem={defaultItem}
                        item2={item2}
                    /> 
            </div>
        </div>
    )
}

export default Burgers
