import './products.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import axios from '../../../../api/axios';
import { Table, Button, Alert, Accordion } from "react-bootstrap";
import UserPlus from '../../../../assets/icons/light/UserPlus';
import AddEditProductModal from './modal/AddEditProductModal';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [productsToShow, setProductsToShow] = useState([]);
    const [allCategories, setAllCategories] = useState([])

    const [editModalShow, setEditModalShow] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});

    useEffect(() => {
        getCategories();
        handleGetProducts();
        setIsLoading(false);
    }, [])

    const handleGetProducts = async () => {
        try {
            const { data } = await axios.get('/product/');
            setProductsToShow(data?.products);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setProductsToShow([]);
        }
    };

    const getCategories = async () => {
        try {
            const { data } = await axios.get('/category');
            setAllCategories(data?.categories);
        } catch (error) {
            console.log('mori');
        }
    }

    const handleDeleteProduct = async (categoryId, productId) => {
        console.log(categoryId, productId);
        try {
            const { data } = await axios.patch(`/product/${categoryId.name}/delete/${productId}`, { });
            console.log(data);
            handleGetProducts();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenEditModal = (product) => {
        setProductToEdit(product);
        setIsEditing(true);
        setEditModalShow(true);
    }

    const handleOpenAddModal = (product) => {
        setProductToEdit(product);
        setIsEditing(false);
        setEditModalShow(true);
    }

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
                <Button onClick={() => handleOpenAddModal({})}>Add</Button>
                <Accordion>
                    {
                        productsToShow?.map((product, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {product?.name}
                                    <Button onClick={() => handleOpenEditModal(product)}>Edit</Button>
                                    <Button variant='danger' onClick={() => handleDeleteProduct(product?.category, product?._id)}>Delete</Button>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className='overflow-table-container'>
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
                                                    <td>{product?.category?.name}</td>
                                                    <td>{product?.name}</td>
                                                    <td>{product?.brand}</td>
                                                    <td>{product?.price}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    {
                                        product?.ingredients &&
                                        <Accordion>
                                            <Accordion.Item eventKey={'ingredientOf' + index}>
                                                <Accordion.Header>
                                                    Ingredients
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ul className='d-flex justify-content-center align-items-center flex-wrap'>
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
                                    <div className='w-100 d-flex justify-content-evenly'>
                                        <div className='product-image-container p-3 my-3'>
                                            <span className='mb-2'>Image: </span>
                                            <img src={product?.image} alt={'image of' + product?.name} className='product-image' />
                                        </div>
                                        <div className='product-size-container p-3 my-3'>
                                            <span>Sizes available: </span>
                                            <ul>
                                                <li>m</li>
                                                <li>l</li>
                                                <li>xl</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </div>
            <AddEditProductModal
                show={editModalShow}
                setShow={setEditModalShow}
                product={productToEdit}
                setProduct={setProductToEdit}
                isEditing={isEditing}
            />
        </>
    )
}

export default Products