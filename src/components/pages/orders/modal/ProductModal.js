import React, { useEffect, useState } from 'react'
import { Accordion, Form, Modal} from 'react-bootstrap'

const ProductModal = ({show, setShow, product}) => {
    const [cart, setCart] = useState();
    useEffect(() => {
        console.log(cart)
    }, [cart])
    
    const toppings = [
        "cheese", "bacon", "Hot souce"
    ]


    const addToCart = (e) => {
        e.preventDefault();
        const preferences = {};
        const removed = [];
        for (const target of e.target) {
            if(target.type === 'submit') {
                preferences.name = target.id;
            }else if (target.type !== 'button') {
                if (target.type === 'checkbox') {
                    if (target.checked) {
                        removed.push(target.id)
                        target.checked = false;
                    }    
                }else {
                    if(target.value)
                    preferences[target.name] = target.value;
                    target.value= '';
                }
            }
        }
        if (removed.length !== 0) {
            preferences.removed = removed;
        }
        setCart(preferences)
    }

    return (
        <Modal size="lg" show={show} onHide={()=>(setShow(false))}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={addToCart}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Remove ingredients</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                                {
                                                    product?.ingredients?.map((i) => 
                                                        <Form.Check
                                                        type="checkbox"
                                                        id={i}
                                                        label= {i}
                                                        />
                                                        )
                                                }
                                        </div>
                                </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Add toppings</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                                {
                                                    toppings?.map((i) => 
                                                        <Form.Check
                                                        type="checkbox"
                                                        id={i}
                                                        label= {i}
                                                        />
                                                        )
                                                }
                                        </div>
                                </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                                                <h5>preferences</h5>
                                                <textarea className='textArea' name='preferences' id="mitextarea" rows="10" cols="50"></textarea>
                            <div className='button_container'>
                                <button class="icon-btn add-btn" type="submit" id= {product.name}>
                                    <div class="add-icon"></div>
                                    <div class="btn-txt">Add to Cart</div>
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