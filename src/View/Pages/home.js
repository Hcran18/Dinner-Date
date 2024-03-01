import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <div>
            <h1>Home</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && isAuthenticated && (
                <div>
                    <p>Welcome, {user.name}!</p>
                </div>
            )}
        </div>
    )
};

export default Home;