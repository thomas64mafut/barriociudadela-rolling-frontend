import "./userProfile.css";
import React, { useState, useRef, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';
import axios from '../../../api/axios';

const USER_URL = '/user';

const UserProfile = (props) => {
    const { auth, setAuth } = useOutletContext();
    const [userToShow, setUserToShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleGetUser = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const { data } = await axios.get(USER_URL, { headers: { Authorization: token } });
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
            const { data } = await axios.patch('/user', { profilePicture: profileImg });
            window.location.replace('/profile');
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
                <div className='col-md-6 p-0'>
                    <div className='flex-grow-1 w-100 d-flex justify-content-center align-items-center'>
                        <div className='profile-imgContainer'>
                            <img src={profileImg} alt='' />
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='btn-custom my-3' onClick={handleClick}>
                            <span className='btn-custom_top'>
                                select profile picture
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
                        <li><h5><b><u>Role:</u></b>   {auth?.role}</h5></li>
                        <li><h5><b><u>Username:</u></b>   {userToShow?.username}</h5></li>
                        <li><h5><b><u>Email:</u></b>   {userToShow?.email}</h5></li>
                        <li><h5><b><u>Member since:</u></b>   {dateFormatter(userToShow?.createdAt)}</h5></li>
                    </ul>
                </div>
                <div className='button-container'>
                    <button className='btn-custom my-3' onClick={handleEditUser}>
                        <span className='btn-custom_top'>
                            save changes
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
