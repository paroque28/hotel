import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? (
      <NavigationAuth authUser={authUser} />
    ) : (
      <NavigationNonAuth />
    ))
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href={ROUTES.LANDING}>iHotel</Navbar.Brand>
    <Nav className="mr-auto">
      <NavLink href={ROUTES.HOME}>Home</NavLink>
      <NavLink href={ROUTES.ACCOUNT}>Account</NavLink>
      {!!authUser.roles[ROLES.ADMIN] && (
        <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
      )}
    </Nav>
    <Nav className="navbar-right">
      <SignOutButton />
    </Nav>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href={ROUTES.LANDING}>iHotel</Navbar.Brand>
    <Nav className="mr-auto" />
    <Nav className="navbar-right">
      <NavLink href={ROUTES.SIGN_IN}> Sign In </NavLink>
    </Nav>
  </Navbar>
);

export default Navigation;
