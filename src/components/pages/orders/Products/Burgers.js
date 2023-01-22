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
                        products?.map((product, index) => {
                            return (
                                <Col>
                                    <Card className='h-100 w-100 card burger-card'>
                                        <Card.Img
                                            variant="top"
                                            src={product.image}
                                            alt={'image of card' + product.name + index}
                                        />
                                        <Card.Header>
                                            <Card.Title>
                                                {product.name.toString().toLowerCase()}
                                            </Card.Title>
                                            <b className="text-body">
                                                Price: $ {product.price}
                                            </b>
                                        </Card.Header>
                                        <Card.Body>
                                            <div>
                                                <span>
                                                    Ingredients:
                                                </span>
                                                {
                                                    product.ingredients.map((ingredient) => (
                                                        <ul
                                                            className='ingredients-list row'
                                                        >
                                                            <li>{ingredient.name}</li>
                                                        </ul>
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
