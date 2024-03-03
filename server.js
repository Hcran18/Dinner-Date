const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path'); // Import the 'path' module

const app = express();

// Define the proxy middleware for the Google Places API
app.use(
  '/maps/api/place/nearbysearch/json', // The route you want to proxy
  createProxyMiddleware({
    target: 'https://maps.googleapis.com', // The target URL of the API
    changeOrigin: true,
  })
);

// Serve the React app's static files
app.use(express.static(path.join(__dirname, 'build'))); // Serve the built React app from the 'build' directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});