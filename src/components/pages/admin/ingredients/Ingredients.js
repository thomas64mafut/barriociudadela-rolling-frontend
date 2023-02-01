import './ingredients.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import { Alert, OverlayTrigger, Popover, Button, Form, Tooltip } from 'react-bootstrap'
import axios from '../../../../api/axios'
import X from '../../../../assets/icons/X';
import Plus from '../../../../assets/icons/Plus';

const Ingredients = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [categoryToAdd, setCategoryToAdd] = useState([])

    useEffect(() => {
        handleGetIngredients();
        handleGetCategories();
    }, [])

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient/');
            console.log(data?.ingredients);
            setAllIngredients(data?.ingredients);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
            console.log('mori', error);
        }
    }

    const handleCreateNewIngredient = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: newIngredient,
                price: newPrice,
                category: categoryToAdd,
            };
            const { data } = await axios.post('/ingredient/add', payload);
            setShow(false);
            setNewIngredient('');
            handleGetIngredients();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
            console.log('mori', error);
        }
    }

    const handleAddCategories = (bool, category) => {
        if (bool) {
            setCategoryToAdd(current => [...current, category]);
        } else {
            let index = categoryToAdd.indexOf(category);
            if (index > -1) {
                const newCategoryToAdd = categoryToAdd
                newCategoryToAdd.splice(index, 1);
                setCategoryToAdd(newCategoryToAdd);
                console.log('hola');
            }
        }
    }

    const handleDeleteIngredient = async (id) => {
        try {
            const { data } = await axios.patch(`/ingredient/${id}`, {});
            handleGetIngredients();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
    }

    const handleGetCategories = async () => {
        try {
            const { data } = await axios.get('/category');
            setAllCategories(data?.categories);
        } catch (error) {
            console.log('mori');
        }
    }

    const addIngredientPopover = (
        <Popover id='popover-basic'>
            <Popover.Header as='h3'>add ingredient</Popover.Header>
            <Popover.Body>
                <Form onSubmit={handleCreateNewIngredient}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            required
                            placeholder='ingredient name'
                            onChange={(e) => setNewIngredient(e.target.value)}
                        />
                        <Form.Control
                            type='number'
                            required
                            placeholder={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                    </Form.Group>
                    <ul>
                        {
                            allCategories?.map((category) => (
                                <div>
                                    {
                                        category?.name !== 'drink' &&
                                        <Form.Check
                                            label={category?.name}
                                            id='checkbox-id'
                                            defaultChecked={false}
                                            onChange={(e) => handleAddCategories(e.target.checked, category?.name)}
                                        />
                                    }
                                </div>
                            ))
                        }
                    </ul>
                    <Button
                        variant='success'
                        type='submit'
                        className='mt-3'
                    >
                        add ingredient
                    </Button>
                </Form>
            </Popover.Body>
        </Popover>
    );

    const ingredientCategoryTooltip = (ingredient) => (
        <Tooltip id='ingredient-category' className='ingredient-class'>
            <div className='p-0 me-4 d-flex flex-column align-items-start'>
                {
                    ingredient?.category.map((categoryName) => (
                        <span > - {categoryName}</span>
                    ))
                }
            </div>
        </Tooltip>
    );

    return (
        <div className='abm-container'>
            <div className='table-header'>
                <h1>Ingredient Control Panel</h1>
                <OverlayTrigger
                    trigger='click'
                    placement='bottom'
                    overlay={addIngredientPopover}
                    show={show}
                >
                    <Button
                        variant='success'
                        onClick={() => setShow(!show)}
                        className='mt-3 p-0 btn-add-role'
                    >
                        <Plus />
                    </Button>
                </OverlayTrigger>
            </div>
            {
                errorMessage &&
                <Alert variant='danger'>{errorMessage}</Alert>
            }
            <div>
                <ul>
                    {
                        allIngredients?.map((ingredient) => (
                            <div className='d-flex flex-row justify-content-between'>
                                <OverlayTrigger
                                    placement='bottom'
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={ingredientCategoryTooltip(ingredient)}
                                >
                                    <li>{ingredient?.name} - $ {ingredient?.price}</li>
                                </OverlayTrigger>
                                <Button
                                    variant='danger'
                                    onClick={() => handleDeleteIngredient(ingredient?._id)}
                                    className='p-0 mb-1 btn-delete-role'
                                >
                                    <X />
                                </Button>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Ingredients 