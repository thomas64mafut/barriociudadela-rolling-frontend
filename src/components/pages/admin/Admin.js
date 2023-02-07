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
    const [errorMessage, setErrorMessage] = useState('');

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient');
            setIngredients(data?.ingredients);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        }
    }

    const handleGetUsers = async () => {
        try {
            const { data } = await axios.get('/user/all');
            setUsers(data?.users);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setUsers([]);
        }
    };

    const handleGetRoles = async () => {
        try {
            const { data } = await axios.get('/role/');
            setRoles(data?.roles);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
    }

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
                        handleGetUsers={handleGetUsers}
                        usersToShow={users}
                        rolesToShow={roles}
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
                    />
                </Tab>
                <Tab
                    eventKey="products"
                    title="products"
                >
                    <Products
                        ingredients={ingredients}
                        handleGetIngredients={handleGetIngredients}
                    />
                </Tab>
                <Tab
                    eventKey="ingredients"
                    title="ingredients"
                >
                    <Ingredients
                        allIngredients={ingredients}
                        handleGetIngredients={handleGetIngredients}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

export default Admin;
