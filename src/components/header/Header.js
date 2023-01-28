import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo-red.png'

const Header = () => {
  return (
    <Navbar className='navContainer' expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"> <img className='logoa' src={logo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 locura"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className='primerNav'>
              <div href="#action1" className='navOptions boton1'>ABOUT US</div>
              <div href="#action2" className='navOptions boton1'>MENU</div>
              <div href="#" className='navOptions boton1' >
                FOLLOW US
              </div>
            </div>
          </Nav>
          <div className='segundoNav'>
            <div className='navOptions boton1'>CONTACT US</div>
            <div className='navOptions boton1'>LOGIN</div>
            <div className='navOptions boton1'>REGISTER</div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;