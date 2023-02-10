import axios from '../../../../../api/axios';
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
            const { data } = await axios('/product/snack')
            setSnacks(data.Snacks)
        } catch (error) {
            setError('Snack not found')
        }
    }

    return (
        <div>
            <div className='cards_container'>
                <Row className='p-3 snack-container'>
                    {
                        snacks?.length ? (
                            snacks?.map((snack, index) => {
                                return (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mb-3' key={index}>
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