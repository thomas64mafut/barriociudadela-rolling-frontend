import './admin.css';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Tabs, Tab } from 'react-bootstrap';

import Users from './users/Users';
import Products from './products/Products';
import Roles from './roles/Roles';
import Ingredients from './ingredients/Ingredients';

const Admin = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <h1 className={ darkMode ? 'abm-container-dark' : 'abm-container' }>Admin Control Panel</h1>
      <Tabs
        defaultActiveKey="users"
        id="control-panel"
        className="d-flex flex-column flex-sm-row justify-content-evenly h-100"
        unmountOnExit
      >
        <Tab
          eventKey="users"
          title="users"
        >
          <Users className={ darkMode ? 'active-dark' : 'active' } />
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
          <Products />
        </Tab>
        <Tab
          eventKey="ingredients"
          title="ingredients"
        >
          <Ingredients />
        </Tab>
      </Tabs>
    </>
  );
};

export default Admin;
