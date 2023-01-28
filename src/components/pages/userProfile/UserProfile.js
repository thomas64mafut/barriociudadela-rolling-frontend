import React, { useState, useRef, useEffect } from 'react';
import { Alert, Table } from "react-bootstrap";
import axios from '../../../api/axios';
import "./userProfile.css";

const USER_URL = '/api/user';

const UserProfile = () => {
  const [userToShow, setUserToShow] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const { data } = await axios.get(USER_URL, { headers: { Authorization: token } }) ;
      console.log(data);
      setUserToShow(data?.userFound);
      setProfileImg(data?.userFound?.profilePicture)
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setUserToShow([]);
    }
  };

  const dateFormatter = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  };

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

  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const { data } = await axios.patch(
        USER_URL, { profilePicture: profileImg } , { headers: { Authorization: token } } 
      );
      console.log(data);
    } catch (error) {
      console.log("mori");
    }
  };


  return (
    <div className='main-container row'>
      <div className="users-header">
        <h1>User's Profile</h1>
      </div>
      {errorMessage ? (
          <Alert variant="danger">{errorMessage}</Alert>
      ) : (
          ""
      )}

      <div className="profile-container row">
        <div className='col-lg-6'>
          <div className='flex-grow-1 w-100 d-flex justify-content-around align-items-center'>
            <div className='profile-imgContainer'>
              <img src={profileImg} alt='' />
            </div>
          </div>
          <div className='button-container'>
            <button className='btn-custom my-3'onClick={handleClick}>
              <span className='btn-custom_top'>
                Select Profile Picture
              </span>
            </button>
          </div>
        </div>
        
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleUploadImg}
          style={{ display: 'none' }}
          onClick={handleUploadImg}
        >
        </input>
        
        <div className='col-lg-6'>
          <Table className="table-container">
            <thead>
              <tr>
                <th></th>
                <th>User's Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>role:</td>
                <tr>{userToShow.role?.name}</tr>
              </tr>
              <tr>
                <td>username:</td>
                <td>{userToShow.username}</td>
              </tr>
              <tr>
                <td>email:</td>
                <td>{userToShow.email}</td>
              </tr>
              <tr>
                <td>password:</td>
                <td>{userToShow.password}</td>
              </tr>
              <tr>
                <td>member since:</td>
                <td>{dateFormatter(userToShow.createdAt)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className='button-container'>
          <button className='btn-custom my-3'onClick={handleEditUser}>
            <span className='btn-custom_top'>
              Save Changes
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;