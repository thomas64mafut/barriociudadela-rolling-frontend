import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./admin.css";

const Admin = () => {
  const [usersToShow, setUsersToShow] = useState([])

  useEffect(() => {
    handleGetUsers();
  }, [])
  
  const handleGetUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/user/')      
      setUsersToShow(data?.users);
    } catch (error) {
      console.log('mori'); 
    }
  }

  return (
    <>
      <div className="abm-container">
          <Table className="table-container">
            <thead>
              <tr>
                <th>role</th>
                <th>username</th>
                <th>email</th>
                <th>member since</th>
              </tr>
            </thead>
            <tbody>
              {
                usersToShow?.map((user) => (
                    <tr>
                      <td>{user.role?.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{Date(user.createdAt).toLocaleLowerCase().slice(0,24)}</td>
                    </tr>  
                ))
              }
            </tbody>
          </Table>
        </div>
    </>
  );
};

export default Admin;
