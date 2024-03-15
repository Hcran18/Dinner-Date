import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import ReactLogo from './Images/logo-no-background.png';
import './../Styles/home.css';

//import getRestaurants from '../../google-connections/google-api';

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [noList, setNoList] = useState([]);
    const [yesList, setYesList] = useState([]);
    const [index, setIndex] = useState(0);
    const [userLocation, setUserLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

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
                    setUserLocation({ latitude, longitude });
                    fetchNearbyRestaurants(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const fetchNearbyRestaurants = async (latitude, longitude) => {
        try {
            const response = await axios.get(`http://localhost:3001/nearbysearch`, {
                params: {
                    location: `${latitude},${longitude}`,
                    radius: 1500,
                    type: 'restaurant',
                }
            });
            
            console.log('Fetched nearby restaurants data:', response.data.results)
            const data = response.data;
            setRestaurants(data.results);
        } catch (error) {
            console.error('Error fetching nearby restaurants:', error);
        }

        console.log('Fetched nearby restaurants data:', restaurants);
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
        <div className='container'>
            {!isLoading && !isAuthenticated && (
                <div className="home">
                    <img 
                        src={ReactLogo}
                        width="75%"
                        className="d-inline-block align-top"
                        style={{padding: '20px'}}
                        alt="React Bootstrap logo"
                    /> 
                    <h2>Welcome! Log in to get started!</h2>
                </div>
            )}
            {isLoading && <p>Loading...</p>}
            {!isLoading && isAuthenticated && (
                <>

                    <div className='welcome-message'>
                        <h3>Welcome, {user.name}!</h3>
                    </div>
                    <div className='carousel-container'>
                        <Carousel
                            activeIndex={index}
                            onSelect={() => { } }
                            interval={null}
                            prevIcon={null}
                            nextIcon={null}
                            indicators={false}
                            controls={false}
                        >
                            <Carousel.Item>
                                {/*change this image to the next restaurant in the list when buttons are clicked*/}
                                {/* <ExampleCarouselImage text="First slide" /> */}
                                <Carousel.Caption>
                                    {/*update name and Distance when buttons are clicked to new restaurant*/}
                                    <h3>Name</h3>
                                    <p>Distance</p>
                                </Carousel.Caption>
                            </Carousel.Item>
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
            )}
        </div>
    )
};

export default Home;