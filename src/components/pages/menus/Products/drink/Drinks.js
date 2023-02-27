import './drinks.css';
import React, { useEffect, useState } from 'react';
import axios from '../../../../../api/axios';
import { Row, Col } from 'react-bootstrap';

import DrinksCard from './DrinksCard';
import Loading from '../../../../loading/Loading';


const Drinks = ({ defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
  const [drinks, setDrinks] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    setIsLoading(true);
    await handleGetDrinks();
    setIsLoading(false);
  };

  const handleGetDrinks = async () => {
    try {
      const { data } = await axios('/product/drink');
      setDrinks(data.Drinks);
    } catch (error) {
      setError('Drinks not found');
    }
  };

  return (
    <div>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <div className='cards_container'>
              <Row className='p-3 drink-container'>
                {
                  drinks?.length ? (
                    drinks?.map((drink, index) => {
                      return (
                        <Col
                          md={6}
                          lg={4}
                          className='d-flex justify-content-center mb-4'
                          key={index}
                        >
                          <DrinksCard
                            key={drink._id}
                            drink={drink}
                            defaultItem={defaultItem}
                            item2={item2}
                            setError={setError}
                            setMessageToShow={setMessageToShow}
                            setMessageModalShow={setMessageModalShow}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <h4 className='w-100 text-center'>there are no products in this category</h4>
                  )
                }
              </Row>
            </div>
          )
      }
    </div>
  );
};

export default Drinks;
