// Import modules and files
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const compression = require("compression");

// Set port to environmental variable or local port
const PORT = process.env.PORT || 3000;

// Configure app to use Express server
const exerciseApp = express();

// Add compression for all server requests
exerciseApp.use(compression());

exerciseApp.use(morgan("dev"));

// Configure app to receive and send JSON objects
exerciseApp.use(express.urlencoded({ extended: true }));
exerciseApp.use(express.json());

// Expose public directory to client side
exerciseApp.use(express.static("public"));

// Sends exerciseApp object to homeRoutes serveFiles function
require("./controllers/homeRoutes")(exerciseApp);

// Sends exerciseApp object to exerciseRoutes serveData function
require("./controllers/workoutRoutes")(exerciseApp);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// Launch the server
exerciseApp.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});