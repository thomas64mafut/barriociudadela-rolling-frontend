import './products.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import axios from '../../../../api/axios';
import { Table, Button, Alert, Accordion, Dropdown } from "react-bootstrap";
import AddEditProductModal from './modal/AddEditProductModal';
import Beer from '../../../../assets/icons/dark/Beer';
import Leaf from '../../../../assets/icons/dark/Leaf';

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
            const { data } = await axios.get('/category');
            setAllCategories(data?.categories);
        } catch (error) {
            console.log('mori');
        }
    }

    const handleDeleteProduct = async (categoryId, productId) => {
        console.log(categoryId, productId);
        try {
            const { data } = await axios.patch(`/product/${categoryId.name}/delete/${productId}`, {});
            console.log(data);
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
        setProductToEdit(product);
        setCategoryToAdd(newProductCategory);
        setIsEditing(false);
        setAddEditModalShow(true);
    }

    return (
        <>
            <div className='abm-container'>
                <div className="table-header">
                    <h1>Products Control Panel</h1>
                </div>
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : (
                    ""
                )}
                <Dropdown className="m-1">
                    <Dropdown.Toggle variant='danger' className="btn-dropdown">
                        Add
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            allCategories?.map((category) => (
                                <Dropdown.Item
                                    onClick={() => handleOpenAddModal({}, category)}
                                    className='w-100'
                                >
                                    {category?.name}
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Accordion>
                    {
                        productsToShow?.map((product, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {product?.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className='overflow-table-container'>
                                        <Table className='table-container' size='sm'>
                                            <thead>
                                                <tr>
                                                    <th className='col-3'>category</th>
                                                    <th className='col-3'>name</th>
                                                    <th className='col-3'>price</th>
                                                    {
                                                        product?.category?.name === 'drink' &&
                                                        <th>brand</th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{product?.category?.name}</td>
                                                    <td>{product?.name}{product?.isVegan && <Leaf />}</td>
                                                    <td>$ {product?.price}</td>
                                                    {
                                                        product?.category?.name === 'drink' &&
                                                        <td>{product?.brand}{product?.hasAlcohol && <Beer />}</td>
                                                    }
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
                                            {
                                                product?.category?.name === 'drink' ?
                                                    <ul>
                                                        {
                                                            drinkSizes.map((size) => (
                                                                <li>{size}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                    :
                                                    <ul>
                                                        {
                                                            foodSizes.map((size) => (
                                                                <li>{size}</li>
                                                            ))
                                                        }
                                                    </ul>
                                            }
                                        </div>
                                    </div>
                                    <Button onClick={() => handleOpenEditModal(product)}>Edit</Button>
                                    <Button variant='danger' onClick={() => handleDeleteProduct(product?.category, product?._id)}>Delete</Button>
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