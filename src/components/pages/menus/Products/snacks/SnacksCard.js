import './snacks.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { Card, Form } from 'react-bootstrap';
import Counter from '../../../../counter/Counter';
import axios from '../../../../../api/axios';
import Leaf from '../../../../../assets/icons/Leaf';

const SnacksCard = ({ snack, setError, setMessageModalShow, setMessageToShow }) => {
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState({});
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (cart.name) {
      postCart();
    }
  }, [cart]);

  const postCart = async () => {
    try {
      const { data } = await axios.post('/cart', cart);
      setMessageToShow(data.message);
      setMessageModalShow(true);
    } catch (error) {
      setError(error.response.data.message);
      setMessageModalShow(true);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const preferences = {};
    const removed = [];
    const toppingsToAdd = [];
    for (const target of e.target) {
      if (target.type === 'radio') {
        if (target.id === '2' && target.checked === true) {
          preferences.size = 'large';
          preferences.price = snack.price * 2;
          target.checked = false;
        } else {
          preferences.size = 'medium';
          preferences.price = snack.price;
        }
      }
    }
    preferences.name = snack.name;
    preferences.quantity = count;
    preferences.removed = removed;
    preferences.toppings = toppingsToAdd;
    preferences.category = snack.category;
    setCount(1);
    e.target[0].checked = true;
    setCart(preferences);
  };
  return (
    <Card className={ darkMode ? 'snack-card-dark' : 'snack-card' }>
      <div className='card-image-container' style={{
        backgroundImage: `url(${snack.image})`
      }}
      ></div>
      <Card.Header className={ darkMode ? 'card-header-dark' : 'card-header'}>
        <Card.Title >
          <h5 className='product-card-title'>
            {snack.name.toString().toLowerCase()}
          </h5>
        </Card.Title>
        <b className='product-price'>
                    ${snack.price} { snack?.isVegan && <Leaf />}
        </b>
      </Card.Header>
      <Card.Body className='p-0'>
        <Form onSubmit={addToCart}>
          <div className="size-container">
            <span>Size: </span>
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
              label={`large (4 people) ($${snack.price * 2})`}
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
          </div>
          <div className={ darkMode ? 'text-center button-footer-dark' : 'text-center button-footer' }>
            <button className='icon-btn add-btn' type='submit'>
              <div className="add-icon"></div>
              <div className="btn-txt">Add to Cart</div>
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SnacksCard;
