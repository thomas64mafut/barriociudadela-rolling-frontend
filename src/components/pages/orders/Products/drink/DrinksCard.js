import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import Counter from '../../../../counter/Counter'

const DrinksCard = ({drink, defaultItem, item2 }) => {
    const [count, setCount] = useState(1);

    const addToCart = (e)=> {
        e.preventDefault();
        e.target[0].checked = true
        setCount(1)
    }
  return (
    <div>
        <Card key={drink._id} className='card' style={{ width: '18rem' }}>
            <Card.Img variant="top" src= {drink.image} />
            <Card.Body>
            <Card.Title ><b className='title'>{drink.name}</b> <div className='price'>price:${drink.price}</div></Card.Title>
                <div className="mb-3 d-flex flex-column">
                    <div>Size: </div>
                        <Form onSubmit={addToCart}>
                            <Form.Check
                                inline
                                label={`${defaultItem} ($${drink.price})`}
                                name="size"
                                type= 'radio'
                                defaultChecked
                                id='1'
                            />
                            <Form.Check
                                inline
                                label={`${item2} ($${drink.price/2})`}
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

export default DrinksCard