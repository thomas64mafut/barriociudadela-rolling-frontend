import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Card, Row, Col, Spinner } from 'react-bootstrap'
import ProductModal from '../modal/ProductModal';
import './burgers.css'

const Burgers = ({ category, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
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

    const handleGetProducts = async () => {
        try {
            const { data } = await axios('http://localhost:4000/api/product/burger');
            const productFiltered = data.burgers?.filter((product) => product.category === category)
            setProducts(productFiltered);
            setErrorBurgers('');
        } catch (error) {
            setErrorBurgers(error.message || 'Something was wrong')
        }
    }

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios('http://localhost:4000/api/ingredient');
            setIngredients(data.ingredients);
        } catch (error) {
            Alert('Ingredients not found')
        }
    }

    const openModal = (product, ingredients) => {
        let toppingsToShow = ingredients.filter(i => ingredients.category !== 'Burgers&Sandwich');
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
            <h2 className='titleSection'>{category}</h2>
            {errorBurgers && <Alert variant='danger'>{errorBurgers}</Alert>}

            <Row md='3' xl='4' className='p-3'>
                {
                    products.length ? (
                        products?.map((product) => {
                            return (
                                <Col className='mb-5'>
                                    <Card className='h-100 w-100 card burger-card'>
                                        <div className='card-image-container' style={{ 
                                            backgroundImage: `url(${product.image})`
                                            }}
                                        ></div>
                                        <Card.Header>
                                            <Card.Title>
                                                <h5 className='product-card-title'>
                                                    {product.name.toString().toLowerCase()}
                                                </h5>
                                            </Card.Title>
                                            <b className="product-price">
                                                $ {product.price}
                                            </b>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className='ingredients-list'>
                                                <span>
                                                    Ingredients: <br />
                                                </span>
                                                {
                                                    product.ingredients.map((ingredient, index) => (
                                                        index === (product.ingredients.length - 1)
                                                            ? <span>{ingredient.name + '.'}</span>
                                                            : <span>{ingredient.name + ', '}</span>

                                                    ))
                                                }
                                            </div>
                                        </Card.Body>
                                        <button class="card-button" onClick={() => openModal(product, ingredients)}>Options</button>
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                        <Spinner className='spinnerLoading' animation="border" variant="success" />
                    )
                }
            </Row>

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
        </div >
    )
}

export default Burgers
