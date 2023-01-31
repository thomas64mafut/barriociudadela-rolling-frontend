import axios from '../../../../api/axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Form, Modal, Row, Col } from 'react-bootstrap'
import Counter from '../../../counter/Counter';
import './productmodal.css'

const ProductModal = ({
    show,
    setShow,
    product,
    itemsToRemove,
    toppings,
    principalIngredientPricePrice,
    defaultItem,
    item2,
    setError,
    setMessageModalShow,
    setMessageToShow
}) => {
    const [cart, setCart] = useState({});
    const [count, setCount] = useState(1);
    const [addition, setAddition] = useState(0);

    useEffect(() => {
        if (cart.name) {
            postCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const postCart = async () => {
        try {
            const { data } = await axios.post('/cart', cart);
            setMessageToShow(data.message)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const addToCart = (e) => {
        e.preventDefault();
        const preferences = {};
        const removed = [];
        const toppingsToAdd = [];
        for (const target of e.target) {
            if (target.type !== 'submit' && target.type !== 'button') {
                if (target.type === 'checkbox') {
                    if (target.checked && target.name === 'toRemove') {
                        removed.push(target.id)
                        target.checked = false;
                    } else if (target.checked && target.name === 'toppings') {
                        toppingsToAdd.push(target.id)
                        target.checked = false;
                    }
                } else if (target.type === 'textarea' && target.value) {
                    preferences[target.name] = target.value;
                    target.value = '';
                } else if (target.type === 'radio') {
                    if (target.id === '2' && target.checked === true) {
                        preferences.size = 'l'
                        target.checked = false;
                    } else preferences.size = 'xl'
                }

            }
        }
        preferences.name = product.name;
        preferences.price = (product.price + addition);
        preferences.quantity = count;
        preferences.removed = removed;
        preferences.toppings = toppingsToAdd;
        preferences.category = product.category;
        setCart(preferences);
        setMessageModalShow(true);
        resetModal();
        window.location.replace('/menus');
    }

    const additionToppings = (e) => {
        const toppingFound = toppings.find(topping => topping._id === e.target.id)
        if (e.target.checked) {
            setAddition(addition + toppingFound.price)
        } else {
            setAddition(addition - toppingFound.price)
        }
    }

    const additionSize = (e) => {
        if (e.target.id === '2' && e.target.checked) {
            setAddition(addition + principalIngredientPricePrice)
        } else if (e.target.id === '1' && e.target.checked) {
            setAddition(addition - principalIngredientPricePrice)
        }
    }

    const resetModal = () => {
        setCount(1);
        setAddition(0);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={resetModal}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <Form onSubmit={addToCart}>
                    <Accordion className='w-100 pt-3'>
                        <Accordion.Item eventKey="0" className='remove-ingredients'>
                            <Accordion.Header>remove ingredients</Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    {
                                        itemsToRemove.map((i, index) =>
                                            <Form.Check
                                                type="checkbox"
                                                key={i._id}
                                                id={i._id}
                                                label={i.name}
                                                value={i._id}
                                                name='toRemove'
                                                className='toRemove'
                                                disabled={
                                                    index === 0 || index === 1 ? (
                                                        true
                                                    ) : ( 
                                                        false
                                                    )
                                                }
                                            />
                                        )
                                    }
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>add toppings</Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    {
                                        toppings?.map((i) =>
                                            <Form.Check
                                                type="checkbox"
                                                key={i._id}
                                                id={i._id}
                                                label={`${i.name} (+ $${i.price})`}
                                                value={i._id}
                                                name='toppings'
                                                onChange={additionToppings}
                                                className='toppings'
                                            />
                                        )
                                    }
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="p-3 d-flex flex-column">
                        <Row className='preferences-container py-2'>
                            <h5>preferences</h5>
                            <Col sm={6} className='m-0'>
                                <div>
                                    <div className='my-2 w-100'>
                                        Order details:
                                    </div>
                                    <textarea
                                        className='textArea'
                                        name='preferences'
                                        id="mitextarea"
                                        rows="10"
                                        cols="50"
                                    ></textarea>
                                </div>
                            </Col>
                            <Col sm={6} className='m-0'>
                                <div >
                                    <div className='my-2 w-100'>
                                        Size:
                                    </div>
                                    <Form.Check
                                        inline
                                        label={`medium (${defaultItem})`}
                                        name="size"
                                        type='radio'
                                        defaultChecked
                                        id='1'
                                        onChange={additionSize}
                                    />
                                    <Form.Check
                                        inline
                                        label={`large (${item2})`}
                                        name="size"
                                        type='radio'
                                        id='2'
                                        onChange={additionSize}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className='button_container w-100'>
                            <Row className='w-100 mt-2'>
                                <Col sm={6} className='text-center my-2 p-0'>
                                    <Counter
                                        count={count}
                                        setCount={setCount}
                                    />
                                </Col>
                                <Col sm={6} className='text-center my-2 p-0'>
                                    <span className='total-price'>total: ${(product.price + addition) * count}</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='modal-footer d-flex justify-content-center'>
                        <button className='icon-btn add-btn modal-btn' type="submit">
                            <div className="add-icon"></div>
                            <div className="btn-txt">Add to Cart</div>
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    )
}

export default ProductModal