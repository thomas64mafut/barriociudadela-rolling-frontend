import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, Table } from "react-bootstrap";
import axios from '../../../api/axios';
import "./userProfile.css";
import "../admin/admin.css";

const USER_URL = '/api/user';

const UserProfile = () => {
  const [userToShow, setUserToShow] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const { data } = await axios.get(USER_URL);
      console.log(data);
      setUserToShow(data?.user);
    } catch (error) {
      console.log(error.response.data.message);
      setUserToShow([]);
    }
  };

  const dateFormatter = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  };
    
  //LOGICA DE FOTO DE PERFIL

  const [profileImg, setProfileImg] = useState('');

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleUploadImg = async (e) => {
    const fileUploaded = e.target.files[0];
    e.target.value = '';
    beforeUpload(fileUploaded);
    const base64 = await getBase64(fileUploaded);
    console.log(base64);
    setProfileImg(base64);
  };

  const getBase64 = (img) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(img);
    });
  };

  const beforeUpload = (file) => {
    const isJpegOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpegOrPng) {
      alert('Solo se admiten archivos png o jpeg.');
      return;
    }
  };
    
  //


  const handleEditUser = async (id) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:4000/api/user/${id}`
      );
      console.log(data);
      handleGetUser();
    } catch (error) {
      console.log("mori");
    }
  };


  return (
    <>
      <div className="users-header">
        <h1>User's Profile</h1>
      </div>
      {errorMessage ? (
          <Alert variant="danger">{errorMessage}</Alert>
      ) : (
          ""
      )}

      <div className='profile_container'>
        <div className='flex-grow-1 w-100 d-flex justify-content-around align-items-center'>
          <div className='Profile_imgContainer'>
            <img src={profileImg} alt='' />
          </div>
        </div>
        <div className='button_container'>
          <button className='btn-custom my-4'onClick={handleClick}>
            <span className='btn-custom_top'>
              Select Profile Picture
            </span>
          </button>
        </div>
        
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleUploadImg}
          style={{ display: 'none' }}
          onClick={handleUploadImg}
        >
        </input>


        <Table className="table-container">
          <thead>
            <tr>
              <th>role</th>
              <th>username</th>
              <th>email</th>
              <th>password</th>
              <th>member since</th>
            </tr>
          </thead>
          <tbody>
            {userToShow?.map((user) => (
              <tr>
                <td>{user.role?.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.createdAt}</td>
                  <Button onClick={() => handleEditUser(user._id)}>
                    Listo
                  </Button>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='button_container'>
          <button className='btn-custom my-4'onClick={handleEditUser}>
            <span className='btn-custom_top'>
              Save Changes
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default UserProfile;