import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Card, Form, Spinner } from 'react-bootstrap'
import Counter from '../../../../counter/Counter';


const Snacks = () => {
const [snacks, setSnacks] = useState();
const [count, setCount] = useState(1);

useEffect(() => {
    handleGetSnacks();        
}, [])

const handleGetSnacks = async() => {
    try {
        const {data} = await axios('http://localhost:4000/api/products/snack')
        setSnacks(data.Snacks)
    } catch (error) {
        Alert('Snack not found')
    }
}


const addToCart = (e)=> {
    e.preventDefault();
    e.target[0].checked = true
    setCount(1)
}



  return (
    <div>
        <h4 className='tittleSection'>Snacks</h4>
            <div className='cards_container'>
                {
                    snacks?.length ? (
                        snacks?.map((snack) => { 
                            return(
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
                        )})
                        ) : (
                            <Spinner className='spinnerLoading' animation="border" variant="success" />      
                            )
                        }
            </div>
    </div>
  )
}

export default Snacks