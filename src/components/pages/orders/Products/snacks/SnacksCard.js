import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import Counter from '../../../../counter/Counter';

const SnacksCard = ({snack}) => {
    const [count, setCount] = useState(1);

    const addToCart = (e)=> {
        e.preventDefault();
        e.target[0].checked = true
        setCount(1)
    }
  return (
    <div>
        <Card key={snack._id} className='card' style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src= {snack.image} />
                                        <Card.Body>
                                            <Card.Title ><b className='title'>{snack.name}</b> <div className='price'>price:${snack.price}</div></Card.Title>
                                            <div className="mb-3 d-flex flex-column">
                                                <div>Size: </div>
                                                    <Form onSubmit={addToCart}>
                                                        <Form.Check
                                                            inline
                                                            label={`small (2 people) ($${snack.price})`}
                                                            name="size"
                                                            type= 'radio'
                                                            defaultChecked
                                                            id='1'
                                                            />
                                                        <Form.Check
                                                            inline
                                                            label={`large(4 people) ($${snack.price*2})`}
                                                            name="size"
                                                            type='radio'
                                                            id='2'
                                                            />
                                                        <div className='addCartButton'>
                                                            <Counter 
                                                                count={count}
                                                                setCount={setCount} 
                                                            />
                                                            <button className='icon-btn add-btn' type='submit'>
                                                                <div className="add-icon"></div>
                                                                <div className="btn-txt">Add to Cart</div>
                                                            </button>
                                                        </div>
                                                    </Form>
                                        </div>
                                        </Card.Body>
                                    </Card>


    </div>
  )
}

export default SnacksCard