// Import modules and files
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./models");

// Set port to environmental variable or local port
const PORT = process.env.PORT || 3000;

// Configure app to use Express server
const exerciseApp = express();

// Configure app to receive and send JSON objects
exerciseApp.use(express.urlencoded({ extended: true }));
exerciseApp.use(express.json());

// Expose public directory to client side
exerciseApp.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// Server requests - update later

// Launch the server
exerciseApp.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});