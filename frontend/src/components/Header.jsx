import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart, FaUserAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../redux/actions/userActions'

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <FaUser /> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  <FaSignOutAlt /> Logout
                </NavDropdown.Item>
              </NavDropdown>) :

                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUserAlt /> Login
                  </Nav.Link>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
