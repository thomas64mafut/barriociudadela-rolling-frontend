import './roles.css'
import '../admin.css'
import React, { useState, useEffect } from 'react'
import { Alert, OverlayTrigger, Popover, Button, Form } from 'react-bootstrap'
import axios from '../../../../api/axios'

import X from '../../../../assets/icons/X';
import Plus from '../../../../assets/icons/Plus';

const Roles = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [allRoles, setAllRoles] = useState([]);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        handleGetRoles();
    }, [])

    const handleGetRoles = async () => {
        try {
            const { data } = await axios.get('/role/');
            setAllRoles(data?.roles);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
    }

    const handleCreateNewRole = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/role/add', { name: newRole });
            setShow(false);
            setNewRole('');
            handleGetRoles();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
    }

    const handleDeleteRole = async (id) => {
        try {
            await axios.patch(`/role/${id}`, {});
            handleGetRoles();
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
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
            <div className="table-header">
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={addRolePopover}
                    show={show}
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
            {
                errorMessage &&
                <Alert variant="danger">{errorMessage}</Alert>
            }
            <div>
                <ul>
                    {
                        allRoles?.map((role, index) => (
                            <div className='d-flex flex-row justify-content-between' key={index}>
                                <li>{role?.name}</li>
                                <Button
                                    variant='danger'
                                    onClick={() => handleDeleteRole(role?._id)}
                                    className='p-0 mb-1 btn-delete-role'
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

export default Roles
