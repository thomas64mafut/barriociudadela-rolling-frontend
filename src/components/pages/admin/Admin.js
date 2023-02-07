import "./admin.css";
import React, { useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import axios from '../../../api/axios'

import Users from "./users/Users";
import Products from "./products/Products"
import Roles from './roles/Roles';
import Ingredients from './ingredients/Ingredients';

const Admin = () => {
    const [ingredients, setIngredients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGetIngredients = async () => {
        try {
            const { data } = await axios.get('/ingredient');
            setIngredients(data?.ingredients);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        }
    }

    return (
        <>
            <h1 className="abm-container">Admin Control Panel</h1>
            <Tabs
                defaultActiveKey="users"
                id="control-panel"
                className="d-flex flex-column flex-sm-row justify-content-evenly"
            >
                <Tab
                    eventKey="users"
                    title="users"
                >
                    <Users />
                </Tab>
                <Tab
                    eventKey="roles"
                    title="roles"
                >
                    <Roles />
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
