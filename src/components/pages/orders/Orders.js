import React, { useEffect, useState } from 'react'
import {Button} from 'react-bootstrap'
import './orders.css'
import Burgers from './Products/Burgers';
import Drinks from './Products/drink/Drinks';
import Snacks from './Products/snacks/Snacks';
import MessageModal from './modal/MessageModal';



const Orders = () => {
    const [error, setError] = useState('')
    const [messageModalShow, setMessageModalShow] = useState(false)
    const [messageToShow, setMessageToShow] = useState('')

    useEffect(() => {
        if (messageModalShow) {
            setTimeout(() => {
                setError('')
                setMessageToShow('')
                setMessageModalShow(false)
            }, 1000);
        }
    }, [messageModalShow])
    
    
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
        setError={setError}
        setMessageModalShow={setMessageModalShow}
        setMessageToShow={setMessageToShow}
        />
        <Burgers
        category={'Sandwichs'}
        defaultItem={"1 steak"}
        item2={"Extra meet"}
        setError={setError}
        setMessageModalShow={setMessageModalShow}
        setMessageToShow={setMessageToShow}
        />
        <Drinks 
        category={"Drink"}
        defaultItem={"1 lt"}
        item2={"500 cc"}
        setError={setError}
        setMessageModalShow={setMessageModalShow}
        setMessageToShow={setMessageToShow}
        />
        <Drinks 
        category={"Beer"}
        defaultItem={"Pinta"}
        item2={"1/2 Pinta"}
        setError={setError}
        setMessageModalShow={setMessageModalShow}
        setMessageToShow={setMessageToShow}
        />
        <Snacks 
        setError={setError}
        setMessageModalShow={setMessageModalShow}
        setMessageToShow={setMessageToShow}
        />
        <MessageModal 
            show={messageModalShow} 
            setShow={setMessageModalShow}
            error={error}
            messageToShow={messageToShow}
        />
    </div>
    )
}

export default Orders