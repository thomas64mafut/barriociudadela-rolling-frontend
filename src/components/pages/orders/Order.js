import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Order = ({ productsShow, cartStatus, role }) => {
  const [price, setPrice] = useState([]);
  let totalPrice = 0;

  useEffect(() => {
    handleSetTotalPrice();
  }, []);

  const handleSetTotalPrice = () => {
    for (const product of productsShow) {
      totalPrice = totalPrice + (product?.price * product?.quantity);
    }
    setPrice(totalPrice);
  };

  return (
    <div className={cartStatus}>
      <Table bordered className='text-white order-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>product name</th>
            <th>preferences</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            productsShow?.map((product, index) => {
              return (
                <tr key={index} className=''>
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>
                    size: {product.size}
                    {
                      product.removed.length > 0 &&
                      <div>to remove:
                        {
                          product.removed.map((i) => {
                            return <li key={i.name}>{i.name}</li>;
                          })
                        }
                      </div>
                    }
                    {
                      product.toppings.length > 0 &&
                      <div>to topping:
                        {
                          product.toppings.map((i) => {
                            return <li key={i.name}>{i.name}</li>;
                          })
                        }
                      </div>
                    }
                    {
                      product.preferences &&
                      <li>preferences:
                        {
                          product.preferences
                        }
                      </li>
                    }
                    {
                      product.isVegan &&
                      <li>
                        Vegan option
                      </li>
                    }
                  </td>
                  <td>{product.quantity}</td>
                </tr>
              );
            })
          }
          {
            role === 'admin' ? (
              <tr>
                <td></td>
                <td></td>
                <td className='total-price'>
                  total
                </td>
                <td className='total-price'> $ {price}</td>
              </tr>) : (
              <>
              </>)
          }


        </tbody>
      </Table>

    </div>
  );
};

export default Order;
