import '../admin.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { Table, Button, Dropdown, Alert } from 'react-bootstrap';
import axios from '../../../../api/axios';

import UserX from '../../../../assets/icons/UserX';
import Loading from '../../../loading/Loading';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [usersToShow, setUsersToShow] = useState([]);
  const [roles, setRoles] = useState([]);

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleGetData = async () => {
    setIsLoading(true);
    await handleGetUsers();
    await handleGetRoles();
    setIsLoading(false);
  };

  const handleGetUsers = async () => {
    try {
      const { data } = await axios.get('/user/all');
      setUsersToShow(data?.users);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleGetRoles = async () => {
    try {
      const { data } = await axios.get('/role/');
      setRoles(data?.roles);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setIsLoading(true);
      await axios.patch(`/user/delete/${id}`);
      await handleGetUsers();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editRole = async (id, roleId) => {
    try {
      setIsLoading(true);
      await axios.patch(`/user/${id}`, { role: roleId });
      await handleGetUsers();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const dateFormatter = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  };

  return (
    <div className={darkMode ? 'abm-container-dark' : 'abm-container'}>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <div>
              {
                errorMessage &&
                                <Alert variant="danger">{errorMessage}</Alert>
              }
              <div className="overflow-table-container">
                <Table className="table-container" size="sm">
                  <thead>
                    <tr>
                      <th>role</th>
                      <th>username</th>
                      <th>email</th>
                      <th>member since</th>
                      <th>options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      usersToShow?.map((user, index) => (
                        <tr key={index}>
                          <td>
                            <Dropdown className="m-1">
                              <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                {user.role?.name}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {
                                  roles ?
                                    roles.map((role, index) => (
                                      <Dropdown.Item
                                        onClick={() => editRole(user?._id, role?._id)}
                                        key={index}
                                      >
                                        {role?.name}
                                      </Dropdown.Item>
                                    ))
                                    :
                                    ''
                                }
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{dateFormatter(user.createdAt)}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handleDeleteUser(user._id)
                              }
                              variant='danger'
                              className="btn-User"
                            >
                              <UserX />
                            </Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default Users;
