import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import "./admin.css";

const Admin = (props) => {
    const authProvider = useOutletContext();
    console.log(authProvider, 'admin');
    const [usersToShow, setUsersToShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        handleGetUsers();
    }, []);

    const handleGetUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/user/");
            console.log(data);
            setUsersToShow(data?.users);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setUsersToShow([]);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const { data } = await axios.patch(
                `http://localhost:4000/api/user/${id}`
            );
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

    return (
        <>
            <div className="abm-container">
                <div className="users-header">
                    <h1>User Control Panel</h1>
                    <Button onClick={handleGetUsers}>Add User</Button>
                </div>
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : (
                    ""
                )}
                <Table className="table-container">
                    <thead>
                        <tr>
                            <th>role</th>
                            <th>username</th>
                            <th>email</th>
                            <th>member since</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersToShow?.map((user) => (
                            <tr>
                                <td>{user.role?.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{dateFormatter(user.createdAt)}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                    >
                                        x
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default Admin;
