import './drinks.css'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from '../../../../../api/axios';
import { Row, Col } from 'react-bootstrap'

import DrinksCard from './DrinksCard';


const Drinks = ({ category, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
    const [drinks, setDrinks] = useState();

    useEffect(() => {
        handleGetdrinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetdrinks = async () => {
        try {
            const { data } = await axios('/product/drink')
            setDrinks(data.Drinks)
        } catch (error) {
            setError('Drinks not found')
        }
    }

    return (
        <div>
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
                                ) 
                            })
                        ) : (
                            <Spinner className='spinnerLoading' animation="border" variant="success" />
                        )
                    }
                </Row>
            </div>
        </div>
    )
}

export default Drinks
