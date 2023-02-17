import './modal.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../../../api/axios';
import { Modal, Button, Form, Dropdown, Accordion } from 'react-bootstrap';

import X from '../../../../../assets/icons/X';
import Plus from '../../../../../assets/icons/Plus';

const AddEditProductModal = (props) => {
    const {
        show,
        setShow,
        product,
        categoryToAdd,
        isEditing,
        handleGetData,
        allIngredients,
        getAllIngredients,
    } = props;

    const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [isVegan, setIsVegan] = useState(false);
    const [hasAlcohol, setHasAlcohol] = useState(false);
    const [image, setImage] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        getAllIngredients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        handleSetProductToEdit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        getFilteredIngredients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientsList]);

    const handleSetProductToEdit = () => {
        setCategory(product?.category);
        setName(product?.name);
        setDetail(product?.detail);
        setPrice(product?.price);
        setBrand(product?.brand);
        setIsVegan(product?.isVegan);
        setHasAlcohol(product?.hasAlcohol);
        setImage(product?.image);
        if (product?.ingredients) {
            if (typeof (product?.ingredients[0]) === 'string') {
                let ingredientsFound = [];
                allIngredients.forEach((ingredient) => (
                    product?.ingredients.forEach(ingredientId => {
                        if (ingredientId === ingredient._id) {
                            ingredientsFound.push(ingredient);
                        }
                    })
                ))
                setIngredientsList(ingredientsFound);
            } else setIngredientsList(product?.ingredients);
        }
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
        });

        let secondFilteredIngredients = [];
        filteredIngredients.forEach((ingredient) => {
            ingredient.category.forEach((category) => {
                if (category === categoryToAdd?.name) {
                    secondFilteredIngredients.push(ingredient)
                }
            })
        })
        setIngredientsToAdd(secondFilteredIngredients);
    }


    const removeIngredientFromList = (ingredientToRemove) => {
        const newIngredientList = ingredientsList.filter((ingredient) => {
            return ingredient !== ingredientToRemove;
        });
        setIngredientsList(newIngredientList);
    }

    const handleAddModal = async () => {
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
        await axios.post(`/product/${category?.name}`, payload);
        handleGetData();
        setShow(false);
    };

    const handleEditModal = async (productCategory, productId) => {
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
        await axios.put(`/product/${productCategory}/${productId}`, payload);
        handleGetData();
        setShow(false);
    };

    return (
        <>
            <Modal centered show={show} onHide={() => setShow(false)}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{product?.name || 'add product'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='p-2'>
                        <Form.Label className='mt-2 mb-3 text-center'>Category: {category?.name}</Form.Label>
                        <Accordion>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header >
                                    Basic product data
                                </Accordion.Header>
                                <Accordion.Body className='p-2'>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={product?.name}
                                            id='name'
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
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
                                        <Form.Group className='mb-3'>
                                            <Form.Label>brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={product?.brand}
                                                id='brand'
                                                onChange={(e) => setBrand(e.target.value)}
                                            />
                                        </Form.Group>
                                    }
                                    <Form.Group className='mb-3'>
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
                                                <Form.Group className='mb-3'>
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
                                                <Form.Group className='mb-3'>
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
                                    {
                                        image &&
                                        <img
                                            src={image}
                                            alt={'image of' + product?.name}
                                            className='product-image my-3'
                                        />
                                    }
                                    <Button onClick={handleClick}>
                                        {
                                            image ? (
                                                'Change image'
                                            ) : (
                                                'Add image'
                                            )
                                        }
                                    </Button>
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
                                    <Accordion.Body className='p-1'>
                                        <Form.Group >
                                            <ul className='ps-1 mt-3 m-0 ingredients-modal-list'>
                                                {
                                                    ingredientsList?.map((ingredient) => (
                                                        <div className='d-flex flex-row justify-content-between ingredient-item'>
                                                            <li>
                                                                {ingredient?.name}
                                                            </li>
                                                            <Button
                                                                variant='danger'
                                                                onClick={() => removeIngredientFromList(ingredient)}
                                                                className='ingredient-delete-button p-0'
                                                            >
                                                                <X />
                                                            </Button>
                                                        </div>
                                                    ))
                                                }
                                            </ul>
                                        </Form.Group>
                                        <Dropdown className="m-1 d-flex justify-content-end">
                                            <Dropdown.Toggle variant='danger' className="btn-dropdown px-2 d-flex justify-content-between">
                                                <Plus />
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
                    <Modal.Footer className='d-flex justify-content-center'>
                        {
                            isEditing
                                ? (
                                    <Button variant="success" onClick={() => handleEditModal(product?.category?.name, product?._id)}>Edit Product</Button>
                                ) : (
                                    <Button variant="success" onClick={handleAddModal}>Add product</Button>
                                )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddEditProductModal;
