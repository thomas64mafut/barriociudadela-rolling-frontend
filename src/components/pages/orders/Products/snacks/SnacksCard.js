import axios from 'axios';
import './snacks.css'
import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import Counter from '../../../../counter/Counter';

const SnacksCard = ({ snack, setError, setMessageModalShow, setMessageToShow }) => {
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
                    preferences.size = 'large'
                    preferences.price = snack.price * 2
                    target.checked = false;
                } else {
                    preferences.size = 'medium'
                    preferences.price = snack.price
                }
            }
        }
        preferences.name = snack.name;
        preferences.quantity = count;
        preferences.removed = removed;
        preferences.toppings = toppingsToAdd;
        setCount(1)
        e.target[0].checked = true;
        setCart(preferences)
    }
    return (
        <Card className='snack-card'>
            <Card.Img variant="top" src={snack.image} />
            <Card.Header>
                <Card.Title >
                    <b className='title'>
                        {snack.name}
                    </b>
                </Card.Title>
                <div className='price'>
                    price:${snack.price}
                </div>
            </Card.Header>
            <Card.Body>
                <div className="mb-3 d-flex flex-column">
                    <div>Size: </div>
                    <Form onSubmit={addToCart}>
                        <Form.Check
                            inline
                            label={`medium (2 people) ($${snack.price})`}
                            name="size"
                            type='radio'
                            defaultChecked
                            id='1'
                        />
                        <Form.Check
                            inline
                            label={`large(4 people) ($${snack.price * 2})`}
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
            <Card.Footer className='text-center'>
                <button className='icon-btn add-btn' type='submit'>
                    <div className="add-icon"></div>
                    <div className="btn-txt">Add to Cart</div>
                </button>
            </Card.Footer>
        </Card>
    )
}

export default SnacksCard