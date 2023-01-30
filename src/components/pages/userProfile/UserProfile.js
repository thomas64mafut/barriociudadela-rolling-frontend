import React, { useState, useRef, useEffect } from 'react';
import { Alert, Table } from "react-bootstrap";
import axios from '../../../api/axios';
import "./userProfile.css";

const USER_URL = '/user';

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
    <div className='main-container'>
      <div className="users-header">
        <h1>User's Profile</h1>
      </div>
      {errorMessage ? (
          <Alert variant="danger">{errorMessage}</Alert>
      ) : (
          ""
      )}

      <div className="profile-container row">
        <div className='col-md-6'>
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
        
        <div className='data-container col-md-6'>
          <ul>
              <li><h5><b><u>Role:</u></b>   {userToShow.role?.name}</h5></li>
              <li><h5><b><u>Username:</u></b>   {userToShow?.username}</h5></li>
              <li><h5><b><u>Email:</u></b>   {userToShow?.email}</h5></li>
              <li><h5><b><u>Member since:</u></b>   {dateFormatter(userToShow?.createdAt)}</h5></li>
          </ul>
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