import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './View/Pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
