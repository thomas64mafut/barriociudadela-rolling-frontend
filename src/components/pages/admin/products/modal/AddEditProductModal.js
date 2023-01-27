import React from 'react'
import axios from '../../../../../api/axios'
import { Modal, Button, Form, Dropdown, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const AddEditProductModal = (props) => {
    const {
        show,
        setShow,
        product,
        setProduct,
    } = props;

    const [ingredientsList, setIngredientsList] = useState([])
    const [ingredientsToAdd, setIngredientsToAdd] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(true)

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (Object.keys(product).length === 0) setIsEditing(false);
        setIngredientsList(product?.ingredients ? product?.ingredients : []);
    }, [show === true])

    useEffect(() => {
        getFilteredIngredients();
        setIsLoading(false);
    }, [ingredientsList])


    const getFilteredIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient');
            const allIngredients = data?.ingredients;
            const filteredIngredients = allIngredients.filter((ingredient) => !ingredientsList.includes(ingredient));
            setIngredientsToAdd(filteredIngredients)
        } catch (error) {
            console.log(error);
        }
    }

    const addIngredientToList = (ingredient) => {
        let newIngredientsList = ingredientsList;

        newIngredientsList.push(ingredient);
        setIngredientsList(newIngredientsList);
    }

    const handleAddEditModal = () => {
        console.log(name, brand, price);
    }

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
                                    <Accordion>
                                        <Accordion.Item eventKey='1'>
                                            <Accordion.Header>
                                                Basic product data
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group controlId="form-group-id">
                                                    <Form.Label>category</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.category}
                                                        id='category'
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="form-group-id">
                                                    <Form.Label>name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.name}
                                                        id='name'
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="form-group-id">
                                                    <Form.Label>brand</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={product?.brand}
                                                        id='brand'
                                                        onChange={(e) => setBrand(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="form-group-id">
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
                                                    src={product?.image}
                                                    alt={'image of' + product?.name}
                                                    className='product-image mb-3'
                                                />
                                                <Button>Change image</Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {
                                            ingredientsList.length === 0 ?
                                                <p>no hay nada culiao andate</p>
                                                :
                                                <Accordion.Item eventKey='3'>
                                                    <Accordion.Header>
                                                        ingredients
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Form.Group controlId="form-group-id">
                                                            <ul>
                                                                {
                                                                    ingredientsList?.map((ingredient) => (
                                                                        <li>{ingredient?.name}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </Form.Group>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                        }
                                    </Accordion>
                                    <Dropdown className="m-1">
                                        <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                            Add ingredient
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                ingredientsToAdd?.map((ingredient) => (
                                                    <Dropdown.Item
                                                        onClick={() => addIngredientToList(ingredient)}
                                                        className='w-100'
                                                    >
                                                        {ingredient?.name}
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button variant="success" onClick={handleAddEditModal}>
                                        Submit
                                    </Button>
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