import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

function Navigation() {
  const {loginWithRedirect, logout, user, isLoading} = useAuth0();
  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Dinner Date</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            {!isLoading && !user && (
              <Button onClick={() => loginWithRedirect()}>Log in</Button>
            )}
            {!isLoading && user && (
              <Button onClick={() => logout()}>Log out</Button>
            )}
          </Container>
        </Navbar>
    </>
  );
}

export default Navigation;