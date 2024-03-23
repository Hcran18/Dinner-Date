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
  const [noList, setNoList] = useState([]);
  const [yesList, setYesList] = useState([]);
  const [index, setIndex] = useState(0);
  let restaurants = [];

  //Use the google nearby search api to get a list of restaurants
  useEffect(() => {
    // Fetch user's location and nearby restaurants
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyRestaurants(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    try {
      console.log("lat and long: ", latitude, longitude);
      const response = await axios.get(`http://localhost:3177/nearbysearch`, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 1500,
          type: "restaurant",
        },
      });

      const data = response.data;
      if (data.results.length !== 0) {
        restaurants = data.results;
      }
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    }
  };

  // handle the clicks of the buttons
  const handleNoClick = () => {
    setNoList([...noList, index]);
    setIndex(index + 1);
  };

  const handleYesClick = () => {
    setYesList([...yesList, index]);
    setIndex(index + 1);
  };

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
          {console.log("data:", restaurants)}
          <div className="welcome-message">
            <h3>Welcome, {user.name}!</h3>
          </div>
          <div className="carousel-container">
            <Carousel
              activeIndex={index}
              onSelect={() => {}}
              interval={null}
              prevIcon={null}
              nextIcon={null}
              indicators={false}
              controls={false}
            >
              {restaurants.map((restaurant, idx) => (
                <Carousel.Item key={idx}>
                  <h2>Image</h2>
                  <Carousel.Caption>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.vicinity}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="buttons">
            <button onClick={handleNoClick} className="round-button no-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button
              onClick={handleYesClick}
              className="round-button yes-button"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
