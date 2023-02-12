import axios from '../../../../../api/axios';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import SnacksCard from './SnacksCard';
import Loading from '../../../../loading/Loading';


const Snacks = (props) => {
    const {
        setError,
        setMessageModalShow,
        setMessageToShow
    } = props;

    const [snacks, setSnacks] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGetData = async () => {
        setIsLoading(true);
        await handleGetSnacks();
        setIsLoading(false);
    }

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
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div className='cards_container'>
                        {
                            error &&
                            <Alert variant='danger'>{error}</Alert>
                        }
                        <Row className='p-3 snack-container justify-content-center'>
                            {
                                snacks?.length ? (
                                    snacks?.map((snack, index) => {
                                        return (
                                            <Col
                                                md={6}
                                                lg={4}
                                                className='d-flex justify-content-center mb-4'
                                                key={index}
                                            >
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
                                    <h4 className='w-100 text-center'>there are no products in this category</h4>
                                )
                            }
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default Snacks