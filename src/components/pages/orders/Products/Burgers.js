import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import ProductModal from '../modal/ProductModal';
import './burgers.css'

const Burgers = ({category, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
    const [productModalShow, setProductModalShow] = useState(false)
    const [productToAdd, setProductToAdd] = useState({})
    const [products, setProducts] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [itemsToRemove, setItemsToRemove] = useState([])
    const [toppings, setToppings] = useState([])
    const [principalIngredientPricePrice, setPrincipalIngredientPrice] = useState()
    const [errorBurgers, setErrorBurgers] = useState(false)

    useEffect(() => {
        handleGetProducts();
        handleGetIngredients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleGetProducts = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/product/burger');
            const productFiltered = data.burgers?.filter((product) => product.category === category)
            setProducts(productFiltered);
            setErrorBurgers('');
        } catch (error) {
            setErrorBurgers(error.message||'Something was wrong')   
        }
    }

    const handleGetIngredients = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/ingredient');
            
            setIngredients(data.ingredients);
        } catch (error) {
            Alert('Ingredients not found')
        }
    }    

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
                {errorBurgers && <Alert variant='danger'>{errorBurgers}</Alert>}
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
                        setError={setError}
                        setMessageModalShow={setMessageModalShow}
                        setMessageToShow={setMessageToShow}
                    /> 
            </div>
        </div>
    )
}

export default Burgers
