const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
require("dotenv").config();

const port = 3177;

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const API_SERVICE_URL = `${API_BASE_URL}?key=${API_KEY_VALUE}&loading=async&libraries=places&callback=initMap`;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  "/places",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/places`]: "",
    },
  })
);

app.get("/nearbysearch", async (req, res) => {
  console.log("Fetching nearby restaurants...");
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: req.query.location,
          radius: req.query.radius || 1500,
          type: req.query.type || "restaurant",
          key: API_KEY_VALUE,
        },
      }

    );

    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching nearby restaurants" });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));
