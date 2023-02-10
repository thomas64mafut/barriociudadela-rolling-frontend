import './roles.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import { Alert, OverlayTrigger, Popover, Button, Form, Spinner } from 'react-bootstrap'
import axios from '../../../../api/axios'

import X from '../../../../assets/icons/X';
import Plus from '../../../../assets/icons/Plus';
import Loading from '../../../loading/Loading';

const Roles = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const [rolesToShow, setRolesToShow] = useState([]);
    const [users, setUsers] = useState([]);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        handleGetData();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('')
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorMessage])


    const handleGetData = async () => {
        setIsLoading(true);
        await handleGetRoles();
        await handleGetUsers();
        setIsLoading(false);
    };

    const handleGetRoles = async () => {
        try {
            const { data } = await axios.get('/role/');
            setRolesToShow(data?.roles);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
    }

    const handleGetUsers = async () => {
        try {
            const { data } = await axios.get('/user/all');
            setUsers(data?.users);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleCreateNewRole = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.post('/role/add', { name: newRole });
            setShow(false);
            setNewRole('');
            await handleGetRoles();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteRole = async (id) => {
        try {
            setIsLoading(true);
            const usersWithRole = users?.filter((user) => user?.role?._id === id);
            if (usersWithRole.length !== 0) {
                throw new Error('There are existing users with this role, please modify them or delete them before trying this modification again.')
            }
            await axios.patch(`/role/${id}`, {});
            await handleGetRoles();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const addRolePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">add role</Popover.Header>
            <Popover.Body>
                <Form onSubmit={handleCreateNewRole}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            required
                            placeholder="role"
                            onChange={(e) => setNewRole(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        variant='success'
                        type='submit'
                        className='mt-3'
                    >
                        add role
                    </Button>
                </Form>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='abm-container'>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <div>

                            {
                                errorMessage &&
                                <Alert variant="danger" className='m-0'>{errorMessage}</Alert>
                            }

                            <div className="table-header">
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    overlay={addRolePopover}
                                    rootCloseEvent="mousedown"
                                    rootClose={true}
                                >
                                    <Button
                                        variant="success"
                                        onClick={() => setShow(!show)}
                                        className='mt-3 p-0 btn-add-role'
                                    >
                                        <Plus />
                                    </Button>
                                </OverlayTrigger>
                            </div>
                            <div>
                                <ul>
                                    {
                                        rolesToShow?.map((role, index) => (
                                            <div className='d-flex flex-row justify-content-between' key={index}>
                                                <li>{role?.name}</li>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => handleDeleteRole(role?._id)}
                                                    className='p-0 mb-1 btn-delete-role'
                                                    disabled={
                                                        role?.name === 'user' || role?.name === 'admin'
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Roles
