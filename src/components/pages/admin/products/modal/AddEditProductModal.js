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
        categoryToAdd,
        isEditing,
    } = props;

    const [ingredientsToAdd, setIngredientsToAdd] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [category, setCategory] = useState('')
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [isVegan, setIsVegan] = useState(false)
    const [hasAlcohol, setHasAlcohol] = useState(false)
    const [image, setImage] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        getAllIngredients();
        getCategories();
    }, [])

    useEffect(() => {
        if (isEditing) {
            handleSetProductToEdit();
            console.log(product);
        } else {
            setCategory(categoryToAdd);
            setName('');
            setDetail('');
            setPrice('');
            setBrand('');
            setIsVegan(false);
            setHasAlcohol(false);
            setImage('');
            setIngredientsList([])
            setIngredientsToAdd(allIngredients);
        }
    }, [show]);

    useEffect(() => {
        getFilteredIngredients();
        setIsLoading(false);
    }, [ingredientsList]);

    const handleSetProductToEdit = () => {
        const categoryFound = allCategories.find(category => category._id === product?.category._id)
        setCategory(categoryFound);
        setName(product?.name);
        setDetail(product?.detail);
        setPrice(product?.price);
        setBrand(product?.brand);
        setIsVegan(product?.isVegan);
        setHasAlcohol(product?.hasAlcohol);
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
                detail: detail,
                price: price,
                brand: brand,
                isVegan: isVegan,
                hasAlcohol: hasAlcohol,
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
                detail: detail,
                price: price,
                brand: brand,
                isVegan: isVegan,
                hasAlcohol: hasAlcohol,
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
                                    <Modal.Title>{product?.name || 'add product'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Label>product category: {category?.name}</Form.Label>
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
                                                    <Form.Label>detail</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.detail}
                                                        id='detail'
                                                        onChange={(e) => setDetail(e.target.value)}
                                                    />
                                                </Form.Group>
                                                {
                                                    category?.name === 'drink' &&
                                                    <Form.Group>
                                                        <Form.Label>brand</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={product?.brand}
                                                            id='brand'
                                                            onChange={(e) => setBrand(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                }
                                                <Form.Group>
                                                    <Form.Label>price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        defaultValue={product?.price}
                                                        id='price'
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </Form.Group>
                                                {
                                                    category?.name !== 'drink' ?
                                                        (
                                                            <Form.Group >
                                                                <Form.Check
                                                                    label="is this product vegan?"
                                                                    id="checkbox-id"
                                                                    onChange={(e) => setIsVegan(e?.target?.checked)}
                                                                    defaultChecked={
                                                                        product?.isVegan ? (
                                                                            true
                                                                        ) : (
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>
                                                        ) : (
                                                            <Form.Group >
                                                                <Form.Check
                                                                    label="does it has alcohol?"
                                                                    id="checkbox-id"
                                                                    onChange={(e) => setHasAlcohol(e?.target?.checked)}
                                                                    defaultChecked={
                                                                        product?.hasAlcohol ? (
                                                                            true
                                                                        ) : (
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>
                                                        )
                                                }
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
                                        {
                                            category?.name !== 'drink' &&
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
                                        }
                                    </Accordion>
                                </Modal.Body>
                                <Modal.Footer>
                                    {
                                        isEditing
                                            ? (
                                                <Button variant="success" onClick={() => handleEditModal(product?.category?.name, product?._id)}>Edit Product</Button>
                                            ) : (
                                                <Button variant="success" onClick={handleAddModal}>Add product</Button>
                                            )
                                    }
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