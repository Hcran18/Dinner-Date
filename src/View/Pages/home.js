import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLogo from "./Images/logo-no-background.png";
import "./../Styles/home.css";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container">
      {!isLoading && !isAuthenticated && (
        <div className="home">
          <img
            src={ReactLogo}
            width="75%"
            className="d-inline-block align-top"
            style={{ padding: "20px" }}
            alt="React Bootstrap logo"
          />
          <h2>Welcome! Log in to get started!</h2>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {!isLoading && isAuthenticated && (
        <>
          <div className="welcome-message">
            <h3>Welcome, {user.name}!</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
