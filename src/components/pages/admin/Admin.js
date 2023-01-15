import "./admin.css";
import React from 'react'

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
