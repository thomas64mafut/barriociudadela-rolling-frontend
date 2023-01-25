import './drinks.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'

import Counter from '../../../../counter/Counter'

const DrinksCard = ({ drink, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
    const [count, setCount] = useState(1);
    const [cart, setCart] = useState({})

    useEffect(() => {
        if (cart.name) {
            postCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const postCart = async () => {
        try {
            const { data } = await axios.post('http://localhost:4000/api/cart', cart)
            setMessageToShow(data.message)
            setMessageModalShow(true)
        } catch (error) {
            setError(error.response.data.message)
            setMessageModalShow(true)
        }
    }


    const addToCart = (e) => {
        e.preventDefault();
        const preferences = {};
        const removed = [];
        const toppingsToAdd = [];
        for (const target of e.target) {
            if (target.type === 'radio') {
                if (target.id === '2' && target.checked === true) {
                    preferences.size = item2
                    preferences.price = drink.price / 2
                    target.checked = false;
                } else {
                    preferences.size = defaultItem
                    preferences.price = drink.price
                }
            }
        }
        preferences.name = drink.name;
        preferences.quantity = count;
        preferences.removed = removed;
        preferences.toppings = toppingsToAdd;
        setCount(1)
        e.target[0].checked = true;
        setCart(preferences)
    }
    return (
        <div>
            <Card className='drink-card'>
                <div className='card-image-container' style={{
                    backgroundImage: `url(${drink.image})`
                }}
                ></div>
                <Card.Header>
                    <Card.Title >
                        <h5 className='product-card-title'>
                            {drink.name.toString().toLowerCase()}
                        </h5>
                        <b className='product-price'>
                            ${drink.price}
                        </b>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="size-container">
                        <div>Size: </div>
                        <Form onSubmit={addToCart}>
                            <Form.Check
                                inline
                                label={`${defaultItem} ($${drink.price})`}
                                name="size"
                                type='radio'
                                defaultChecked
                                id='1'
                            />
                            <Form.Check
                                inline
                                label={`${item2} ($${drink.price / 2})`}
                                name="size"
                                type='radio'
                                id='2'
                            />
                            <div className='addCartButton'>
                                <Counter
                                    count={count}
                                    setCount={setCount}
                                />
                            </div>
                        </Form>
                    </div>
                </Card.Body>
                <Card.Footer className='text-center button-footer'>
                    <button className='icon-btn drinks-icon-btn add-btn' type='submit'>
                        <div className="add-icon"></div>
                        <div className="btn-txt">Add to Cart</div>
                    </button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default DrinksCard