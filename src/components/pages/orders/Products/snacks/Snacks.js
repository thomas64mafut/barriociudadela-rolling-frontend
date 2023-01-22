import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import SnacksCard from './SnacksCard';


const Snacks = ({ setError, setMessageModalShow, setMessageToShow }) => {
    const [snacks, setSnacks] = useState();

    useEffect(() => {
        handleGetSnacks();
    }, [])

    const handleGetSnacks = async () => {
        try {
            const { data } = await axios('http://localhost:4000/api/product/snack')
            setSnacks(data.Snacks)
        } catch (error) {
            setError('Snack not found')
        }
    }

    return (
        <div>
            <h4 className='tittleSection'>Snacks</h4>
            <div className='cards_container'>
                {
                    snacks?.length ? (
                        snacks?.map((snack) => {
                            return (
                                <SnacksCard
                                    key={snack._id}
                                    snack={snack}
                                    setError={setError}
                                    setMessageModalShow={setMessageModalShow}
                                    setMessageToShow={setMessageToShow}
                                />
                            )
                        })
                    ) : (
                        <Spinner className='spinnerLoading' animation="border" variant="success" />
                    )
                }
            </div>
        </div>
    )
}

export default Snacks