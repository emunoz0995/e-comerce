import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css'

const NavBar = () => {
    return (
        <div className='navbar'>
            <Navbar className='fixed' bg="light" variant="light">
                <Container>
                    <div className="title">
                        <Navbar.Brand as={Link} to='/'>E commerce</Navbar.Brand>
                    </div>
                    <Nav className="me-auto navbar-nav">
                       
                        <Nav.Link className='icon btn btn-outline-primary' as={Link} to='/login'><i className="fa-solid fa-user"></i></Nav.Link>
                        <Nav.Link className='icon btn btn-outline-primary' as={Link} to='/purchases'><i className="fa-solid fa-cash-register"></i></Nav.Link>
                        <Nav.Link className='icon btn btn-outline-primary' ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </div>
    );
};

export default NavBar;