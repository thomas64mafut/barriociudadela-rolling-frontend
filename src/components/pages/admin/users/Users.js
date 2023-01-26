import "../admin.css";
import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Dropdown } from "react-bootstrap";
import axios from "../../../../api/axios";
import UserPlus from '../../../../assets/icons/light/UserPlus';
import UserX from '../../../../assets/icons/light/UserX';

const Users = () => {
    const [usersToShow, setUsersToShow] = useState([]);
    const [rolesToShow, setRolesToShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        handleGetUsers();
        getRoles();
    }, []);

    const handleGetUsers = async () => {
        try {
            const { data } = await axios.get('/user/all');
            setUsersToShow(data?.users);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setUsersToShow([]);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const { data } = await axios.patch(`/user/delete/${id}`);
            console.log(data);
            handleGetUsers();
        } catch (error) {
            console.log("mori");
        }
    };

    const dateFormatter = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toDateString();
    };

    const getRoles = async () => {
        try {
            const { data } = await axios.get('/role');
            setRolesToShow(data.roles);
        } catch (error) {
            console.log('mori');
        }
    }

    const editRole = async (id, roleId) => {
        try {
            const { data } = await axios.patch(`/user/${id}`, { role: roleId });
            console.log(data);
        } catch (error) {
            console.log('mori');
        }
    }

    return (
        <>
            <div className="abm-container">
                <div className="table-header">
                    <h1>User Control Panel</h1>
                    <Button onClick={handleGetUsers} variant='success'>
                        <UserPlus />
                    </Button>
                </div>
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : (
                    ""
                )}
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
                            {usersToShow?.map((user) => (
                                <tr>
                                    <td>
                                        <Dropdown className="m-2">
                                            <Dropdown.Toggle variant='danger' className="btn-dropdown">
                                                {user.role?.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    rolesToShow ?
                                                        rolesToShow.map((role) => (
                                                            <Dropdown.Item
                                                                onClick={() => editRole(user?._id, role?._id)}
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
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Users