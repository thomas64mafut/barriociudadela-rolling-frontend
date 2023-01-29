import axios from '../../../../api/axios';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const BuyModal = ({ show , setShow, cart}) => {
    const navigate = useNavigate()

    const buyPayment = (e) => {
        e.preventDefault();
        handleBuy()
        setShow(false)
    }

    const handleBuy = async() => {
        try {
            const { data } = await axios.put('/cart/buy/'+cart._id)
            console.log(data)
            navigate('/menus')
        } catch (error) {
            console.log(error)
        }
    }   

    return (
    <div>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>How do you want to pay?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={buyPayment}>
                <Modal.Body>
                    <Form.Check
                        type= 'radio'
                        label='Cash'
                        value='cash'
                        name='payment'
                        defaultChecked
                    />
                    <Form.Check
                        type= 'radio'
                        label='Credit card'
                        value='card'
                        name='payment'

                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>
                    BUY
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>
  )
}

export default BuyModal