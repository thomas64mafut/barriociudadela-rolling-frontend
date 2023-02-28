import './header.css';
import React, { useState, useEffect, useContext } from 'react';
import {
  Navbar,
  Tooltip,
  OverlayTrigger,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggler from '../themeToggler/ThemeToggler';

import logo from '../../assets/img/logo-red.png';
import axios from '../../api/axios';
import Cart from '../../assets/icons/Cart';
import Config from '../../assets/icons/Config';

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [userToShow, setUserToShow] = useState({});
  const [userRole, setUserRole] = useState('');
  const [cartTotalPrice, setCartTotalPrice] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [setErrorMessage] = useState('');
  const [mouseActive, setMouseActive] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      getAuthStatus();
      setToken(token);
    } else setToken('');
  }, []);

  useEffect(() => {
    if (token) {
      handleGetUser();
    }
  }, [userRole]);

  useEffect(() => {
    if (token) {
      if (userRole !== 'admin') {
        handleGetCart();
      }
    }
  }, [userToShow]);

  const handleGetUser = async () => {
    try {
      const { data } = await axios.get('/user');
      setUserToShow(data?.userFound);
      setProfileImg(data?.userFound?.profilePicture);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setUserToShow([]);
    }
  };

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get('/user/status');
      setUserRole(data?.role);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleLogOut = () => {
    setExpanded(false);
    sessionStorage.clear();
    window.location.replace('/');
  };

  const showCart = () => {
    setExpanded(false);
    navigate('/myCarts');
  };

  const showAdminPage = () => {
    setExpanded(false);
    navigate('/admin');
  };

  const showUserProfile = () => {
    setExpanded(false);
    navigate('/profile');
  };

  const handleGetCart = async () => {
    try {
      const { data } = await axios('/cart');
      let totalPrice = 0;
      const activeCart = data?.ownCarts?.find(
        (cart) => cart.cartStatus === 'active'
      );
      for (const product of activeCart.products) {
        totalPrice = totalPrice + product?.price * product?.quantity;
      }
      setCartTotalPrice(totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const cartPriceTooltip = (
    <Tooltip id="cart-price">
      <span className="cart-price">total: ${cartTotalPrice}</span>
    </Tooltip>
  );

  return (
    <Navbar
      className={darkMode ? 'navContainer-dark m-0' : 'navContainer m-0'}
      expand="lg"
      expanded={expanded}
      onBlur={() => {
        if (!mouseActive) {
          setExpanded(false);
        } else {
          setExpanded(expanded);
        }
      }}
      onMouseEnter={() => setMouseActive(true)}
      onMouseLeave={() => setMouseActive(false)}
    >
      <Navbar.Brand href="/">
        <img className="logoa" src={logo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbarScroll"
        className="me-2 p-0 border-0"
        onClick={() => setExpanded(expanded ? false : 'expanded')}
      />
      <Navbar.Collapse id="navbarScroll">
        <div className="w-100 h-100 d-flex flex-lg-row flex-column justify-content-between navbar-complete">
          <div className="d-flex flex-lg-row flex-column nav-options-container">
            <Link
              to={'/'}
              className="navOptions boton1"
              onClick={() => setExpanded(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="https://wa.me/543816681643"
              className="navOptions boton1"
              onClick={() => setExpanded(false)}
            >
              CONTACT US
            </Link>
            <Link
              to={'/menus'}
              className="navOptions boton1"
              onClick={() => setExpanded(false)}
            >
              MENU
            </Link>
            <ThemeToggler />
          </div>
          <div className="d-flex flex-lg-row flex-column ">
            {token ? (
              <div className="d-flex flex-lg-row flex-column nav-options-container me-lg-1">
                {userRole === 'admin' && (
                  <>
                    <Link
                      to={'/orders'}
                      className="navOptions boton1"
                      onClick={() => setExpanded(false)}
                    >
                      orders
                    </Link>
                  </>
                )}
                <InputGroup className="profile-panel">
                  {userRole !== 'admin' ? (
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={cartPriceTooltip}
                    >
                      <Button onClick={showCart} className="p-0 cart-button">
                        <Cart />
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    <Button className="p-0 cart-button" onClick={showAdminPage}>
                      <Config />
                    </Button>
                  )}
                  <InputGroup.Text className="">
                    <div className="d-flex flex-column align-items-end">
                      <span>Welcome {userToShow?.username}!</span>
                      <button onClick={handleLogOut} className="border-0">
                        log out
                      </button>
                    </div>
                  </InputGroup.Text>
                  <InputGroup.Text
                    className="img-profile-container"
                    onClick={showUserProfile}
                  >
                    <img
                      className={
                        darkMode ? 'img-profile-pic-dark' : 'img-profile-pic'
                      }
                      src={profileImg}
                      alt=""
                    />
                  </InputGroup.Text>
                </InputGroup>
              </div>
            ) : (
              <div className="d-flex flex-lg-row flex-column nav-options-container me-3">
                <Link to={'/login'} className="navOptions boton1">
                  LOGIN
                </Link>
                <Link to={'/register'} className="navOptions boton1">
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
