import './products.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import axios from '../../../../api/axios';
import { Table, Button, Alert, Accordion, Dropdown, Row, Col } from 'react-bootstrap';

import AddEditProductModal from './modal/AddEditProductModal';

import Beer from '../../../../assets/icons/Beer'
import Leaf from '../../../../assets/icons/Leaf'
import Edit from '../../../../assets/icons/Edit';
import X from '../../../../assets/icons/X';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [productsToShow, setProductsToShow] = useState([]);
    const [categoryToAdd, setCategoryToAdd] = useState('')
    const [allCategories, setAllCategories] = useState([])

    const [addEditModalShow, setAddEditModalShow] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});

    const foodSizes = ['l', 'xl'];
    const drinkSizes = ['750ml', '1,5lts'];

    useEffect(() => {
        getCategories();
        handleGetProducts();
        setIsLoading(false);
    }, [addEditModalShow])

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
            const { data } = await axios.get('/category/');
            setAllCategories(data?.categories);
        } catch (error) {
            console.log('mori');
        }
    }

    const handleDeleteProduct = async (categoryId, productId) => {
        try {
            const { data } = await axios.patch(`/product/${categoryId.name}/delete/${productId}`, {});
            handleGetProducts();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenEditModal = (product) => {
        setProductToEdit(product);
        setIsEditing(true);
        setAddEditModalShow(true);
    }

    const handleOpenAddModal = (product, newProductCategory) => {
        const payload = {
            category: newProductCategory,
            name: '',
            detail: '',
            price: 0,
            brand: '',
            isVegan: false,
            hasAlcohol: false,
            image: '',
            ingredients: [],
        }
        if (newProductCategory?.name === 'burger') {
            const burgerPayload = { ...payload, ingredients: ['63d5e91070dd61cda330900a', '63d5e97270dd61cda330900c'] }
            setProductToEdit(burgerPayload);
        } else if (newProductCategory?.name === 'sandwich') {
            const sandwichPayload = { ...payload, ingredients: ['63d5e9b170dd61cda3309010', '63d5e99770dd61cda330900e'] }
            setProductToEdit(sandwichPayload);
        } else setProductToEdit(payload);

        setCategoryToAdd(newProductCategory);
        setIsEditing(false);
        setAddEditModalShow(true);
    }

    return (
        <>
            <div className='abm-container'>
                <div className='table-header'>
                    <h1>Products Control Panel</h1>
                    <Dropdown className='m-1'>
                        <Dropdown.Toggle variant='danger' className='btn-dropdown'>
                            Add
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                allCategories?.map((category, index) => (
                                    <Dropdown.Item
                                        onClick={() => handleOpenAddModal({}, category)}
                                        className='w-100'
                                        key={index}
                                    >
                                        {category?.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {errorMessage ? (
                    <Alert variant='danger'>{errorMessage}</Alert>
                ) : (
                    ''
                )}
                <Accordion>
                    {
                        productsToShow?.map((product, index) => (
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>
                                    {product?.name}
                                </Accordion.Header>
                                <Accordion.Body className='p-2'>
                                    <div className='overflow-table-container'>
                                        <Table className='table-container mt-2' size='sm'>
                                            <thead>
                                                <tr>
                                                    <th className='col-3'>category</th>
                                                    <th className='col-3'>name</th>
                                                    {
                                                        product?.category?.name === 'drink' &&
                                                        <th>brand</th>
                                                    }
                                                    <th className='col-3'>price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{product?.category?.name}</td>
                                                    <td>{product?.name}{product?.isVegan && <Leaf />}{product?.hasAlcohol && <Beer />}</td>
                                                    {
                                                        product?.category?.name === 'drink' &&
                                                        <td>{product?.brand}</td>
                                                    }
                                                    <td>$ {product?.price}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table className='table-container'>
                                            <tbody>
                                                <tr>
                                                    <th>detail</th>
                                                    <td>{product?.detail}</td>
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
                                                    <ul className='d-flex flex-wrap p-0'>
                                                        {
                                                            product?.ingredients.map((ingredient, index) => (
                                                                <li className='mx-4' key={index}>{ingredient?.name}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    }
                                    <div className='w-100 d-flex justify-content-evenly'>
                                        <Row>
                                            <Col className='w-100 m-0'>
                                                <div className='product-image-container p-3 my-3'>
                                                    <span className='mb-2'>Image: </span>
                                                    <div className='product-image-div'>
                                                        <img src={product?.image} alt='' className='product-image' />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className='w-100 m-0'>
                                                <div className='product-size-container p-3 my-3'>
                                                    <span>Sizes available: </span>
                                                    {
                                                        product?.category?.name === 'drink' ?
                                                            <ul>
                                                                {
                                                                    drinkSizes.map((size, index) => (
                                                                        <li key={index}>{size}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            :
                                                            <ul>
                                                                {
                                                                    foodSizes.map((size, index) => (
                                                                        <li key={index}>{size}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='d-flex flex-row justify-content-center product-icons'>
                                        <Button
                                            onClick={() => handleOpenEditModal(product)}
                                            className='mx-2'
                                        >
                                            <Edit />
                                            <span className='d-sm-block d-none'>
                                                Edit
                                            </span>
                                        </Button>
                                        <Button
                                            variant='danger'
                                            onClick={() =>
                                                handleDeleteProduct(product?.category, product?._id)
                                            }
                                        >
                                            <X />
                                            <span className='d-sm-block d-none'>
                                                Delete
                                            </span>
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </div>
            <AddEditProductModal
                show={addEditModalShow}
                setShow={setAddEditModalShow}
                product={productToEdit}
                setProduct={setProductToEdit}
                categoryToAdd={categoryToAdd}
                isEditing={isEditing}
            />
        </>
    )
}

export default Products