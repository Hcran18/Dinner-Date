import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, Link } from "react-router-dom";

function Navigation() {
  const {loginWithRedirect, logout, user, isLoading} = useAuth0();

  const handleLoginClick = async () => {
    try {
      // Action 1: Perform login and wait until redirection is complete
      await loginWithRedirect();
      console.log(user);
      // const registerHandler = new RegisterHandler();
      // user = registerHandler.registerUser(user);
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Dinner Date</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
            {!isLoading && !user && (
              <Button onClick={handleLoginClick} style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>Log in</Button>
            )}
            {!isLoading && user && (
              <>
                <Nav.Link as={Link} to="/profile">
                  <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                    <Image src={user.picture} roundedCircle style={{ width: '30px', height: '30px' }}/>
                    <Navbar.Text style={{padding: '5px'}}>
                      {user.preferred_username || user.given_name || user.email || "User"}
                    </Navbar.Text>
                  </div>
                </Nav.Link>
                <Button onClick={logout} style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>Log out</Button>
              </>
            )}
          </Container>
        </Navbar>
        
        <Outlet />
    </>
  );
}

export default Navigation;