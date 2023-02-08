import "./admin.css";
import React, { useState } from "react";
import { Tabs, Tab, Alert } from 'react-bootstrap';
import axios from "../../../api/axios";

import Users from "./users/Users";
import Products from "./products/Products"
import Roles from './roles/Roles';
import Ingredients from './ingredients/Ingredients';

const Admin = () => {
    const [ingredients, setIngredients] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGetIngredients = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/ingredient');
            setIngredients(data?.ingredients);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/user/all');
            setUsers(data?.users);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetRoles = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/role/');
            setRoles(data?.roles);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        } finally {
            setIsLoading(false);
        }
    }

    const handleGetProducts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/product/');
            setProducts(data?.products);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="abm-container">Admin Control Panel</h1>
            {
                errorMessage &&
                <Alert variant="danger">{errorMessage}</Alert>
            }
            <Tabs
                defaultActiveKey="users"
                id="control-panel"
                className="d-flex flex-column flex-sm-row justify-content-evenly"
                unmountOnExit
            >
                <Tab
                    eventKey="users"
                    title="users"
                >
                    <Users
                        usersToShow={users}
                        handleGetUsers={handleGetUsers}
                        rolesToShow={roles}
                        handleGetRoles={handleGetRoles}
                        isLoading={isLoading}
                        setIsLoading={isLoading}
                    />
                </Tab>
                <Tab
                    eventKey="roles"
                    title="roles"
                >
                    <Roles
                        allRoles={roles}
                        handleGetRoles={handleGetRoles}
                        users={users}
                        handleGetUsers={handleGetUsers}
                        isLoading={isLoading}
                        setIsLoading={isLoading}
                    />
                </Tab>
                <Tab
                    eventKey="products"
                    title="products"
                >
                    <Products
                        productsToShow={products}
                        handleGetProducts={handleGetProducts}
                        ingredients={ingredients}
                        handleGetIngredients={handleGetIngredients}
                        isLoading={isLoading}
                        setIsLoading={isLoading}
                    />
                </Tab>
                <Tab
                    eventKey="ingredients"
                    title="ingredients"
                >
                    <Ingredients
                        allIngredients={ingredients}
                        handleGetIngredients={handleGetIngredients}
                        products={products}
                        handleGetProducts={handleGetProducts}
                        isLoading={isLoading}
                        setIsLoading={isLoading}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

export default Admin;
