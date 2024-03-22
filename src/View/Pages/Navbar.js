import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";
import ReactLogo from "./Images/logo-no-background.png";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Navigation() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      authenticateUser(user);
    }
  }, [isLoading, user]);

  const authenticateUser = async (user) => {
    try {
      const response = await axios.post("/api/authenticate", user);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function popToast(msg) {
    toast(msg);
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={ReactLogo}
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          {!isLoading && !user && (
            <Button
              onClick={loginWithRedirect}
              style={{ backgroundColor: "#B22222", borderColor: "#B22222" }}
            >
              Log in
            </Button>
          )}
          {!isLoading && user && (
            <>
              <Nav.Link as={Link} to="/profile">
                <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <Image
                    src={user.picture}
                    roundedCircle
                    style={{ width: "30px", height: "30px" }}
                  />
                  <Navbar.Text style={{ padding: "5px" }}>
                    {user.preferred_username ||
                      user.given_name ||
                      user.email ||
                      "User"}
                  </Navbar.Text>
                </div>
              </Nav.Link>
              <Button
                onClick={logout}
                style={{ backgroundColor: "#B22222", borderColor: "#B22222" }}
              >
                Log out
              </Button>
            </>
          )}
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default Navigation;
