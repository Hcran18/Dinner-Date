import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './View/Pages/home';
import Navbar from './View/Pages/Navbar';
import Auth0ProviderWithHistory from './auth0Provider';

function App() {
  return (
    
      <Router>
        <Auth0ProviderWithHistory> 
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
        </Auth0ProviderWithHistory>
      </Router>
    
  );
}

export default App;
