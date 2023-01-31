import React from "react";
import "./admin.css";
import Users from "./users/Users";
import Products from "./products/Products"
import Roles from './roles/Roles';
import Ingredients from './ingredients/Ingredients';

const Admin = () => {
    return (
        <>
            <div>
                <Users></Users>
            </div>
            <div>
                <Products></Products>
            </div>
            <div>
                <Roles></Roles>
            </div>
            <div>
                <Ingredients></Ingredients>
            </div>
        </>
    );
};

export default Admin;
