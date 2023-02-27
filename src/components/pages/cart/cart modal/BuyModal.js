import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from '../../../../api/axios';

const BuyModal = (props) => {
  const {
    show, 
    setShow, 
    cart,
    setErrorMessage,
  } = props;

  const buyPayment = (e) => {
    e.preventDefault();
    handleBuy();
    setShow(false);
  };

  const handleBuy = async() => {
    try {
      await axios.put('/cart/buy/'+cart._id);
      window.location.replace('/menus');
    } catch (error) {
      setErrorMessage(error.message);
      setShow(false);
    }
  };   

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
  );
};

export default BuyModal;
