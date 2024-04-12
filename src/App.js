import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./View/Pages/home";
import Navbar from "./View/Pages/Navbar";
import Profile from "./View/Pages/profile";
import Auth0ProviderWithHistory from "./auth0Provider";
import Activity from "./View/Pages/activity";

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Routes>
          {/* Navbar should only be rendered on routes where it's needed */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route index path="/" element={<Home />} />
                  <Route path="swiping" element={<Activity />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
