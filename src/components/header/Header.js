import './header.css'
import React, { useState, useEffect } from 'react'
import { Navbar, Tooltip, OverlayTrigger, InputGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo-red.png'
import axios from '../../api/axios'
import Cart from '../../assets/icons/Cart'

const Header = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    const [userToShow, setUserToShow] = useState({});
    const [userRole, setUserRole] = useState('');
    const [cartTotalPrice, setCartTotalPrice] = useState('');
    const [profileImg, setProfileImg] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('jwt')
        if (token) {
            setToken(token)
            handleGetUser();
            handleGetCart();
        } else setToken('')
    }, []);

    useEffect(() => {
        if (token) {
            getAuthStatus();
        }
    }, [userToShow])


    const handleGetUser = async () => {
        try {
            const { data } = await axios.get('/user');
            setUserToShow(data?.userFound);
            setProfileImg(data?.userFound?.profilePicture)
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setUserToShow([]);
        }
    };

    const getAuthStatus = async () => {
        try {
            const { data } = await axios.get('/user/status');
            setUserRole(data?.role)
        } catch (error) {
            alert(error.response?.data?.message);
        }
    }

    const handleLogOut = () => {
        sessionStorage.clear();
        window.location.replace('/')
    }

    const showCart = () => {
        navigate('/myCarts')
    }

    const showUserProfile = () => {
        navigate('/profile')
    }

    const handleGetCart = async () => {
        try {
            const { data } = await axios('/cart');
            let totalPrice = 0;
            const activeCart = data?.ownCarts?.find(cart => cart.cartStatus === 'active')
            for (const product of activeCart.products) {
                totalPrice = totalPrice + (product?.price * product?.quantity)
            }
            setCartTotalPrice(totalPrice)
        } catch (error) {
            console.log(error)
        }
    }

    const cartPriceTooltip = (
        <Tooltip id="cart-price">
            <span>total: ${cartTotalPrice}</span>
        </Tooltip>
    );

    return (
        <Navbar className='navContainer m-0' expand="lg">
            <Navbar.Brand href="#">
                <Link to={'/'}>
                    <img className='logoa' src={logo} alt='' />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" className='me-2 p-0 border-0 ' />
            <Navbar.Collapse id="navbarScroll">
                <div className="w-100 h-100 d-flex flex-lg-row flex-column justify-content-between navbar-complete" >
                    <div className='d-flex flex-lg-row flex-column nav-options-container'>
                        <Link to={'/'} className='navOptions boton1'>
                            ABOUT US
                        </Link>
                        <a href='https://wa.me/543816681643' className='navOptions boton1'>
                            CONTACT US
                        </a>
                        <Link to={'/menus'} className='navOptions boton1'>
                            MENU
                        </Link>
                    </div>
                    <div className='d-flex flex-lg-row flex-column '>
                        {
                            token
                                ? (
                                    <div className='d-flex flex-lg-row flex-column nav-options-container'>
                                        {
                                            userRole === 'admin' &&
                                            <Link to={'/admin'} className='navOptions boton1'>
                                                control panel
                                            </Link>
                                        }
                                        <InputGroup className='profile-panel'>
                                            <OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={cartPriceTooltip}
                                            >
                                                <Button onClick={showCart} className='p-0 cart-button'>
                                                    <Cart />
                                                </Button>
                                            </OverlayTrigger>
                                            <InputGroup.Text className='d-flex flex-column align-items-end '>
                                                <span>
                                                    welcome {userToShow?.username}!
                                                </span>
                                                <button onClick={handleLogOut} className='border-0'>log out</button>
                                            </InputGroup.Text>
                                            <InputGroup.Text className='img-profile-container' onClick={showUserProfile}>
                                                <img src={profileImg} alt="" />
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </div>
                                )
                                : (
                                    <div className='d-flex flex-lg-row flex-column nav-options-container me-3'>
                                        <Link to={'/login'} className='navOptions boton1'>
                                            LOGIN
                                        </Link>
                                        <Link to={'/register'} className='navOptions boton1'>
                                            REGISTER
                                        </Link>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
