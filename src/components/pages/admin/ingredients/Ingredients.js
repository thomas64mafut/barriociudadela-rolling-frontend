import '../admin.css';
import './ingredients.css';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { Alert, OverlayTrigger, Popover, Button, Form, Tooltip, Spinner } from 'react-bootstrap';
import axios from '../../../../api/axios';

import X from '../../../../assets/icons/X';
import Plus from '../../../../assets/icons/Plus';
import Loading from '../../../loading/Loading';

const Ingredients = (props) => {
    const {
        allIngredients,
        handleGetIngredients,
    } = props;

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    const [newPrice, setNewPrice] = useState(0);
    const [categoryToAdd, setCategoryToAdd] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');

    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        handleGetData();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('')
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorMessage])

    const handleGetData = async () => {
        setIsLoading(true);
        await handleGetCategories();
        await handleGetIngredients();
        await handleGetProducts();
        setIsLoading(false);
    };

    const handleGetProducts = async () => {
        try {
            const { data } = await axios.get('/product/');
            setAllProducts(data?.products);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient');
            setAllIngredients(data?.ingredients);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        }
    }

    const handleGetCategories = async () => {
        try {
            const { data } = await axios.get('/category/');
            setAllCategories(data?.categories);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        }
    }

    const handleCreateNewIngredient = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const payload = {
                name: newIngredient,
                price: newPrice,
                category: categoryToAdd,
            };
            await axios.post('/ingredient/add', payload);
            setShow(false);
            setNewIngredient('');
            await handleGetIngredients();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddCategories = (bool, category) => {
        if (bool) {
            setCategoryToAdd(current => [...current, category]);
        } else {
            let index = categoryToAdd.indexOf(category);
            if (index > -1) {
                const newCategoryToAdd = categoryToAdd;
                newCategoryToAdd.splice(index, 1);
                setCategoryToAdd(newCategoryToAdd);
            }
        }
    }

    const handleDeleteIngredient = async (id) => {
        try {
            setIsLoading(true);
            const productsWithIngredient = allProducts?.filter(product => {
                if(product.category.name !== 'drink'){
                    const ingredientInProduct = product?.ingredients?.filter(ingredient => ingredient._id === id);
                    if (ingredientInProduct.length !== 0) return product;
                }
                return false;
            })
            if (productsWithIngredient.length !== 0) {
                throw new Error('There is an existing product with this ingredient, please either modify it or delete it before trying this modification again.');
            }
            await axios.patch(`/ingredient/${id}`, {});
            await handleGetIngredients();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const addIngredientPopover = (
        <Popover id='popover-basic'>
            <Popover.Header as='h3' className='add-ingredient-popover'>add ingredient</Popover.Header>
            <Popover.Body className='add-ingredient-popover'>
                <Form onSubmit={handleCreateNewIngredient}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            required
                            placeholder='ingredient name'
                            onChange={(e) => setNewIngredient(e.target.value)}
                            className='mb-1'
                        />
                        <Form.Control
                            type='number'
                            required
                            placeholder={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className='mb-2'
                        />
                    </Form.Group>
                    <ul className='m-0'>
                        {
                            allCategories?.map((category, index) => (
                                <div key={index}>
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
                        className='mt-3 w-100'
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
                    ingredient?.category.map((categoryName, index) => (
                        <span key={index}> - {categoryName}</span>
                    ))
                }
            </div>
        </Tooltip>
    );

    return (
        <div className={ darkMode ? "abm-container-dark" : "abm-container" }>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <div>

                            {
                                errorMessage &&
                                <Alert variant='danger'>{errorMessage}</Alert>
                            }
                            <div className='table-header'>
                                <OverlayTrigger
                                    trigger='click'
                                    placement='bottom'
                                    overlay={addIngredientPopover}
                                    rootCloseEvent="mousedown"
                                    rootClose={true}
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
                            <div>
                                <ul>
                                    {
                                        allIngredients?.map((ingredient, index) => (
                                            <div className='d-flex flex-row justify-content-between' key={index}>
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
        </div>
    )
}

export default Ingredients 
