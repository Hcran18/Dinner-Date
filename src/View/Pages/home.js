import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactLogo from "./Images/logo-no-background.png";
import "./../Styles/home.css";

//import getRestaurants from '../../google-connections/google-api';

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
