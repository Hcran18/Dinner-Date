import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const SwipingContainer = () => {
  const [index, setIndex] = useState(0);
  const [restaurants, setRestaurants] = useState({});
  const [noList, setNoList] = useState([]);
  const [yesList, setYesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const location = await fetchUserLocation();
      fetchNearbyRestaurants(location[0], location[1]);
      console.log(JSON.parse(sessionStorage.getItem("restaurants")));
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

      const data = response.data;
      if (data.results.length !== 0) {
        sessionStorage.setItem("restaurants", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    }
  };

  const handleNoClick = () => {
    setNoList([...noList, index]);
    setIndex(index + 1);
  };

  const handleYesClick = () => {
    setYesList([...yesList, index]);
    setIndex(index + 1);
  };

  return (
    <>
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
          {/* {restaurants.map((restaurant, idx) => (
            <Carousel.Item key={idx}>
              <h2>Image</h2>
              <Carousel.Caption>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.vicinity}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))} */}
        </Carousel>
      </div>
      <div className="buttons">
        <button onClick={handleNoClick} className="round-button no-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={handleYesClick} className="round-button yes-button">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </>
  );
};

export default SwipingContainer;
