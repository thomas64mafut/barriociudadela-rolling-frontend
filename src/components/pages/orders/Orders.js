
import React from 'react'
import {Button} from 'react-bootstrap'
import './orders.css'
import Burgers from './Products/Burgers';
import Drinks from './Products/drink/Drinks';
import Snacks from './Products/snacks/Snacks';



const Orders = () => {
    
    return (
    <div className='orders_container'>
        <div className='orders_header'>
            <h3>What do you want to eat today?</h3>
            <Button variant='primary'>Cart</Button>
        </div>    
        <Burgers
        category={'Burgers'}
        defaultItem={"1 Patty"}
        item2={"2 Patties"}
        />
        <Burgers
        category={'Sandwichs'}
        defaultItem={"1 steak"}
        item2={"Extra meet"}
        />
        <Drinks 
        category={"Drink"}
        defaultItem={"500 cc"}
        item2={"1 lt"}
        />
        <Drinks 
        category={"Beer"}
        defaultItem={"Pinta"}
        item2={"1/2 Pinta"}
        />
        <Snacks/>
    </div>
    )
}

export default Orders