import React from "react";
import "./admin.css";
import Users from './users/Users'
import Products from './products/Products'

const Admin = () => {
    return (
        <>
            <div>
                <Users></Users>
            </div>
            <div>
                <Products></Products>
            </div>
        </>
    );
};

export default Admin;
