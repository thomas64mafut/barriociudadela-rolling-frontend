import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo-red.png'

const Header = () => {
  return (
    <Navbar className='navContainer' expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"> <a onClick={() => window.location.href = 'http://localhost:3000/'}><img className='logoa' src={logo}/></a> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 locura"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className='primerNav'>
              <div href="#action1" className='navOptions boton1 fourOne'> <a className='follow' href='aboutUs'>ABOUT US</a></div>
              <div href="#action2" className='navOptions boton1' onClick={() => window.location.href = 'http://localhost:3000/menus'}>MENU</div>
              <div className='navOptions boton1 fourOne' >
                <a className='follow' href="#followUs">FOLLOW US</a>
              </div>
            </div>
          </Nav>
          <div className='segundoNav'>
            <a href='https://wa.me/543816681643' target="_blank" className='navOptions boton1'>CONTACT US</a>
            <div className='navOptions boton1'> <a onClick={() => window.location.href = 'http://localhost:3000/login'}>LOGIN</a> </div>
            <div className='navOptions boton1'> <a onClick={() => window.location.href = 'http://localhost:3000/register'}>REGISTER</a> </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;