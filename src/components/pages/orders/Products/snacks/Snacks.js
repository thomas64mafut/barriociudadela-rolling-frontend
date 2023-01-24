import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

import SnacksCard from './SnacksCard';


const Snacks = ({ setError, setMessageModalShow, setMessageToShow }) => {
    const [snacks, setSnacks] = useState();

    useEffect(() => {
        handleGetSnacks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h2 className='titleSection snacks-title'>Snacks</h2>
            <div className='cards_container'>
                <Row className='p-3'>
                    {
                        snacks?.length ? (
                            snacks?.map((snack) => {
                                return (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mb-3'>
                                        <SnacksCard
                                            key={snack._id}
                                            snack={snack}
                                            setError={setError}
                                            setMessageModalShow={setMessageModalShow}
                                            setMessageToShow={setMessageToShow}
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

export default Snacks