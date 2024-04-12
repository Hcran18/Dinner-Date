import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

import "./SwipingContainerStyles.css";

const SwipingContainer = () => {
  const [index, setIndex] = useState(0);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const location = await fetchUserLocation();
      fetchNearbyRestaurants(location[0], location[1]);
    };

    fetchData();
  }, []);

  const fetchUserLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
            reject(error);
          }
        );
      } else {
        const error = "Geolocation is not supported by this browser.";
        console.error(error);
        reject(error);
      }
    });
  };

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get(`http://localhost:3177/nearbysearch`, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 1500,
          type: "restaurant",
        },
      });

      const restList = response.data;
      if (restList.length !== 0) {
        sessionStorage.setItem("restaurants", JSON.stringify(restList));
        setRestaurants(restList.results); // Update state with restaurant data
      } else {
        console.log("No restaurants found");
      }
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    }
  };

  const handleNoClick = () => {
    setIndex(index + 1);
  };

  const handleYesClick = () => {
    setIndex(index + 1);
    // Add restaurant to favorites
  };

  const ratingToStars = (rating) => {
    const maxStars = 5;
    const roundedRating = Math.round(rating); // Round the rating to the nearest whole number
    return Array.from({ length: maxStars }, (_, index) =>
      index < roundedRating ? <FontAwesomeIcon icon={faStar} key={index} /> : null
    );
  };

  const priceToDollarSigns = (price) => {
    return Array.from({ length: price }, (_, index) => "$").join("");
  };

  return (
    <>
      <div className="carousel-container">
        {restaurants.length > 0 ? (
          <>
            <Carousel
              className="carousel"
              activeIndex={index}
              onSelect={() => {}}
              interval={null}
              prevIcon={null}
              nextIcon={null}
              indicators={false}
              controls={false}
            >
              {restaurants.map((restaurant, idx) => (
                <Carousel.Item key={idx} className="carousel-item">
                  <div className="info">
                    <h2>{restaurant.name}</h2>
                    <h3>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.vicinity)}`} target="_blank" rel="noopener noreferrer">
                        {restaurant.vicinity}
                      </a>
                    </h3>
                    <div className="rating">
                      {ratingToStars(restaurant.rating)}
                    </div>
                    <div className="price">
                      {priceToDollarSigns(restaurant.price_level)}
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="buttons">
              <button onClick={handleNoClick} className="round-button no-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={handleYesClick} className="round-button yes-button">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
    </>
  );
};

export default SwipingContainer;
