import axios from '../../../../api/axios';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { Alert, Card, Row, Col } from 'react-bootstrap';
import ProductModal from '../modal/ProductModal';
import './burgers.css';

import Leaf from '../../../../assets/icons/Leaf';
import Loading from '../../../loading/Loading';

const Burgers = (props) => {
    const {
        category,
        defaultItem,
        item2,
        setError,
        setMessageModalShow,
        setMessageToShow
    } = props;

    const [isLoading, setIsLoading] = useState(false)
    const [productModalShow, setProductModalShow] = useState(false)
    const [productToAdd, setProductToAdd] = useState({})
    const [products, setProducts] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [itemsToRemove, setItemsToRemove] = useState([])
    const [toppings, setToppings] = useState([])
    const [principalIngredientPricePrice, setPrincipalIngredientPrice] = useState()
    const { darkMode } = useContext(ThemeContext);
    const [errorBurgers, setErrorBurgers] = useState('')

    useEffect(() => {
        handleGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetData = async () => {
        setIsLoading(true);
        await handleGetProducts();
        await handleGetIngredients();
        setIsLoading(false);
    }

    const handleGetProducts = async () => {
        try {
            const { data } = await axios(`/product/${category}`);
            setProducts(data?.products);
        } catch (error) {
            setErrorBurgers(error.message || 'Something was wrong')
        }
    }

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios('/ingredient');
            setAllIngredients(data.ingredients);
        } catch (error) {
            setErrorBurgers(error.message || 'Something was wrong')
        }
    }

    const openModal = (product, allIngredients) => {
        let toppingsToShow = [];
        allIngredients.forEach(ingredient => (
            ingredient.category.forEach((categoryToFilter) => {
                if (categoryToFilter === category)
                    toppingsToShow.push(ingredient);
            })
        ));
        const filteredIngredients = toppingsToShow.filter(item1 => {
            const item1Str = JSON.stringify(item1);
            return !product?.ingredients.find(item2 => item1Str === JSON.stringify(item2))
        });
        setToppings(filteredIngredients)
        setItemsToRemove(product?.ingredients)
        setProductToAdd(product)
        setPrincipalIngredientPrice(product.ingredients[1].price)
        setProductModalShow(true);
    }

    return (
        <div>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <div>
                            {
                              errorBurgers && 
                              <Alert variant='danger'>{errorBurgers}</Alert>
                             }
            <Row md='3' xl='4' className='p-3 burguer-section'>
                {
                    products.length ? (
                        products?.map((product, index) => {
                            return (
                                <Col className='mb-5' key={index}>
                                    <Card className={ darkMode ? "h-100 w-100 card-dark burger-card" : "h-100 w-100 card burger-card"}>
                                        <div className='card-image-container' style={{
                                            backgroundImage: `url(${product.image})`
                                        }}
                                        ></div>
                                        <Card.Header className={ darkMode ? "card-header-dark" : "card-header"}>
                                            <Card.Title>
                                                <h5 className='product-card-title'>
                                                    {product.name.toString().toLowerCase()}
                                                </h5>
                                            </Card.Title>
                                            <b className="product-price">
                                                $ {product.price} { product?.isVegan && <Leaf />}
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
                                                            ? <span key={index}>{ingredient.name + '.'}</span>
                                                            : <span key={index}>{ingredient.name + ', '}</span>

                                                                    ))
                                                                }
                                                            </div>
                                                        </Card.Body>
                                                        <button className="card-button" onClick={() => openModal(product, allIngredients)}>Options</button>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    ) : (
                                        <h4 className='w-100 text-center'>there are no products in this category</h4>
                                    )
                                }
                            </Row>
                        </div>
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
        </div >
    )
}

export default Burgers
