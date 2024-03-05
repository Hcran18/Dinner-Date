import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './../Styles/home.css';

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [index, setIndex] = useState(0);

    const handleNoClick = () => {
        setIndex(index + 1);
    };

    const handleYesClick = () => {
        setIndex(index + 1);
    };

    return (
        <div className='container'>
            {!isLoading && !isAuthenticated && (
                <div className="home">
                    <h1>Welcome to Dinner Date!</h1> 
                    <h2>Log in to get started</h2>
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