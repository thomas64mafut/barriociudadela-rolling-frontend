import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import './drinks.css'
import DrinksCard from './DrinksCard';

const Drinks = ({category, defaultItem, item2}) => {
    const [drinks, setDrinks] = useState();
    
    useEffect(() => {
        handleGetdrinks();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleGetdrinks = async() => {
        try {
            const {data} = await axios('http://localhost:4000/api/products/drink')
            const drinksFiltered = data.Drinks?.filter((drink) => drink.category === category)
            setDrinks(drinksFiltered)
        } catch (error) {
            Alert('Drinks not found')
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
                                        drink= {drink}
                                        defaultItem = {defaultItem}
                                        item2 = {item2}
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
