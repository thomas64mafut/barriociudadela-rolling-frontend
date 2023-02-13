import './menus.css'
import React, { useEffect, useState } from 'react'

import Burgers from './Products/Burgers';
import Drinks from './Products/drink/Drinks';
import Snacks from './Products/snacks/Snacks';
import MessageModal from './modal/MessageModal';

const Menus = () => {
    const [error, setError] = useState('')
    const [messageModalShow, setMessageModalShow] = useState(false)
    const [messageToShow, setMessageToShow] = useState('')

    useEffect(() => {
        if (messageModalShow) {
            setTimeout(() => {
                setError('')
                setMessageToShow('')
                setMessageModalShow(false)
                window.location.replace('/menus');
            }, 1000);
        }
    }, [messageModalShow])

    return (
        <div className='orders_container'>
            <div className='orders_header'>
                <h2>what do you want to eat today?</h2>
            </div>
            <h2 className='titleSection burgers-title'>Burgers</h2>
            <Burgers
                category={'burger'}
                defaultItem={"1 Patty"}
                item2={"2 Patties"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <h2 className='titleSection sandwiches-title'>Sandwiches</h2>
            <Burgers
                category={'sandwich'}
                defaultItem={"1 steak"}
                item2={"Extra meet"}
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <h2 className='titleSection snacks-title'>Snacks</h2>
            <Snacks
                setError={setError}
                setMessageModalShow={setMessageModalShow}
                setMessageToShow={setMessageToShow}
            />
            <h2 className='titleSection drinks-title'>Drinks</h2>
            <Drinks
                category={"drink"}
                defaultItem={"1 lt"}
                item2={"500 cc"}
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

export default Menus 
