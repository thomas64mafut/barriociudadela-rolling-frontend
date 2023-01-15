import React, { useState, useEffect } from 'react'
import './products.css'
import '../admin.css'
import axios from 'axios';

import { Table, Button, Alert, Accordion } from "react-bootstrap";

import UserPlus from '../../../../assets/icons/light/UserPlus';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';

const Products = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [productsToShow, setProductsToShow] = useState([]);

    useEffect(() => {
        handleGetProoducts();
    }, [])


    const handleGetProoducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/products/');
            console.log(data);
            setProductsToShow(data?.products);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setProductsToShow([]);
        }
    };

    return (
        <>
            <div className='abm-container'>
                <div className="table-header">
                    <h1>Products Control Panel</h1>
                    <Button variant='success'>
                        <UserPlus />
                    </Button>
                </div>
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : (
                    ""
                )}
                <Accordion>
                    {
                        productsToShow?.map((product, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {product?.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Table className='table-container' size='sm'>
                                        <thead>
                                            <tr>
                                                <th className='col-3'>category</th>
                                                <th className='col-3'>name</th>
                                                <th className='col-3'>brand</th>
                                                <th className='col-3'>price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{product?.category}</td>
                                                <td>{product?.name}</td>
                                                <td>{product?.brand}</td>
                                                <td>{product?.price}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    {
                                        product?.ingredients &&
                                        <Accordion>
                                            <Accordion.Item>
                                                <Accordion.Header>
                                                    Ingredients
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ul className='d-flex justify-content-center align-items-center'>
                                                        {
                                                            product?.ingredients.map((ingredient) => (
                                                                <li className='mx-4'>{ingredient?.name}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    }
                                    <div className='product-image-container p-3 my-3'>
                                        <img src={product?.image} alt={'image of' + product?.name} className='product-image' />
                                        <Button className='product-image-button d-flex mt-3'>
                                            <span>
                                                Change Image
                                            </span>
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </div>
        </>
    )
}

export default Products