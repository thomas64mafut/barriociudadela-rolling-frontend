import React from 'react'
import axios from '../../../../../api/axios'
import { Modal, Button, Form, Dropdown, Accordion } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

const AddEditProductModal = (props) => {
    const {
        show,
        setShow,
        product,
        setProduct,
        isEditing,
    } = props;

    const [ingredientsToAdd, setIngredientsToAdd] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [category, setCategory] = useState('')
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        getAllIngredients();
        getCategories();
    }, [])

    useEffect(() => {
        if (isEditing) {
            handleSetProductToEdit();
        } else {
            setCategory('');
            setName('');
            setDetail('');
            setBrand('');
            setPrice('');
            setImage('');
            setIngredientsList([])
            setIngredientsToAdd(allIngredients);
        }
        setIsLoading(false);
    }, [show])

    useEffect(() => {
        getFilteredIngredients();
    }, [ingredientsList])

    const handleSetProductToEdit = () => {
        const categoryFound = allCategories.find(category => category._id === product?.category._id)
        setCategory(categoryFound);
        setName(product?.name);
        setDetail(product?.detail);
        setBrand(product?.brand);
        setPrice(product?.price);
        setImage(product?.image);
        setIngredientsList(product?.ingredients)
    }

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleUploadImg = async (e) => {
        const fileUploaded = e.target.files[0];
        e.target.value = '';
        beforeUpload(fileUploaded);
        const base64 = await getBase64(fileUploaded);
        console.log(base64);
        setImage(base64);
    };

    const getBase64 = (img) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result));
            reader.readAsDataURL(img);
        });
    };

    const beforeUpload = (file) => {
        const isJpegOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpegOrPng) {
            alert('Solo se admiten archivos png o jpeg.');
            return;
        }
    };

    const getFilteredIngredients = async () => {
        const filteredIngredients = allIngredients.filter(item1 => {
            const item1Str = JSON.stringify(item1);
            return !ingredientsList.find(item2 => item1Str === JSON.stringify(item2))
        }
        );
        setIngredientsToAdd(filteredIngredients)
    }

    const getAllIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient');
            setAllIngredients(data?.ingredients);
        } catch (error) {
            console.log(error);
        }
    }

    const removeIngredientFromList = (ingredientToRemove) => {
        const newIngredientList = ingredientsList.filter((ingredient) => {
            return ingredient !== ingredientToRemove;
        });
        setIngredientsList(newIngredientList);

    }

    const getCategories = async () => {
        try {
            const { data } = await axios.get('/category');
            setAllCategories(data?.categories);
        } catch (error) {
            console.log('mori');
        }
    }

    const handleAddModal = async () => {
        try {
            const payload = {
                category: category?._id,
                name: name,
                brand: brand,
                detail: detail,
                price: price,
                image: image,
                ingredients: ingredientsList,
            }
            console.log(payload);
            const { data } = await axios.post(`/product/${category?.name}`, payload);
            console.log(data);
            setShow(false);
        } catch (error) {
            console.log('mori', error);
        }
    };

    const handleEditModal = async (productCategory, productId) => {
        try {
            const payload = {
                category: category?._id,
                name: name,
                brand: brand,
                detail: detail,
                price: price,
                image: image,
                ingredients: ingredientsList,
            }
            const { data } = await axios.put(`/product/${productCategory}/${productId}`, payload);
            console.log(data);
            setShow(false);
        } catch (error) {
            console.log('mori', error);
        }
    };
    
    return (
        <>
            <Modal centered show={show} onHide={() => setShow(false)}>
                {
                    isLoading ?
                        <h1>Loading</h1>
                        :
                        <div>
                            <Form>
                                <Modal.Header closeButton>
                                    <Modal.Title>{product?.name || 'add modal'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Label>product category</Form.Label>
                                    <Dropdown className="m-1">
                                        <Dropdown.Toggle 
                                            variant='secondary' 
                                            className="
                                                btn-dropdown 
                                                w-100 
                                                d-flex 
                                                justify-content-between 
                                                align-items-center
                                            "
                                            disabled={ isEditing ? true : false }
                                        >
                                            {category?.name || 'no category'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='w-100'>
                                            {
                                                allCategories ?
                                                    allCategories.map((category) => (
                                                        <Dropdown.Item
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category?.name}
                                                        </Dropdown.Item>
                                                    ))
                                                    :
                                                    ''
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Accordion>
                                        <Accordion.Item eventKey='1'>
                                            <Accordion.Header>
                                                Basic product data
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group >
                                                    <Form.Label>name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.name}
                                                        id='name'
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>brand</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.brand}
                                                        id='brand'
                                                        onChange={(e) => setBrand(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>detail</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.detail}
                                                        id='detail'
                                                        onChange={(e) => setDetail(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        defaultValue={product?.price}
                                                        id='price'
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey='2'>
                                            <Accordion.Header>
                                                product image
                                            </Accordion.Header>
                                            <Accordion.Body className='d-flex flex-column align-items-center'>
                                                <img
                                                    src={image}
                                                    alt={'image of' + product?.name}
                                                    className='product-image mb-3'
                                                />
                                                <Button onClick={handleClick}>Change image</Button>
                                                <input
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    onChange={handleUploadImg}
                                                    style={{ display: 'none' }}
                                                    onClick={handleUploadImg}
                                                >
                                                </input>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey='3'>
                                            <Accordion.Header>
                                                ingredients
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group >
                                                    <ul>
                                                        {
                                                            ingredientsList?.map((ingredient) => (
                                                                <li>
                                                                    {ingredient?.name}
                                                                    <Button
                                                                        variant='danger'
                                                                        onClick={() => removeIngredientFromList(ingredient)}
                                                                    >
                                                                        x
                                                                    </Button>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Form.Group>
                                                <Dropdown className="m-1">
                                                    <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                                        Add ingredient
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            ingredientsToAdd?.map((ingredient) => (
                                                                <Dropdown.Item
                                                                    onClick={() => setIngredientsList(current => [...current, ingredient])}
                                                                    className='w-100'
                                                                >
                                                                    {ingredient?.name}
                                                                </Dropdown.Item>
                                                            ))
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    {
                                        isEditing
                                            ? <Button variant="success" onClick={() => handleEditModal(product?.category?.name, product?._id)}>Edit Product</Button>
                                            : <Button variant="success" onClick={handleAddModal}>Add product</Button>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShow(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </div>
                }
            </Modal>
        </>
    )
}

export default AddEditProductModal