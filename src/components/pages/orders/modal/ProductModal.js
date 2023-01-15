import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Form, Modal} from 'react-bootstrap'
import Counter from '../../../counter/Counter';

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
        if (cart.name){
            postCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const postCart = async() => {
        try {
            const {data} = await axios.post('http://localhost:4000/api/cart', cart) 
            setMessageToShow(data.message)
            } catch (error) {
                setError(error.response.data.message)
            }
    }
    
    
    const addToCart = (e) => {
        e.preventDefault();
        const preferences = {};
        const removed = [];
        const toppingsToAdd= [];
        for (const target of e.target) {
            if(target.type !== 'submit' && target.type !== 'button') {
                if (target.type === 'checkbox') {
                    if (target.checked && target.name === 'toRemove') {
                        removed.push(target.id)
                        target.checked = false;
                    } else if (target.checked && target.name === 'toppings') {
                        toppingsToAdd.push(target.id)
                        target.checked = false;
                    }
                } else if(target.type === 'textarea' && target.value) {
                    preferences[target.name] = target.value;
                    target.value= '';
                } else if (target.type === 'radio'){
                    if(target.id === '2' && target.checked === true) {
                        preferences.size= 'large'
                        target.checked= false ;
                    } else preferences.size= 'medium'
                }
                
            }
        }
            preferences.name = product.name;
            preferences.price = (product.price+addition);
            preferences.quantity = count;
            preferences.removed = removed;
            preferences.toppings = toppingsToAdd;
            setCart(preferences)
            resetModal()
    }

    const additionToppings = (e) => {
        const toppingFound = toppings.find(topping => topping._id === e.target.id)
        if (e.target.checked) {
            setAddition(addition+toppingFound.price)
        }else {
            setAddition(addition-toppingFound.price)
        }
    }

    const additionSize = (e) => {
        if (e.target.id === '2' && e.target.checked) {
            setAddition(addition+principalIngredientPricePrice)
        } else if (e.target.id === '1' && e.target.checked){
            setAddition(addition-principalIngredientPricePrice)
        }
    }

    const resetModal = () => {
        setCount(1);
        setAddition(0);
        setMessageModalShow(true)
        setShow(false);
    }

    return (
        <Modal size="lg" show={show} onHide={resetModal}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={addToCart}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Remove ingredients</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                                {
                                                    itemsToRemove.map((i) => 
                                                        <Form.Check
                                                        type="checkbox"
                                                        key={i._id}
                                                        id={i._id}
                                                        label= {i.name}
                                                        value= {i._id}
                                                        name= 'toRemove'
                                                        className='toRemove'
                                                        />
                                                        )
                                                }
                                        </div>
                                </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Add toppings</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                                {
                                                    toppings?.map((i) => 
                                                        <Form.Check
                                                        type="checkbox"
                                                        key={i._id}
                                                        id={i._id}
                                                        label= {`${i.name} (+ $${i.price})`}
                                                        value= {i._id}
                                                        name= 'toppings'
                                                        onChange={additionToppings}
                                                        className='toppings'
                                                        />
                                                        )
                                                }
                                        </div>
                                </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                                                <h5>preferences</h5>
                                                <textarea className='textArea' name='preferences' id="mitextarea" rows="10" cols="50"></textarea>
                                                <div className="mb-3 d-flex justify-content-lg-around">
                                                    <div>Size:</div>
                                                    <Form.Check
                                                        inline
                                                        label={`medium (${defaultItem})`}
                                                        name="size"
                                                        type= 'radio'
                                                        defaultChecked
                                                        id='1'
                                                        onChange={additionSize}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label={`large(${item2})`}
                                                        name="size"
                                                        type='radio'
                                                        id='2'
                                                        onChange={additionSize}
                                                    />
                                                </div>
                            <div className='button_container'>
                                <Counter 
                                count={count}
                                setCount={setCount} />
                                <>$ {(product.price+addition)*count}</>
                                <button className='icon-btn add-btn' type="submit">
                                    <div className="add-icon"></div>
                                    <div className="btn-txt">Add to Cart</div>
                                </button>
                            </div>
                        </Form>
            </Modal.Body>
            <Modal.Footer>
                footer   
            </Modal.Footer>
        </Modal>
    )
}

export default ProductModal