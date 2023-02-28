import './cart.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Table } from 'react-bootstrap';

export const Cart = ({ cart }) => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  let idkey = 0;
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    handleSetTotalPrice();
  }, []);

  const handleSetTotalPrice = () => {
    var cartTotalPriceCalculated = 0;
    for (const product of cart?.products) {
      cartTotalPriceCalculated = cartTotalPriceCalculated + (product?.price * product?.quantity);
    }
    setCartTotalPrice(cartTotalPriceCalculated);
  };

  return (
    <div
      className={
        darkMode
          ? `${cart.cartStatus} w-100 main-container-dark`
          : `${cart.cartStatus} w-100 `
      }
    >
      <Table bordered className="w-100 cart-table-container">
        <thead>
          <tr>
            <th>#</th>
            <th>product name</th>
            <th>preferences</th>
            <th>quantity</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {cart?.products?.map((product) => {
            idkey = idkey + 1;
            return (
              <tr key={idkey}>
                <td>{idkey}</td>
                <td>{product.name}</td>
                <td>
                  size: {product.size}
                  {product.removed.length > 0 && (
                    <tr>
                      to remove:{' '}
                      {product.removed.map((i, index) => {
                        if (product?.removed.length === index + 1) {
                          return `${i.name}`;
                        } else return `${i.name}, `;
                      })}
                    </tr>
                  )}
                  {product.toppings.length > 0 && (
                    <tr>
                      to topping:{' '}
                      {product.toppings.map((i, index) => {
                        if (product?.toppings.length === index + 1) {
                          return `${i.name}`;
                        } else return `${i.name}, `;
                      })}
                    </tr>
                  )}
                  {product.preferences && (
                    <tr>preferences: {product.preferences}</tr>
                  )}
                  {product.isVegan && <tr>Vegan option</tr>}
                </td>
                <td>{product.quantity}</td>
                <td>{product.quantity * product.price}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="total-price">total</td>
            <td className="total-price"> $ {cartTotalPrice}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
