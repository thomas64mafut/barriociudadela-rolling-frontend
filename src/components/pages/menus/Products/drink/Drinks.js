import axios from '../../../../../api/axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './drinks.css'
import DrinksCard from './DrinksCard';
import { Row, Col } from 'react-bootstrap'


const Drinks = ({ category, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
    const [drinks, setDrinks] = useState();

    useEffect(() => {
        handleGetdrinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetdrinks = async () => {
        try {
            const { data } = await axios('/product/drink')
            const drinksFiltered = data.Drinks?.filter((drink) => drink.category === category)
            setDrinks(drinksFiltered)
        } catch (error) {
            setError('Drinks not found')
        }
    }

    return (
        <div>
            <h4 className='titleSection drinks-title'>{category}s</h4>
            <div className='cards_container'>
                <Row className='p-3'>
                    {
                        drinks?.length ? (
                            drinks?.map((drink) => {
                                return (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mb-4'>
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
