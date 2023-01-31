import React from "react";
import "./admin.css";
import Users from "./users/Users";
import Products from "./products/Products"
import Roles from './roles/Roles';

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
        </>
    );
};

export default Admin;
