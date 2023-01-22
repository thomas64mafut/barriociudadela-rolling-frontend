import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './drinks.css'
import DrinksCard from './DrinksCard';

const Drinks = ({ category, defaultItem, item2, setError, setMessageModalShow, setMessageToShow }) => {
    const [drinks, setDrinks] = useState();

    useEffect(() => {
        handleGetdrinks();
    }, []);

    const handleGetdrinks = async () => {
        try {
            const { data } = await axios('http://localhost:4000/api/product/drink')
            const drinksFiltered = data.Drinks?.filter((drink) => drink.category === category)
            setDrinks(drinksFiltered)
        } catch (error) {
            setError('Drinks not found')
        }
    }

    return (
        <div>
            <h4 className='tittleSection'>{category}s</h4>
            <div className='cards_container'>
                {
                    drinks?.length ? (
                        drinks?.map((drink) => {
                            return (
                                <DrinksCard
                                    key={drink._id}
                                    drink={drink}
                                    defaultItem={defaultItem}
                                    item2={item2}
                                    setError={setError}
                                    setMessageToShow={setMessageToShow}
                                    setMessageModalShow={setMessageModalShow}
                                />
                            ) /* else return <></> */
                        })
                    ) : (
                        <Spinner className='spinnerLoading' animation="border" variant="success" />
                    )
                }
            </div>
        </div>
    )
}

export default Drinks
