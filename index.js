// IMPORT PACKAGES
const express = require('express')
const app = express();

const port = 8800
const mongoose = require("mongoose")

// IMPORT CONTROLLERS
const authenController = require("./routes/authenController");
const usersController = require("./routes/usersController");
const moviesController = require("./routes/moviesController");
const listsController = require("./routes/listsController");



// IMPORT DB
require("./config/db")

app.use(express.json())

// ROUTING
app.use("/api/auth", authenController);
app.use("/api/users", usersController);
app.use("/api/movie", moviesController);
app.use("/api/lists", listsController);



// RUN SERVER
app.listen(port, () => console.log(`🟢 server started on port ${port}`))