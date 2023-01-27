import React from 'react'
import axios from '../../../../../api/axios'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const EditProductModal = (props) => {
    const {
        show,
        setShow,
        product,
    } = props;

    const [ingredientsList, setIngredientsList] = useState([])
    const [ingredientsToAdd, setIngredientsToAdd] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIngredientsList(product?.ingredients ? product?.ingredients : []);
    }, [show === true])

    useEffect(() => {
        console.log(ingredientsList);
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

    return (
        <>
            <Modal centered show={show} onHide={() => setShow(false)}>
                {
                    isLoading ?
                        <h1>Loading</h1>
                        :
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>{product?.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="form-group-id">
                                        <Form.Label>category</Form.Label>
                                        <Form.Control type="text" defaultValue={product?.category} />
                                    </Form.Group>
                                    <Form.Group controlId="form-group-id">
                                        <Form.Label>name</Form.Label>
                                        <Form.Control type="text" defaultValue={product?.name} />
                                    </Form.Group>
                                    <Form.Group controlId="form-group-id">
                                        <Form.Label>brand</Form.Label>
                                        <Form.Control type="text" defaultValue={product?.brand} />
                                    </Form.Group>
                                    <Form.Group controlId="form-group-id">
                                        <Form.Label>price</Form.Label>
                                        <Form.Control type="number" defaultValue={product?.price} />
                                    </Form.Group>
                                    {
                                        ingredientsList.length === 0 ?
                                            <p>no hay nada culiao andate</p>
                                            :
                                            <div>
                                                <Form.Group controlId="form-group-id">
                                                    <Form.Label>Ingredients</Form.Label>
                                                    <ul>
                                                        {
                                                            ingredientsList?.map((ingredient) => (
                                                                <li>{ingredient?.name}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                    <Dropdown className="m-1">
                                                        <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                                            Add ingredient
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                                ingredientsToAdd?.map((ingredient) => (
                                                                    <Dropdown.Item
                                                                        onClick={() => addIngredientToList(ingredient)}
                                                                    >
                                                                        {ingredient?.name}
                                                                    </Dropdown.Item>
                                                                ))
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Form.Group>
                                            </div>
                                    }
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShow(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </div>
                }
            </Modal>
        </>
    )
}

export default EditProductModal